"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const userProfiles_1 = require("./userProfiles");
exports.articles = (0, pg_core_1.pgTable)('articles', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => userProfiles_1.userProfiles.id),
    title: (0, pg_core_1.text)('title'),
    description: (0, pg_core_1.text)('description'),
    thumbnailUrl: (0, pg_core_1.text)('thumbnail_url'),
    content: (0, pg_core_1.text)('content'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
