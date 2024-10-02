import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function Pricing(){
    return (
        <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-center mb-4">Preço</h3>
              <p className="text-5xl font-bold text-center mb-6">R$19</p>
              <ul className="text-gray-600 mb-8">
                <li className="flex items-center mb-2">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                  Acesso a um template
                </li>
                <li className="flex items-center mb-2">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                  Personalização com suas informações
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                  Adição de fotos
                </li>
              </ul>
              <Button size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                <Link href="/auth">Comece agora</Link>
              </Button>
            </div>
          </div>
        </div>
    )
}