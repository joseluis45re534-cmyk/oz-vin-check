
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const reports = sqliteTable('reports', {
    id: text('id').primaryKey(),
    vin: text('vin').notNull(),
    make: text('make'),
    model: text('model'),
    year: integer('year'),
    data: text('data', { mode: 'json' }).notNull(), // Stores full raw report
    is_unlocked: integer('is_unlocked', { mode: 'boolean' }).default(false),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
