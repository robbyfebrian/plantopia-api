"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleVotes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const userProfiles_1 = require("./userProfiles");
const articles_1 = require("./articles");
exports.articleVotes = (0, pg_core_1.pgTable)('article_votes', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => userProfiles_1.userProfiles.id),
    articleId: (0, pg_core_1.uuid)('article_id').references(() => articles_1.articles.id),
    voteType: (0, pg_core_1.text)('vote_type'),
});
