import Stripe from 'stripe'

import { config } from '@/config'

export const stripe = new Stripe(config.stripe.secretKey || '', {
  apiVersion: '2024-09-30.acacia',
  httpClient: Stripe.createFetchHttpClient(),
})

