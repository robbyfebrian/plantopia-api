import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  date,
} from 'drizzle-orm/pg-core';

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  level: integer('level').default(1),
  xp: integer('xp').default(0),
  streakCount: integer('streak_count').default(0),
  lastDetectionDate: date('last_detection_date'),
  createdAt: timestamp('created_at').defaultNow(),
});
