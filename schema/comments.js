"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const userProfiles_1 = require("./userProfiles");
const articles_1 = require("./articles");
exports.comments = (0, pg_core_1.pgTable)('comments', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => userProfiles_1.userProfiles.id),
    articleId: (0, pg_core_1.uuid)('article_id').references(() => articles_1.articles.id),
    parentCommentId: (0, pg_core_1.uuid)('parent_comment_id'),
    content: (0, pg_core_1.text)('content'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
