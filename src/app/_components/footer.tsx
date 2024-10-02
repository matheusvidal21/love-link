import { Heart, Link } from "lucide-react";

export default function FooterLandingPage() {
    return (
        <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold">LoveLink</span>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-pink-300">Terms de serviço</Link>
              <Link href="#" className="hover:text-pink-300">Política de privacidade</Link>
              <Link href="/support" className="hover:text-pink-300">Suporte</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} LoveLink. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    )
}