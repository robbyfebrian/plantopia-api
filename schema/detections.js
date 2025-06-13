"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detections = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const userProfiles_1 = require("./userProfiles");
const diseases_1 = require("./diseases");
exports.detections = (0, pg_core_1.pgTable)('detections', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => userProfiles_1.userProfiles.id),
    plantName: (0, pg_core_1.text)('plant_name'),
    diseaseId: (0, pg_core_1.uuid)('disease_id').references(() => diseases_1.diseases.id),
    confidenceScore: (0, pg_core_1.text)('confidence_score'),
    imageUrl: (0, pg_core_1.text)('image_url'),
    detectedAt: (0, pg_core_1.timestamp)('detected_at').defaultNow(),
});
