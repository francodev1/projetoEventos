import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function NovoEventoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-title font-bold mb-4">Criar Evento</h1>
        <p className="text-gray-600 mb-6">Use este formulário para cadastrar um novo evento e configurar ingressos.</p>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">(Formulário de criação de evento — implementar campos conforme necessário)</p>
          <div className="mt-6">
            <Link href="/eventos" className="text-primary hover:underline">Voltar para Eventos</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
