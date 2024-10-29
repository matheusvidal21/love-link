import Stripe from 'stripe'

import { config } from '@/config'

export const stripe = new Stripe(config.stripe.secretKey || '', {
  apiVersion: '2024-09-30.acacia',
  httpClient: Stripe.createFetchHttpClient(),
})

/*
function getPriceIdByTemplateType(templateType: TemplateType) {
  switch (templateType) {
    case TemplateType.LOVE_HISTORY:
      return config.stripe.templates.love_history.priceId
    case TemplateType.LOVE_DECLARATION:
      return config.stripe.templates.love_declaration.priceId
    case TemplateType.BIRTHDAY_CELEBRATION:
      return config.stripe.templates.birthday_celebration.priceId
  }
}

export const createCheckoutSession = async (templateType: TemplateType) => {
  const priceId = getPriceIdByTemplateType(templateType)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/app/order/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/app/order/cancel`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        }
      ],
    })

    return {
      url: session.url,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error to create checkout session')
  }
}

export const handleProcessWebhookUpdatedSubscription = async (event: {
  object: Stripe.Subscription
}) => {
  const stripeCustomerId = event.object.customer as string

  const userExists = await prisma.user.findFirst({
    where: {
        stripeCustomerId,
    },
    select: {
      id: true,
    },
  })

  if (!userExists) {
    throw new Error('user of stripeCustomerId not found')
  }

  await prisma.user.update({
    where: {
      id: userExists.id,
    },
    data: {
      stripeCustomerId
    },
  })
}
*/