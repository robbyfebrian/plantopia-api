import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';
export const articles = pgTable('articles', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id),
    title: text('title'),
    description: text('description'),
    thumbnailUrl: text('thumbnail_url'),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
