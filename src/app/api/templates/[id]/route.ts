import { prisma } from '@/services/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    try {
        const template = await prisma.template.findUnique({
            where: {
                id,
            },
        })

        if (!template) {
            return NextResponse.json({
                status: 404,
                error: 'Not Found',
                message: 'Template not found',
            }, {status: 404})
        }

        return NextResponse.json(template, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            error: 'Internal Server Error',
            message: 'An error occurred while fetching template'
        }, {status: 500})
    }
}