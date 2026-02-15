
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs'; // Use nodejs runtime for Stripe (better compatibility than edge for now)

export async function POST(request: Request) {
    try {
        const { reportId } = await request.json() as any;

        if (!reportId) {
            return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
        }

        const origin = request.headers.get('origin') || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: 'Comprehensive Vehicle Report',
                            description: `Full PPSR & NEVDIS Report for ${reportId}`,
                        },
                        unit_amount: 2500, // $25.00 AUD
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/report/${reportId}?success=true`,
            cancel_url: `${origin}/report/${reportId}`,
            metadata: {
                reportId: reportId,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
