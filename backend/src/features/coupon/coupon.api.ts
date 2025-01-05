import type { FastifyPluginAsync } from 'fastify';
import { type ErrorSchema, addErrorSchemas, couponAPISchema } from '@extension/schema';
import { doGetCoupons, doSubmitCoupon, doVoteCoupon } from './coupon.shell';
import type { z } from 'zod';

export const couponRoute: FastifyPluginAsync = async function (fastify): Promise<void> {
  fastify.get<{
    Querystring: z.infer<typeof couponAPISchema.getCoupons.querystring>;
    Reply: z.infer<typeof couponAPISchema.getCoupons.response> | ErrorSchema;
  }>(
    `${couponAPISchema.getCoupons.path}`,
    {
      preHandler: [],
      schema: {
        querystring: couponAPISchema.getCoupons.querystring,
        description: 'Get coupons',
        tags: ['coupon'],
        summary: 'Get coupons',
        security: [],
        response: addErrorSchemas({ 200: couponAPISchema.getCoupons.response }),
      },
    },
    async function (request, reply) {
      try {
        const coupons = await doGetCoupons(request.db, request.query.url);
        reply.status(200).send({ coupons });
      } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
      }
    },
  );

  fastify.post<{
    Body: z.infer<typeof couponAPISchema.submitCoupon.body>;
    Reply: z.infer<typeof couponAPISchema.submitCoupon.response> | ErrorSchema;
  }>(
    `${couponAPISchema.submitCoupon.path}`,
    {
      preHandler: [],
      schema: {
        body: couponAPISchema.submitCoupon.body,
        description: 'Submit coupon',
        tags: ['coupon'],
        summary: 'Submit coupon',
        security: [],
        response: addErrorSchemas({ 204: couponAPISchema.submitCoupon.response }),
      },
    },
    async function (request, reply) {
      try {
        const { url, ...rest } = request.body;
        await doSubmitCoupon(request.db, url, rest);
        reply.status(204).send(null);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
      }
    },
  );

  fastify.post<{
    Body: z.infer<typeof couponAPISchema.voteCoupon.body>;
    Reply: z.infer<typeof couponAPISchema.voteCoupon.response> | ErrorSchema;
  }>(
    `${couponAPISchema.voteCoupon.path}`,
    {
      preHandler: [],
      schema: {
        body: couponAPISchema.voteCoupon.body,
        description: 'Vote coupon',
        tags: ['coupon'],
        summary: 'Vote coupon',
        security: [],
        response: addErrorSchemas({ 204: couponAPISchema.voteCoupon.response }),
      },
    },
    async function (request, reply) {
      try {
        const { code, vote } = request.body;
        await doVoteCoupon(request.db, code, vote);
        reply.status(204).send(null);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
      }
    },
  );
};
