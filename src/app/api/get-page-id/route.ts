import { authOptions } from "@/services/auth";
import { prisma } from "@/services/prisma";
import { stripe } from "@/services/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
    }

    const sessionData = await getServerSession(authOptions)
    if (!sessionData || !sessionData.user || !sessionData.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
        const orderId = stripeSession.client_reference_id

        if (!orderId) {
            return NextResponse.json({ error: "Missing Order ID" }, { status: 400 })
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        })

        const user = await prisma.user.findUnique({
            where: { email: sessionData.user.email }
        })

        if (!order || order.userId !== user?.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const page = await prisma.page.findFirst({
            where: { orderId: orderId }
        })

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 })
        }

        return NextResponse.json({ pageId: page.id }, { status: 200 })
    } catch (error) {
        console.error('Error getting page ID:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}