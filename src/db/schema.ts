
import { sqliteTable, text, integer, numeric } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const reports = sqliteTable('reports', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    created_at: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
    vin: text('vin').notNull(),
    plate: text('plate'),
    make: text('make'),
    model: text('model'),
    year: numeric('year'),
    stolen_status: text('stolen_status'),
    finance_status: text('finance_status'),
    written_off_status: text('written_off_status'),
    user_id: text('user_id'),
    is_unlocked: integer('is_unlocked', { mode: 'boolean' }).notNull().default(false),
});
