"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlePayloadSchema = void 0;
const zod_1 = require("zod");
exports.articlePayloadSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    thumbnailUrl: zod_1.z.string().url().optional(),
    content: zod_1.z.string().min(1),
});
