import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Mail } from "lucide-react"
import Link from "next/link"
import AppStyle from '../../styles/AppGlobal.module.css'

const faqs = [
    {
        question: "O que é o LoveLink?",
        answer: "O LoveLink é um serviço web criado especialmente para casais, onde você pode personalizar páginas interativas com informações sobre o seu relacionamento. Você pode criar algo especial, como uma página com sua história, destaques e muito mais, para compartilhar de uma maneira única e divertida."
    },
    {
        question: "Como funciona o processo de personalização?",
        answer: "É simples! Você escolhe um dos nossos templates exclusivos e o personaliza com informações como onde vocês se conheceram, quanto tempo estão juntos e outros detalhes especiais. Uma vez que a personalização esteja completa, você pode finalizar o processo com o pagamento, e nós criaremos uma página interativa para você compartilhar com seu parceiro."
    },
    {
        question: "Como posso compartilhar minha página personalizada?",
        answer: "Uma vez que seu template esteja completo, você receberá um link único e um código QR. Basta compartilhar esse link ou código QR com quem você desejar, e eles poderão acessar a página personalizada que você criou."
    },
    {
        question: "Posso editar minha página depois de pronta?",
        answer: "Infelizmente, uma vez que a página foi criada, não é possível editá-la. Certifique-se de revisar todos os detalhes antes de concluir a personalização e o pagamento."
    },
    {
        question: "Quais métodos de pagamento vocês aceitam?",
        answer: "Atualmente aceitamos todos os principais cartões de crédito e débito, bem como opções de pagamento digital como PayPal e Pix."
    },
    {
        question: "Quanto custa criar uma página?",
        answer: "O custo de criar uma página depende do template que você escolher. Cada template tem um preço único que será exibido antes de finalizar a personalização e o pagamento."
    },
    {
        question: "Por quanto tempo minha página estará disponível?",
        answer: "A página personalizada estará disponível por um período de 12 meses. Após isso, você pode renová-la ou criar uma nova página com atualizações sobre o seu relacionamento."
    },
    {
        question: "Posso criar mais de uma página?",
        answer: "Sim, você pode criar quantas páginas quiser. Cada nova página exigirá uma nova personalização e pagamento."
    },
    {
        question: "O que faço se tiver problemas ao criar a página?",
        answer: "Nossa equipe de suporte está disponível para ajudá-lo em qualquer etapa do processo. Basta entrar em contato via nosso chat de suporte ou e-mail, e resolveremos seu problema o mais rápido possível."
    },
    {
        question: "Minhas informações estão seguras?",
        answer: "Sim, levamos sua privacidade muito a sério. Todas as informações que você compartilha conosco são protegidas por criptografia, e seus dados nunca serão compartilhados com terceiros."
    }
]

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className='flex items-center space-x-2 mb-6'>
            <HelpCircle className="h-8 w-8 text-red-500" />
            <h1 className={AppStyle['page-title']}>Ajuda</h1>
        </div>
        <p className={AppStyle['page-subtitle']}>
            Aqui você encontrará respostas para as perguntas mais frequentes e orientações sobre como utilizar nosso serviço.
        </p>

        <Card className="mb-8">
            <CardHeader>
            <CardTitle>Perguntas frequentes</CardTitle>
            </CardHeader>
            <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Precisa de mais ajuda?</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="mb-4">Caso não encontrar a resposta à sua pergunta, não hesite em entrar em contato a nossa equipe de suporte.</p>
            <Button asChild className="bg-red-600 text-white hover:bg-red-500">
                <Link href="mailto:suporte@lovelink.com">
                <Mail className="mr-2 h-4 w-4" /> suporte@lovelink.com
                </Link>
            </Button>
            </CardContent>
        </Card>
    </div>
  )
}