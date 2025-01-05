import type { Coupon, Database } from '@extension/schema';
import type { Kysely } from 'kysely';
import { getCoupons, submitCoupon, voteCoupon } from './coupon.data';
import { getHostname } from './coupon.core';

export const doGetCoupons = (db: Kysely<Database>, url: string) => {
  const hostname = getHostname(url);
  return getCoupons(db, hostname);
};

export const doVoteCoupon = (db: Kysely<Database>, code: string, vote: 'up' | 'down') => {
  return voteCoupon(db, code, vote);
};

export const doSubmitCoupon = async (
  db: Kysely<Database>,
  url: string,
  coupon: Pick<Coupon, 'code' | 'description'>,
) => {
  const hostname = getHostname(url);
  await submitCoupon(db, { ...coupon, hostname, upvotes: 0, downvotes: 0 });
};
