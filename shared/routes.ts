import { z } from 'zod';
import { insertPredictionSchema, predictions } from './schema';

// === SHARED ERROR SCHEMAS ===
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// === API CONTRACT ===
export const api = {
  predictions: {
    create: {
      method: 'POST' as const,
      path: '/api/predictions',
      input: insertPredictionSchema,
      responses: {
        201: z.custom<typeof predictions.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/predictions',
      responses: {
        200: z.array(z.custom<typeof predictions.$inferSelect>()),
      },
    },
  },
};

// === HELPER ===
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
