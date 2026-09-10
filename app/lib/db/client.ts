import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

type Db = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  var __bodyunmutedDbClient: postgres.Sql | undefined;
  var __bodyunmutedDb: Db | undefined;
}

/**
 * Lazily constructs the Drizzle client on first actual query instead of at
 * module-import time. app/dashboard/layout.tsx (shared by every dashboard
 * route, not just the roadmap ones) resolves the current app_user on every
 * page load, so importing this module must never throw on its own — only a
 * page that actually queries the DB should fail if DATABASE_URL is missing
 * or Postgres is unreachable, not the whole dashboard shell.
 */
export function getDb(): Db {
  if (globalThis.__bodyunmutedDb) return globalThis.__bodyunmutedDb;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('Missing DATABASE_URL environment variable');

  // Reuse one connection across Next.js dev-server hot reloads instead of
  // opening a new pool on every file save.
  const client = globalThis.__bodyunmutedDbClient ?? postgres(databaseUrl);
  if (process.env.NODE_ENV !== 'production') globalThis.__bodyunmutedDbClient = client;

  const db = drizzle(client, { schema });
  globalThis.__bodyunmutedDb = db;
  return db;
}
