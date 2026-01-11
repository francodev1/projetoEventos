import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-md mx-auto p-8">
        <h1 className="text-3xl font-title font-bold mb-4">Login</h1>
        <p className="text-gray-600 mb-6">Acesse sua conta para gerenciar eventos e vendas.</p>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">(Formulário de login — implementar autenticação)</p>
        </div>

        <div className="mt-6">
          <Link href="/cadastro" className="text-primary hover:underline">Criar conta</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
