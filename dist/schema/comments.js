import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';
import { articles } from './articles';
export const comments = pgTable('comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id),
    articleId: uuid('article_id').references(() => articles.id),
    parentCommentId: uuid('parent_comment_id'),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow(),
});
