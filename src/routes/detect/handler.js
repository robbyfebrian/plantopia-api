"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDetection = void 0;
const detections_1 = require("../../../schema/detections");
const detectionSchemas_1 = require("./detectionSchemas");
const authHelper_1 = require("../../utils/authHelper");
const createDetection = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const payload = request.payload;
    const parseResult = detectionSchemas_1.detectionPayloadSchema.safeParse(payload);
    if (!parseResult.success) {
        return h
            .response({ error: 'Invalid payload', details: parseResult.error.errors })
            .code(400);
    }
    const data = Object.assign(Object.assign({}, parseResult.data), { userId });
    const [inserted] = yield db.insert(detections_1.detections).values(data).returning();
    return h.response(inserted).code(201);
});
exports.createDetection = createDetection;
