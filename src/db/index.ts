
import { drizzle } from 'drizzle-orm/d1';
import { reports } from './schema';

export interface Env {
    DB: D1Database;
}

export const getDb = (env: Env) => {
    return drizzle(env.DB, { schema: { reports } });
};
