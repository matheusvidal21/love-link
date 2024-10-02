import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Templates from './_components/templates'
import Features from './_components/features'
import HeaderLandingPage from './_components/header'
import Pricing from './_components/pricing'
import FooterLandingPage from './_components/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100">
      <HeaderLandingPage />

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Eternize a sua história de amor
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Crie uma página interativa e personalizada que celebre a sua jornada de amor. Compartilhe sua história de amor de uma forma especial.
          </p>
          <Button size="lg" asChild className="bg-pink-500 hover:bg-pink-600 text-white">
            <Link href="/auth">Comece sua história de amor</Link>
          </Button>
        </section>

        <section id="features" className="bg-white py-20">
          <Features />
        </section>
        
        <section id="templates" className="bg-white py-20">
          <Templates />
        </section>

        <section id="pricing" className="bg-white py-20">
          <Pricing />
        </section>

        <section className="bg-pink-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Pronto para Compartilhar sua História de Amor?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de casais que já criaram suas páginas exclusivas no LoveLink. Comece sua jornada hoje!
            </p>
            <Button size="lg" asChild className="bg-pink-500 hover:bg-pink-600 text-white">
              <Link href="/auth">Crie seu LoveLink agora</Link>
            </Button>
          </div>
        </section>
      </main>

      <FooterLandingPage />
    </div>
  )
}

