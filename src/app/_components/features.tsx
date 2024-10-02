import { Sparkles, Palette, Globe } from 'lucide-react'

export default function Features(){
    return (
        <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Por que escolher o LoveLink?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="h-12 w-12 text-pink-500" />}
            title="Templates Personalizáveis"
            description="Escolha entre diversos templates incríveis e personalize para contar a sua história de amor."
          />
          <FeatureCard
            icon={<Palette className="h-12 w-12 text-pink-500" />}
            title="Fácil de criar"
            description="Sem necessidade de habilidades em programação. Nossa interface intuitiva automatiza a criação da página perfeita."
          />
          <FeatureCard 
            icon={<Globe className="h-12 w-12 text-pink-500" />}
            title="Compartilhe com quem você ama"
            description="Receba um link exclusivo e compartilhe sua história de amor."
          />
        </div>
      </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
      <div className="bg-pink-50 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    )
  }