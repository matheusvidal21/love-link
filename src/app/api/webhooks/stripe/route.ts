import { config } from "@/config";
import { prisma } from "@/services/prisma";
import { stripe } from "@/services/stripe";
import { OrderStatus } from "@/types/order-status";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")

  let event: Stripe.Event

  try {
    const body = await req.arrayBuffer()
    const buf = Buffer.from(body)
    const webhookSecret = config.stripe.webhookSecret

    if (!sig || !webhookSecret) {
      return new NextResponse('Webhook signature or secret is missing', { status: 400 })
    }

    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (error) {
    console.log('Error verifying webhook signature', error)
    return new NextResponse('Webhook Error: ' + error, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.client_reference_id

    if (!orderId) {
      return new NextResponse('Order ID is missing in the session', { status: 400 })
    }

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus.PAID,
      }
    })

    if (order) {
      await prisma.page.create({
        data: {
          orderId: order.id,
          userId: order.userId,
          templateId: order.templateId,
          formData: order.formData,
        }
      })
      // TODO: ENVIAR EMAIL PARA O USUÁRIO
    } 
  } else {
    console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}