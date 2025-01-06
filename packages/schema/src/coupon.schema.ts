import { Type, type Static } from '@sinclair/typebox';
import type { RecursiveStatic } from './generic';

export const couponSchema = Type.Object({
  code: Type.String(),
  description: Type.String(),
  hostname: Type.String(),
  upvotes: Type.Number(),
  downvotes: Type.Number(),
  createdAt: Type.Number(),
  updatedAt: Type.Number(),
});

export const couponAPISchema = {
  path: '/coupon',
  getCoupons: {
    path: '',
    querystring: Type.Object({
      url: Type.String(),
    }),
    response: Type.Object({
      coupons: Type.Array(
        Type.Object({
          code: Type.String(),
          description: Type.String(),
        }),
      ),
    }),
  },
  voteCoupon: {
    path: '/vote',
    body: Type.Object({
      code: Type.String(),
      vote: Type.Union([Type.Literal('up'), Type.Literal('down')]),
    }),
    response: Type.Null(),
  },
  submitCoupon: {
    path: '/submit',
    body: Type.Object({
      url: Type.String(),
      code: Type.String(),
      description: Type.String(),
    }),
    response: Type.Null(),
  },
};

export type Coupon = Static<typeof couponSchema>;
export type CouponAPI = RecursiveStatic<typeof couponAPISchema>;
