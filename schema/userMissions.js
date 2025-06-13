"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMissions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const userProfiles_1 = require("./userProfiles");
const missions_1 = require("./missions");
exports.userMissions = (0, pg_core_1.pgTable)('user_missions', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => userProfiles_1.userProfiles.id),
    missionId: (0, pg_core_1.uuid)('mission_id').references(() => missions_1.missions.id),
    isCompleted: (0, pg_core_1.text)('is_completed'),
    completedAt: (0, pg_core_1.timestamp)('completed_at'),
});
