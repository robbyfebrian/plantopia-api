"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectedPlants = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const userProfiles_1 = require("./userProfiles");
exports.collectedPlants = (0, pg_core_1.pgTable)('collected_plants', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => userProfiles_1.userProfiles.id),
    plantName: (0, pg_core_1.text)('plant_name'),
    firstCollectedAt: (0, pg_core_1.timestamp)('first_collected_at').defaultNow(),
});
