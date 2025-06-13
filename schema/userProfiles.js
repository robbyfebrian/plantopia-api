"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfiles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userProfiles = (0, pg_core_1.pgTable)('user_profiles', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    username: (0, pg_core_1.text)('username').notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    level: (0, pg_core_1.integer)('level').default(1),
    xp: (0, pg_core_1.integer)('xp').default(0),
    streakCount: (0, pg_core_1.integer)('streak_count').default(0),
    lastDetectionDate: (0, pg_core_1.date)('last_detection_date'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
