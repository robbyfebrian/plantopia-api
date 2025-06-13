"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievements = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.achievements = (0, pg_core_1.pgTable)('achievements', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)('name'),
    description: (0, pg_core_1.text)('description'),
    iconUrl: (0, pg_core_1.text)('icon_url'),
    conditionType: (0, pg_core_1.text)('condition_type'),
    conditionValue: (0, pg_core_1.integer)('condition_value'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
