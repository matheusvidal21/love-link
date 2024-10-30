import { stripe } from '@/services/stripe';
import { config } from '@/config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { templateKey, cancelUrl, orderId }: { templateKey: keyof typeof config.stripe.templates, cancelUrl: string, orderId: string } = await req.json();

        if (!templateKey || !config.stripe.templates[templateKey]) {
        return NextResponse.json({ error: 'Invalid Template.' }, { status: 400 });
        }

        const priceId = config.stripe.templates[templateKey].priceId;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                price: priceId,
                quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl,
            client_reference_id: orderId,
        });

        return NextResponse.json({ sessionId: session.id }, { status: 200 });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
