import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';
import { articles } from './articles';

export const articleSaves = pgTable('article_saves', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => userProfiles.id),
  articleId: uuid('article_id').references(() => articles.id),
  savedAt: timestamp('saved_at').defaultNow(),
});
