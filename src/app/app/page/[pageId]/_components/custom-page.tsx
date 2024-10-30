import Page from "@/models/PageModel"
import { prisma } from "@/services/prisma"
import { useParams } from "next/navigation"
import { useEffect, useRef } from "react"

export default function CustomPageComponent() {
    const { pageId } = useParams()
    const pageRef = useRef<Page | null>(null)

    useEffect(() => {
        const fetchPage = async () => {
            if (pageId && typeof pageId === "string") {
                pageRef.current = await prisma.page.findFirst({
                    where: { id: pageId }
                });
            }
        }
        fetchPage();
    }, [pageId])

    return (
        <div>
            {pageRef.current ? (
                <div>
                    <p>{pageRef.current.id}</p>
                    <p>{pageRef.current.formData}</p>
                    <p>{pageRef.current.templateId}</p>
                    <p>{pageRef.current.userId}</p>
                    <p>{pageRef.current.createdAt.toString()}</p>
                </div>
            ) : (
                <div>
                    <h1>Página Customizada não encontrada.</h1>
                </div>
            )}
        </div>
    )
}