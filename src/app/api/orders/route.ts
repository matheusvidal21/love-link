import { authOptions } from '@/services/auth';
import { prisma } from '@/services/prisma';
import { OrderStatus } from '@/types/order-status';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    
    console.log('Session:', session)
    console.log('Session user:', session?.user)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    if (!userEmail) {
        return NextResponse.json({ error: 'User email not found' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: { 
            email: userEmail 
        }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { templateId, formData } = body
    
    try {
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                templateId: templateId,
                status: OrderStatus.PENDING,
                formData: formData,
            }
        })

        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }
}
