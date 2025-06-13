import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';
import { achievements } from './achievements';

export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => userProfiles.id),
  achievementId: uuid('achievement_id').references(() => achievements.id),
  achievedAt: timestamp('achieved_at').defaultNow(),
});
