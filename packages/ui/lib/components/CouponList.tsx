import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Clipboard, CheckCircle } from 'lucide-react';

import FeedbackButton from './FeedbackButton';

interface Coupon {
  id: string;
  code: string;
  description: string;
}

interface CouponListProps {
  coupons: Coupon[];
}

export default function CouponList({ coupons }: CouponListProps) {
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000); // Reset after 2 seconds
  };

  return (
    <div className="space-y-4">
      {coupons.map(coupon => (
        <Card key={coupon.id}>
          <CardContent className="pt-4">
            <h2 className="text-lg font-semibold">{coupon.code}</h2>
            <p className="text-sm text-gray-500">{coupon.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="icon" onClick={() => handleCopy(coupon.code)} className="w-10 h-10">
              {copiedCoupon === coupon.code ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </Button>
            <FeedbackButton couponId={coupon.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
