import { z } from 'zod';
export const detectionPayloadSchema = z.object({
    plantName: z.string().min(1),
    diseaseId: z.string().uuid(),
    confidenceScore: z.string().min(1),
    imageUrl: z.string().url(),
});
