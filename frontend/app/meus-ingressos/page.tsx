'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Ticket, QrCode } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function MeusIngressosPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-title font-bold text-gray-900 mb-2">
            Meus Ingressos
          </h1>
          <p className="text-lg text-gray-600">
            Visualize e acesse seus ingressos comprados
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Nenhum ingresso ainda
            </h2>
            <p className="text-gray-600 mb-4">
              Você ainda não comprou ingressos para nenhum evento
            </p>
            <p className="text-sm text-gray-500">
              Quando você comprar ingressos, eles aparecerão aqui com QR code para acesso
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
