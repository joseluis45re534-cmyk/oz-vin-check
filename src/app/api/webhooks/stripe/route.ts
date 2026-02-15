
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getDb } from '@/db';
import { reports } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const reportId = session.metadata?.reportId;

        if (reportId) {
            try {
                // Update DB to unlock report
                // Note: In a real deployment, we need access to the D1 binding.
                // With 'nodejs' runtime and d1-http driver, we might need specific env setup.
                // For 'dev', we might log it.

                console.log(`Payment successful for Report ID: ${reportId}. Unlocking...`);

                // TODO: Actual DB Update
                // const db = getDb(process.env as any);
                // await db.update(reports).set({ is_unlocked: true }).where(eq(reports.id, reportId));

            } catch (dbError) {
                console.error('Failed to update database:', dbError);
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
