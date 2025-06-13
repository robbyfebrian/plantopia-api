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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandler = void 0;
exports.loginHandler = loginHandler;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userProfiles_1 = require("../../../schema/userProfiles");
const drizzle_orm_1 = require("drizzle-orm");
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const registerHandler = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { email, password, name } = request.payload;
    const [existing] = yield db
        .select()
        .from(userProfiles_1.userProfiles)
        .where((0, drizzle_orm_1.eq)(userProfiles_1.userProfiles.email, email));
    if (existing)
        return h.response({ error: 'Email sudah terdaftar' }).code(400);
    const hashed = yield bcryptjs_1.default.hash(password, 10);
    if (!hashed)
        return h.response({ error: 'Gagal mengenkripsi password' }).code(500);
    yield db.insert(userProfiles_1.userProfiles).values({
        email: email,
        username: name,
        password: hashed,
    });
    return h.response({ success: true }).code(201);
});
exports.registerHandler = registerHandler;
function loginHandler(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = request.server.app.db;
        const { email, password } = request.payload;
        const [user] = yield db
            .select()
            .from(userProfiles_1.userProfiles)
            .where((0, drizzle_orm_1.eq)(userProfiles_1.userProfiles.email, email));
        if (!user)
            return h.response({ error: 'Email tidak ditemukan' }).code(400);
        const valid = yield bcryptjs_1.default.compare(password, user.password);
        if (!valid)
            return h.response({ error: 'Password salah' }).code(400);
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.username }, JWT_SECRET, { expiresIn: '7d' });
        return h.response({ token }).code(200);
    });
}
