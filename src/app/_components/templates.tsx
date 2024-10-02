import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Gift, Calendar } from 'lucide-react'

const templates = [
  {
    id: 'couple-story',
    title: "Couple's Story",
    description: "Tell your unique journey together",
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    features: [
      "Timeline of your relationship",
      "Photo gallery",
      "Customizable sections for key moments"
    ]
  },
  {
    id: 'declaration',
    title: "Love Declaration",
    description: "Express your feelings to someone special",
    icon: <Gift className="h-6 w-6 text-red-500" />,
    features: [
      "Romantic design elements",
      "Space for heartfelt message",
      "Option to add music"
    ]
  },
  {
    id: 'anniversary',
    title: "Anniversary Celebration",
    description: "Commemorate your special day",
    icon: <Calendar className="h-6 w-6 text-purple-500" />,
    features: [
      "Countdown to your anniversary",
      "Memory showcase",
      "Interactive timeline of your years together"
    ]
  }
]

export default function Templates() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Choose Your Love Story Template</h1>
        <p className="text-xl text-center mb-12 text-gray-600 max-w-2xl mx-auto">
          Select the perfect template to showcase your love. Each option is designed to capture the essence of your unique relationship.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  {template.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-center">{template.title}</CardTitle>
                <CardDescription className="text-center">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <p className="text-2xl font-bold mb-4">$19</p>
                <Button asChild className="w-full">
                  <Link href={`/create/${template.id}`}>Choose This Template</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}