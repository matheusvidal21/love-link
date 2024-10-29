import { prisma } from '@/services/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const templates = await prisma.template.findMany()
        return NextResponse.json(templates, {status: 200})
    } catch {
        return NextResponse.json({
            status: 500,
            error: 'Internal Server Error',
            message: 'An error occurred while fetching templates'
        }, {status: 500})
    }
}