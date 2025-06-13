import { z } from 'zod';

export const articlePayloadSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
  content: z.string().min(1),
});
