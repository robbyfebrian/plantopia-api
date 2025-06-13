"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAchievements = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const userProfiles_1 = require("./userProfiles");
const achievements_1 = require("./achievements");
exports.userAchievements = (0, pg_core_1.pgTable)('user_achievements', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => userProfiles_1.userProfiles.id),
    achievementId: (0, pg_core_1.uuid)('achievement_id').references(() => achievements_1.achievements.id),
    achievedAt: (0, pg_core_1.timestamp)('achieved_at').defaultNow(),
});
