import { pgTable, uuid, text, timestamp, } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';
import { diseases } from './diseases';
export const detections = pgTable('detections', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id),
    plantName: text('plant_name'),
    diseaseId: uuid('disease_id').references(() => diseases.id),
    confidenceScore: text('confidence_score'),
    imageUrl: text('image_url'),
    detectedAt: timestamp('detected_at').defaultNow(),
});
