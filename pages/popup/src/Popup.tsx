import { useState, useEffect } from 'react';
import { Button } from '@extension/ui/lib/components/ui/button';
import { ScrollArea } from '@extension/ui/lib/components/ui/scroll-area';
import CouponList from '@extension/ui/lib/components/CouponList';
import NewCouponForm from '@extension/ui/lib/components/NewCouponForm';
import EmptyState from '@extension/ui/lib/components/EmptyState';
interface Coupon {
  id: string;
  code: string;
  description: string;
}

export default function Popup() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [currentSite, setCurrentSite] = useState<string>('');
  const [showNewCouponForm, setShowNewCouponForm] = useState(false);

  useEffect(() => {
    // In a real extension, you would fetch the current site from the Chrome API
    // and then fetch coupons for that site from your backend
    setCurrentSite('example.com');
    setCoupons([
      { id: '1', code: 'SAVE10', description: '10% off your order' },
      { id: '2', code: 'FREESHIP', description: 'Free shipping on orders over $50' },
      // Adding more coupons to demonstrate scrolling
      { id: '3', code: 'SUMMER25', description: '25% off summer collection' },
      { id: '4', code: 'WELCOME15', description: '15% off for new customers' },
      { id: '5', code: 'FLASH50', description: '50% off flash sale items' },
    ]);
  }, []);

  const handleNewCoupon = (newCoupon: Omit<Coupon, 'id'>) => {
    // In a real app, you would send this to your backend
    const couponWithId = { ...newCoupon, id: Date.now().toString() };
    setCoupons([...coupons, couponWithId]);
    setShowNewCouponForm(false);
  };

  return (
    <div className="App w-[300px] h-[600px] p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Coupons for {currentSite}</h1>
      <ScrollArea className="flex-grow mb-4">
        {coupons.length > 0 ? <CouponList coupons={coupons} /> : <EmptyState />}
      </ScrollArea>
      {showNewCouponForm ? (
        <NewCouponForm onSubmit={handleNewCoupon} onCancel={() => setShowNewCouponForm(false)} />
      ) : (
        <Button onClick={() => setShowNewCouponForm(true)}>Add New Coupon</Button>
      )}
    </div>
  );
}
