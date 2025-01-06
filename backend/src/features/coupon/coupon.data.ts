import { sql, type Kysely } from 'kysely';
import type { Coupon, Database } from '@extension/schema';

export function getCoupons(db: Kysely<Database>, url: string): Promise<Pick<Coupon, 'code' | 'description'>[]> {
  const thresholdPositiveRatio = 0.45;
  const thresholdTotalVotes = 50;

  return db
    .selectFrom('coupons')
    .select(['code', 'description'])
    .where('hostname', '=', url)
    .where(({ eb, and, or }) =>
      or([
        and([
          eb(sql`upvotes / (downvotes + upvotes + 1)::float`, '>', thresholdPositiveRatio),
          eb(sql`upvotes + downvotes`, '>', thresholdTotalVotes),
        ]),
        eb(sql`upvotes + downvotes`, '<', thresholdTotalVotes),
      ]),
    )
    .orderBy('upvotes', 'desc')
    .limit(50)
    .execute();
}

export async function voteCoupon(db: Kysely<Database>, code: string, vote: 'up' | 'down'): Promise<void> {
  await db
    .updateTable('coupons')
    .$if(vote === 'up', b => b.set({ upvotes: sql`upvotes + 1` }))
    .$if(vote === 'down', b => b.set({ downvotes: sql`downvotes + 1` }))
    .where('code', '=', code)
    .execute();
}

export async function submitCoupon(
  db: Kysely<Database>,
  coupon: Pick<Coupon, 'code' | 'description' | 'hostname' | 'upvotes' | 'downvotes'>,
): Promise<void> {
  await db
    .insertInto('coupons')
    .values(coupon)
    .onConflict(b => b.doNothing())
    .execute();
}
