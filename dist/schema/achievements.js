import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
export const achievements = pgTable('achievements', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name'),
    description: text('description'),
    iconUrl: text('icon_url'),
    conditionType: text('condition_type'),
    conditionValue: integer('condition_value'),
    createdAt: timestamp('created_at').defaultNow(),
});
