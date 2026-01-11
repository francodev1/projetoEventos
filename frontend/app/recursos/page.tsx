import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Sparkles, ClipboardList, ShieldCheck } from 'lucide-react'

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Header />

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <Sparkles className="mx-auto text-primary w-7 h-7" />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Recursos poderosos para sua igreja</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto font-body">Ferramentas pensadas para facilitar a criação, venda e controle de ingressos com segurança e transparência.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass glow shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up delay-100">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
              <ClipboardList className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Gestão de Eventos</h3>
            <p className="text-gray-600 mt-2 font-body">Crie eventos, gerencie ingressos e acompanhe vendas em um painel único.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
              <ShieldCheck className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Pagamentos Seguros</h3>
            <p className="text-gray-600 mt-2 font-body">Integração com gateways confiáveis e relatórios claros de transações.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
              <Sparkles className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Suporte e Relatórios</h3>
            <p className="text-gray-600 mt-2 font-body">Relatórios de vendas e suporte dedicado para sua equipe.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/precos" className="inline-block bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-lg shadow hover:opacity-95 transition">Ver Planos</Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
