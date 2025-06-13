import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';
import * as schema from '../../schema';
config({ path: '.env' });
export const setupDrizzle = async (server) => {
    const client = postgres(process.env.DATABASE_URL, { prepare: false });
    const db = drizzle(client, { schema });
    server.app.db = db;
};
