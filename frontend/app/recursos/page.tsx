import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function RecursosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-title font-bold mb-4">Recursos</h1>
        <p className="text-gray-600 mb-6">Conheça os recursos disponíveis para gerenciar seus eventos e ingressos.</p>

        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">Detalhe do recurso A</div>
          <div className="bg-white p-6 rounded-lg shadow">Detalhe do recurso B</div>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-primary hover:underline">Voltar para Home</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
