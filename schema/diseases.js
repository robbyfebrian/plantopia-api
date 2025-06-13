"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diseases = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.diseases = (0, pg_core_1.pgTable)('diseases', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    careTips: (0, pg_core_1.jsonb)('care_tips').notNull(),
    imageUrl: (0, pg_core_1.text)('image_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
