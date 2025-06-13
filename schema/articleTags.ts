import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { articles } from './articles';

export const articleTags = pgTable('article_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  articleId: uuid('article_id').references(() => articles.id),
  tag: text('tag'),
});
