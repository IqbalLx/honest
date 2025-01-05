import { sql, type Kysely } from 'kysely';
import type { Coupon, Database } from '@extension/shared';

export function getCoupons(db: Kysely<Database>, url: string): Promise<Pick<Coupon, 'code' | 'description'>[]> {
  return db
    .selectFrom('coupon')
    .select(['code', 'description'])
    .where('hostname', '=', url)
    .whereRef('upvotes', '>', 'downvotes')
    .orderBy('upvotes', 'desc')
    .execute();
}

export async function voteCoupon(db: Kysely<Database>, code: string, vote: 'up' | 'down'): Promise<void> {
  await db
    .updateTable('coupon')
    .$if(vote === 'up', b => b.set({ upvotes: sql`upvotes + 1` }))
    .$if(vote === 'down', b => b.set({ downvotes: sql`downvotes + 1` }))
    .where('code', '=', code)
    .execute();
}

export async function submitCoupon(
  db: Kysely<Database>,
  coupon: Pick<Coupon, 'code' | 'description' | 'hostname' | 'upvotes' | 'downvotes'>,
): Promise<void> {
  await db.insertInto('coupon').values(coupon).execute();
}
