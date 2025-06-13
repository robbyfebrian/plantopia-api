import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { userProfiles } from './userProfiles';

export const collectedPlants = pgTable('collected_plants', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => userProfiles.id),
  plantName: text('plant_name'),
  firstCollectedAt: timestamp('first_collected_at').defaultNow(),
});
