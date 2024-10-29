'use server'

import { auth } from '@/services/auth'

export async function createCheckoutSessionAction() {
  const session = await auth()

  if (!session?.user?.email) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

}