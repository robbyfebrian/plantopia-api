import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userProfiles } from '../../../schema/userProfiles';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const registerHandler = async (request: Request, h: ResponseToolkit) => {
  const db = request.server.app.db;
  const { email, password, name } = request.payload as any;
  const [existing] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.email, email));
  if (existing) return h.response({ error: 'Email sudah terdaftar' }).code(400);

  const hashed = await bcrypt.hash(password, 10);
  if (!hashed)
    return h.response({ error: 'Gagal mengenkripsi password' }).code(500);

  await db.insert(userProfiles).values({
    email: email,
    username: name,
    password: hashed,
  });

  return h.response({ success: true }).code(201);
};

export async function loginHandler(request: Request, h: ResponseToolkit) {
  const db = request.server.app.db;
  const { email, password } = request.payload as any;

  const [user] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.email, email));
  if (!user) return h.response({ error: 'Email tidak ditemukan' }).code(400);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return h.response({ error: 'Password salah' }).code(400);

  const token = jwt.sign(
    { userId: user.id, email: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  return h.response({ token }).code(200);
}
