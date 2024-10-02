'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import AppStyle from '../styles/AppGlobal.module.css'
import TemplateModel from "@/models/TemplateModel"
import Image from 'next/image'
import { Home } from 'lucide-react'

export default function Dashboard() {
  const [templates, setTemplates] = useState<TemplateModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch('/api/templates')
        const data = await response.json()
        setTemplates(data)
      } catch {
        console.error('Um erro ocorreu ao buscar os templates.')
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])


  return (
    <div>
        <div className='flex items-center space-x-2 mb-6'>
          <Home className="h-8 w-8 text-red-500" />
          <h1 className={AppStyle['page-title']}>Bem-vindo ao LoveLink!</h1>
        </div>
        <p className={AppStyle['page-subtitle']}>Escolha um template para começar a criar a sua história de amor</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {loading ? (
            <div className="fixed inset-0 flex justify-center items-center">
              <div className={AppStyle.loader}></div>
            </div>
          ) : (
            templates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader>
                  <Image 
                    src={template.thumbnail ?? '/images/not-fount.jpg'}
                    alt={template.name}
                    width={500}
                    height={200}
                    layout='responsive'
                    className='rounded-lg mb-6'
                  />
                  <CardTitle className="text-xl font-semibold ">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{template.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link href={`/templates/${template.id}`}>Demonstração</Link>
                  </Button>
                  <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                    <Link href={`app/create/${template.id}`}>Criar</Link>
                  </Button>
                </CardFooter>
              </Card>
            )))}
        </div>
    </div>
  )
}

