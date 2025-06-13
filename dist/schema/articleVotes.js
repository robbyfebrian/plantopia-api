import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';
import { articles } from './articles';
export const articleVotes = pgTable('article_votes', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id),
    articleId: uuid('article_id').references(() => articles.id),
    voteType: text('vote_type'),
});
