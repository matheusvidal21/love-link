import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Sucess() {
  const { searchParams } = new URL(window.location.href)
  const session_id = searchParams.get('session_id')
  const { data: sessionData } = useSession()
  const [pageId, setPageId] = useState<string | null>(null)

  useEffect(() => {
    if (session_id && sessionData) {
      fetch(`/api/get-page-id?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.pageId) {
            setPageId(data.pageId)
          } else {
            console.error('Page ID not found')
          }
        })
        .catch((error) => {
          console.error('Error fetching page ID', error)
        })
    }
  }, [session_id, sessionData])

  return (
    <div>
      <h1>Payment Successful!</h1>
      {pageId ? (
        <a href={`/app/page/${pageId}`}>
          <Button>Acesse sua página customizada</Button>
        </a>
      ) : (
        <p>Carregando sua página customizada...</p>
      )}
    </div>
  )
}