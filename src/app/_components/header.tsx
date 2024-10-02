import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"


export default function HeaderLandingPage() {
    return (
        <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-gray-800">LoveLink</span>
          </div>
          <div className="space-x-4">
            <Link href="#templates" className="text-gray-600 hover:text-gray-800">Templates</Link>
            <Link href="#features" className="text-gray-600 hover:text-gray-800">Funcionalidades</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-800">Preço</Link>
            <Button asChild>
              <Link href="/auth">Comece agora</Link>
            </Button>
          </div>
        </nav>
      </header>
    )
}