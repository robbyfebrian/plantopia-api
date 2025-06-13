"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromRequest = getUserIdFromRequest;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
function getUserIdFromRequest(request) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return null;
    const token = authHeader.replace('Bearer ', '');
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (typeof payload === 'object' && 'userId' in payload) {
            return payload.userId;
        }
        return null;
    }
    catch (err) {
        return null;
    }
}
