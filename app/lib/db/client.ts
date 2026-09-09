import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

declare global {
  var __bodyunmutedDbClient: postgres.Sql | undefined;
}

function createClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('Missing DATABASE_URL environment variable');
  return postgres(databaseUrl);
}

// Reuse one connection across Next.js dev-server hot reloads instead of
// opening a new pool on every file save.
const client = globalThis.__bodyunmutedDbClient ?? createClient();
if (process.env.NODE_ENV !== 'production') globalThis.__bodyunmutedDbClient = client;

export const db = drizzle(client, { schema });
