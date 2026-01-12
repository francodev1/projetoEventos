'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, Plus, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function MeusEventosPage() {
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
            Meus Eventos
          </h1>
          <p className="text-lg text-gray-600">
            Gerencie todos os seus eventos em um só lugar
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
          <Button asChild size="lg">
            <Link href="/eventos/novo">
              <Plus className="w-5 h-5 mr-2" />
              Criar Novo Evento
            </Link>
          </Button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Nenhum evento criado ainda
            </h2>
            <p className="text-gray-600 mb-8">
              Comece criando seu primeiro evento e venda ingressos para sua comunidade
            </p>
            <Button asChild size="lg">
              <Link href="/eventos/novo">
                <Plus className="w-5 h-5 mr-2" />
                Criar Primeiro Evento
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
