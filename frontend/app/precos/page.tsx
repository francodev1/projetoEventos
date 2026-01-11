import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PrecosPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              Planos e Preços
            </Badge>
            <h1 className="text-4xl md:text-5xl font-title font-bold text-gray-900 mb-4">
              Planos Simples e Transparentes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal e comece a gerenciar seus eventos hoje mesmo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-title font-bold mb-2">Básico</h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">Grátis</span>
                </div>
                <p className="text-gray-600">Para começar</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Até 3 eventos por mês</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">100 ingressos por evento</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Taxa de 5% por venda</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Suporte por email</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/cadastro">Começar Grátis</Link>
              </Button>
            </div>

            {/* Plano Organizador - Destaque */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-primary p-8 relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1">Mais Popular</Badge>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-title font-bold mb-2">Organizador</h3>
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-5xl font-bold text-primary">R$ 24,90</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600">Para igrejas ativas</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Eventos ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Ingressos ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Taxa de apenas 3%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">QR Code automático</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Relatórios completos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Suporte prioritário</span>
                </li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/cadastro">Assinar Agora</Link>
              </Button>
            </div>

            {/* Plano Enterprise */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-title font-bold mb-2">Enterprise</h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">Personalizado</span>
                </div>
                <p className="text-gray-600">Para grandes organizações</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tudo do plano Organizador</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Múltiplos organizadores</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">API personalizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">White label</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Suporte dedicado 24/7</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>

          {/* FAQ ou Informações Adicionais */}
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-title font-bold mb-4">Perguntas Frequentes</h2>
            <div className="text-left space-y-6 mt-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">Como funciona a taxa de 3%?</h3>
                <p className="text-gray-600">A taxa de 3% é aplicada apenas sobre as vendas realizadas. Sem custos ocultos ou taxas adicionais.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Posso cancelar a qualquer momento?</h3>
                <p className="text-gray-600">Sim! Não há período de fidelidade. Você pode cancelar sua assinatura quando quiser.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Como recebo os pagamentos?</h3>
                <p className="text-gray-600">Os pagamentos são processados automaticamente e transferidos para sua conta em até 2 dias úteis.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
