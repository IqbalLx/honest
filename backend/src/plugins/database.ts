import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { Kysely, PostgresDialect, type PostgresDialectConfig, sql } from 'kysely';

import type { Database } from '@extension/schema';

declare module 'fastify' {
  interface FastifyInstance {
    db: Kysely<Database>;
  }
}

export const db = fp(async (fastify: FastifyInstance, config: PostgresDialectConfig) => {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect(config),
  });

  sql`select 1`
    .execute(db)
    .then(() => {
      console.info('Database connected');
    })
    .catch(e => {
      console.error(e);
      process.kill(process.pid, 'SIGINT');
    });

  fastify.decorate('db', db);

  fastify.addHook('onClose', async () => {
    await db.destroy();
  });
});
