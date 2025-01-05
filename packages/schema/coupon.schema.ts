import { z } from 'zod';

export const couponSchema = z.object({
  code: z.string(),
  description: z.string(),
  hostname: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const couponAPISchema = {
  path: '/coupon',
  getCoupons: {
    path: '',
    querystring: z.object({
      url: z.string().url(),
    }),
    response: z.object({
      coupons: z.array(couponSchema.pick({ code: true, description: true })),
    }),
  },
  voteCoupon: {
    path: '/vote',
    body: z.object({
      code: z.string(),
      vote: z.enum(['up', 'down']),
    }),
    response: z.null(),
  },
  submitCoupon: {
    path: '/submit',
    body: z.object({
      url: z.string().url(),
      code: z.string(),
      description: z.string(),
    }),
    response: z.null(),
  },
};

export type Coupon = z.infer<typeof couponSchema>;
