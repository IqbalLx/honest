import { z } from 'zod';

export type ErrorSchema = {
  message: string;
};

export function addErrorSchemas<T>(schemas: Record<number, z.ZodType<T>>) {
  return {
    ...schemas,
    500: z.object({
      message: z.string(),
    }),
  };
}
