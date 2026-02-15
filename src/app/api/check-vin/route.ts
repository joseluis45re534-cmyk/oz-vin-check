
import { NextResponse } from 'next/server';
import { fetchVehicleData } from '@/lib/vehicle-api';
import { getDb } from '@/db';
import { reports } from '@/db/schema';
// import { v4 as uuidv4 } from 'uuid'; // Removed to use crypto.randomUUID

// Since we are using D1 and potentially Edge, we need to handle DB connection carefully.
// Note: 'uuid' package might not be compatible with Edge runtime directly without polyfills, 
// but let's try standard crypto.randomUUID() if environment supports it, or use the one from schema default.

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const { vin, plate } = await request.json() as any;

        if (!vin && !plate) {
            return NextResponse.json({ error: 'VIN or Plate is required' }, { status: 400 });
        }

        const identifier = vin || plate;

        // 1. Fetch Data (Mock)
        const data = await fetchVehicleData(identifier);

        // 2. Save to Database (Initial Locked Report)
        // We need access to D1. In Next.js App Router with Cloudflare, we usually get it via request context or bindings
        // However, with `drizzle-orm/d1`, we need the binding. 
        // In local dev `npm run dev`, getting the binding is tricky without `next-on-pages` setup or `wrangler dev`.
        // For now, we'll assume we are running in an environment where `process.env` or global `env` has it, 
        // OR we default to just returning the preview if DB connection fails (graceful degradation for dev).

        let reportId = crypto.randomUUID();

        try {
            // @ts-ignore
            const db = getDb(process.env); // This assumes process.env has DB binding which works in some setups
            // Actual Cloudflare workers expose it on `env` passed to the handler, but Next.js abstracts this.
            // For `next-on-pages`, we use `getRequestContext().env.DB`.

            // Let's rely on standard logic: if we can't save, we just return the preview with a generated ID.
            // In a real app, we MUST save. 

            // TODO: Implement actual DB save when D1 environment is fully linked.
            // For this immediate step, we will defer the DB insert to when we can confirm the env setup.
            console.log('Would save report:', { ...data, identifier });

        } catch (e) {
            console.warn('DB save skipped (env not ready):', e);
        }

        // 3. Return Preview
        return NextResponse.json({
            success: true,
            reportId,
            preview: {
                make: data.make,
                model: data.model,
                year: data.year,
                // Sensitive data is hidden in preview
                stolen_status: 'LOCKED',
                finance_status: 'LOCKED',
                written_off_status: 'LOCKED',
            },
            is_locked: true,
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
