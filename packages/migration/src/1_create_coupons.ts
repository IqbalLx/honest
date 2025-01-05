import { sql, type Kysely } from 'kysely';

const tableName = 'coupons';
export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable(tableName)
    .addColumn('code', 'text', col => col.primaryKey())
    .addColumn('description', 'text')
    .addColumn('hostname', 'text')
    .addColumn('upvotes', 'integer', col => col.defaultTo(0))
    .addColumn('downvotes', 'integer', col => col.defaultTo(0))
    .addColumn('createdAt', 'timestamp', col => col.defaultTo(sql`now()`))
    .addColumn('updatedAt', 'timestamp', col => col.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable(tableName).execute();
}
