import type { FastifyPluginAsync } from 'fastify';
import type { CouponAPI, ErrorResponse } from '@extension/schema';
import { addErrorSchemas, couponAPISchema } from '@extension/schema';

import { doGetCoupons, doSubmitCoupon, doVoteCoupon } from './coupon.shell';

export const couponRoute: FastifyPluginAsync = async function (fastify): Promise<void> {
  fastify.get<{
    Querystring: CouponAPI['getCoupons']['querystring'];
    Reply: CouponAPI['getCoupons']['response'] | ErrorResponse;
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
        const coupons = await doGetCoupons(fastify.db, request.query.url);
        reply.status(200).send({ coupons });
      } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
      }
    },
  );

  fastify.post<{
    Body: CouponAPI['submitCoupon']['body'];
    Reply: CouponAPI['submitCoupon']['response'] | ErrorResponse;
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
        await doSubmitCoupon(fastify.db, url, rest);
        reply.status(204).send(null);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
      }
    },
  );

  fastify.post<{
    Body: CouponAPI['voteCoupon']['body'];
    Reply: CouponAPI['voteCoupon']['response'] | ErrorResponse;
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
        await doVoteCoupon(fastify.db, code, vote);
        reply.status(204).send(null);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
      }
    },
  );
};
