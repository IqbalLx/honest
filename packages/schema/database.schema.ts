import type { Generated, ColumnType } from 'kysely';

import type { Coupon } from './coupon.schema';

type Modify<T, R> = Omit<T, keyof R> & R;

type DefaultAutoCols = {
  id: Generated<string>;
  createdAt: ColumnType<number, number | undefined, never>;
  updatedAt: ColumnType<number, number | undefined, number>;
};

type CouponTable = Modify<Coupon, DefaultAutoCols>;

export type Database = {
  coupon: CouponTable;
};
