import { pgTable, jsonb, uuid, text, timestamp } from 'drizzle-orm/pg-core';
export const diseases = pgTable('diseases', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    careTips: jsonb('care_tips').notNull(),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow(),
});
