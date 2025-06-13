import { drizzle } from 'drizzle-orm/postgres-js';
import { Server } from '@hapi/hapi';
import postgres from 'postgres';
import { config } from 'dotenv';
import * as schema from '../../schema';

config({ path: '.env' });

export const setupDrizzle = async (server: Server) => {
  const client = postgres(process.env.DATABASE_URL!, { prepare: false });
  const db = drizzle(client, { schema });
  server.app.db = db;
};

declare module '@hapi/hapi' {
  interface ServerApplicationState {
    db: ReturnType<typeof drizzle>;
  }
}
