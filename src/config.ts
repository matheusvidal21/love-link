export const config = {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      templates: {
        love_history: {
            priceId: 'price_1QB0KbL7n90Ey1MCHh7vtfnY',
        },
        love_declaration: {
            priceId: 'price_1QFJvTL7n90Ey1MCN1cDbQLY',
        },
        birthday_celebration: {
            priceId: 'price_1QFJwiL7n90Ey1MCu7gjJ6gA',
        }
      },
    },
  }