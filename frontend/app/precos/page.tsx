import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PrecosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-title font-bold mb-4">Preços</h1>
        <p className="text-gray-600 mb-6">Planos e preços para organizar e vender ingressos.</p>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Plano Organizador — R$ 24,90/mês</h2>
          <p className="text-gray-500">Inclui eventos ilimitados e emissão de ingressos eletrônicos.</p>
        </div>

        <div className="mt-6">
          <Link href="/cadastro" className="text-primary hover:underline">Começar Agora</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
