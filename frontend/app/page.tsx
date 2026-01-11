import Link from 'next/link'
import { Calendar, CreditCard, Users, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <Badge variant="secondary" className="mb-6 px-4 py-2 hover:scale-105 transition-transform">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              Plataforma Completa para Igrejas
              </Badge>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-title font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up delay-100">
              Transforme Eventos da<br />
              <span className="text-primary">Sua Igreja</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-body">
              Plataforma completa para gestão, venda e compra de ingressos. <span className="text-primary font-semibold">Simples e seguro</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
              <Button size="lg" asChild className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                <Link href="/cadastro">
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link href="/eventos">
                  Ver Eventos
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Setup em 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Suporte Dedicado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Por Que Escolher a Fonte Church?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto font-body">
              Tudo que você precisa para gerenciar eventos da sua igreja de forma profissional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="group bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Gestão Simplificada
              </h4>
              <p className="text-gray-600 leading-relaxed font-body">
                Crie e gerencie eventos em minutos. Interface intuitiva feita especialmente para igrejas.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Pagamentos Seguros
              </h4>
              <p className="text-gray-600 leading-relaxed font-body">
                Integração com Pagar.me para pagamentos seguros e diretos na sua conta.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Controle de Acesso
              </h4>
              <p className="text-gray-600 leading-relaxed font-body">
                Ingressos eletrônicos para cada compra. Validação rápida e segura na entrada do evento.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Custo Acessível
              </h4>
              <p className="text-gray-600 leading-relaxed font-body">
                Apenas R$ 24,90/mês. Sem taxas escondidas. Cancele quando quiser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Plano Simples e Transparente</h3>
            <p className="text-gray-600 font-body">Tudo que você precisa para vender ingressos online</p>
          </div>

          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 border-2 border-primary">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold mb-2">Plano Organizador</h4>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-primary">R$ 24,90</span>
                <span className="text-gray-600 ml-2">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Eventos ilimitados</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Vendas ilimitadas de ingressos</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Apenas 3% de comissão por venda</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Emissão automática de ingressos eletrônicos</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Dashboard de gestão completo</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Suporte técnico dedicado</span>
              </li>
            </ul>

            <Button size="lg" asChild className="w-full">
              <Link href="/cadastro">
                Começar Agora
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
