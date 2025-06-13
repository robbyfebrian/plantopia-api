import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';
import { missions } from './missions';

export const userMissions = pgTable('user_missions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => userProfiles.id),
  missionId: uuid('mission_id').references(() => missions.id),
  isCompleted: text('is_completed'),
  completedAt: timestamp('completed_at'),
});
