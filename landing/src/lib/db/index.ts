import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

let _db: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Lazily-constructed Drizzle client. Built on first use (not at import time) so
 * `next build` doesn't crash when DATABASE_URL is absent in the build env.
 */
function getDb(): NeonHttpDatabase<typeof schema> {
  if (_db) return _db;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Add it to .env.local (see .env.example).');
  }
  _db = drizzle(neon(connectionString), { schema });
  return _db;
}

/** Proxy so callers can `import { db }` and use it like a normal Drizzle client. */
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    const real = getDb();
    const value = real[prop as keyof typeof real];
    return typeof value === 'function' ? value.bind(real) : value;
  },
});

export { schema };
