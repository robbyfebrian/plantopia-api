"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.missions = (0, pg_core_1.pgTable)('missions', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    description: (0, pg_core_1.text)('description'),
    goalType: (0, pg_core_1.text)('goal_type'),
    goalValue: (0, pg_core_1.integer)('goal_value'),
    xpReward: (0, pg_core_1.integer)('xp_reward'),
    type: (0, pg_core_1.text)('type'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
