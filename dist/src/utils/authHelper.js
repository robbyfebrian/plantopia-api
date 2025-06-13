import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
export function getUserIdFromRequest(request) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return null;
    const token = authHeader.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (typeof payload === 'object' && 'userId' in payload) {
            return payload.userId;
        }
        return null;
    }
    catch (err) {
        return null;
    }
}
