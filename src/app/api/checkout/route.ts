import { stripe } from '@/services/stripe';
import { config } from '@/config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { templateKey, cancelUrl }: { templateKey: keyof typeof config.stripe.templates, cancelUrl: string} = await req.json();

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
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/order/success`,
            cancel_url: cancelUrl,
        });

        return NextResponse.json({ sessionId: session.id }, { status: 200 });
        } catch (error: unknown) {
        console.error('Erro ao criar sessão de checkout:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
        }
    }
}
