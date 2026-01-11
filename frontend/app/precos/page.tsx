import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle } from 'lucide-react'

export default function PrecosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold">Planos simples e transparentes</h1>
          <p className="text-gray-600 mt-2 font-body">Escolha o plano certo para sua igreja e comece a vender ingressos hoje.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          <div className="p-8 rounded-2xl glass glow shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-2 border-primary/20 animate-fade-in-up delay-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">R$ 24,90</div>
              <div className="text-gray-500 font-body">/mês</div>
              <h3 className="mt-4 font-semibold">Plano Organizador</h3>
              <p className="text-gray-600 mt-2 font-body">Eventos ilimitados e emissão automática de ingressos eletrônicos.</p>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-gray-700 font-body"><CheckCircle className="text-green-500" /> Eventos ilimitados</li>
              <li className="flex items-center gap-3 text-gray-700 font-body"><CheckCircle className="text-green-500" /> Vendas ilimitadas</li>
              <li className="flex items-center gap-3 text-gray-700 font-body"><CheckCircle className="text-green-500" /> Emissão de ingressos eletrônicos</li>
            </ul>

            <div className="mt-6 text-center">
              <Link href="/cadastro" className="inline-block bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-3 rounded-lg shadow">Assinar</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
