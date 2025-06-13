import { pgTable, text, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
export const missions = pgTable('missions', {
    id: uuid('id').primaryKey().defaultRandom(),
    description: text('description'),
    goalType: text('goal_type'),
    goalValue: integer('goal_value'),
    xpReward: integer('xp_reward'),
    type: text('type'),
    createdAt: timestamp('created_at').defaultNow(),
});
