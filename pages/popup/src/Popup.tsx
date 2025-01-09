import { useState, useEffect } from 'react';
import { Button } from '@extension/ui/lib/components/ui/button';
import { ScrollArea } from '@extension/ui/lib/components/ui/scroll-area';
import CouponList from '@extension/ui/lib/components/CouponList';
import NewCouponForm from '@extension/ui/lib/components/NewCouponForm';
import EmptyState from '@extension/ui/lib/components/EmptyState';
import { getAxiosInstance, getCoupons, submitCoupon } from '@extension/shared';
import { Loader2 } from 'lucide-react';

import type { CouponAPI } from '@extension/schema';

export default function Popup() {
  const [coupons, setCoupons] = useState<CouponAPI['getCoupons']['response']['coupons']>([]);
  const [currentSite, setCurrentSite] = useState<string>('');
  const [showNewCouponForm, setShowNewCouponForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiURL =
    import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL;

  const api = getAxiosInstance(apiURL);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });

        if (tab.url!.startsWith('about:') || tab.url!.startsWith('chrome:')) return;

        const currentUrl = new URL(tab.url!).hostname;
        setCurrentSite(currentUrl);
        const fetchedCoupons = await getCoupons(api, currentUrl);
        setCoupons(fetchedCoupons);
      } catch (err) {
        setError('Failed to fetch coupons. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleNewCoupon = async (newCoupon: Omit<CouponAPI['submitCoupon']['body'], 'url'>) => {
    try {
      await submitCoupon(api, currentSite, newCoupon.code, newCoupon.description);
      const updatedCoupons = await getCoupons(api, currentSite);
      setCoupons(updatedCoupons);
      setShowNewCouponForm(false);
    } catch (err) {
      setError('Failed to submit new coupon. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-[300px] h-[600px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[300px] h-[600px] p-4 flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="w-[300px] h-[600px] p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">
        Coupons for <span className="text-yellow-600">{currentSite}</span>
      </h1>
      <ScrollArea className="flex-grow mb-4">
        {coupons.length > 0 ? <CouponList coupons={coupons} /> : <EmptyState />}
      </ScrollArea>

      {showNewCouponForm ? (
        <NewCouponForm onSubmit={handleNewCoupon} onCancel={() => setShowNewCouponForm(false)} />
      ) : (
        <Button onClick={() => setShowNewCouponForm(true)} className="w-full">
          Add New Coupon
        </Button>
      )}
    </div>
  );
}
