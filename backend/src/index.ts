import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import rateLimit from '@fastify/rate-limit';
import { Pool } from 'pg';

import { db } from './plugins/database';
import { couponRoute } from './features/coupon/coupon.api';
import { couponAPISchema } from '@extension/schema';

const fastify = Fastify({
  logger: true,
});

const isDev = process.env.MODE === 'development';

// Swagger documentation
if (isDev) {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Chrome Extension API',
        description: 'API documentation for Chrome Extension Backend',
        version: '0.1.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: '/documentation',
  });
}

const start = async () => {
  try {
    // Register plugins
    fastify.register(cors, {
      origin: true,
    });

    if (!isDev) {
      await fastify.register(rateLimit, {
        global: true,
        max: 100,
        timeWindow: '1 minute',
        addHeadersOnExceeding: {
          'x-ratelimit-limit': false,
          'x-ratelimit-remaining': false,
          'x-ratelimit-reset': false,
        },
        addHeaders: {
          'x-ratelimit-limit': false,
          'x-ratelimit-remaining': false,
          'x-ratelimit-reset': false,
          'retry-after': false,
        },
      });

      fastify.setNotFoundHandler(
        {
          preHandler: fastify.rateLimit({
            max: 4,
            timeWindow: '1 hour',
          }),
        },
        function (request, reply) {
          reply.code(404).send({ message: 'quit quessing!' });
        },
      );
    }

    const pgConfig = { pool: new Pool({ connectionString: process.env.DATABASE_URL }) };
    await fastify.register(db, pgConfig);

    // Routes
    fastify.get('/ping', async () => {
      return 'pong!';
    });

    const API_PREFIX = `/api/v1`;
    fastify.register(couponRoute, { prefix: `${API_PREFIX}${couponAPISchema.path}` });

    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
