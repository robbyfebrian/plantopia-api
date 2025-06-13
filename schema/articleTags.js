"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleTags = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const articles_1 = require("./articles");
exports.articleTags = (0, pg_core_1.pgTable)('article_tags', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    articleId: (0, pg_core_1.uuid)('article_id').references(() => articles_1.articles.id),
    tag: (0, pg_core_1.text)('tag'),
});
