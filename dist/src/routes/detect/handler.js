import { detections } from '../../../schema/detections';
import { detectionPayloadSchema } from './detectionSchemas';
import { getUserIdFromRequest } from '../../utils/authHelper';
export const createDetection = async (request, h) => {
    const db = request.server.app.db;
    const userId = getUserIdFromRequest(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const payload = request.payload;
    const parseResult = detectionPayloadSchema.safeParse(payload);
    if (!parseResult.success) {
        return h
            .response({ error: 'Invalid payload', details: parseResult.error.errors })
            .code(400);
    }
    const data = { ...parseResult.data, userId };
    const [inserted] = await db.insert(detections).values(data).returning();
    return h.response(inserted).code(201);
};
