"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectionPayloadSchema = void 0;
const zod_1 = require("zod");
exports.detectionPayloadSchema = zod_1.z.object({
    plantName: zod_1.z.string().min(1),
    diseaseId: zod_1.z.string().uuid(),
    confidenceScore: zod_1.z.string().min(1),
    imageUrl: zod_1.z.string().url(),
});
