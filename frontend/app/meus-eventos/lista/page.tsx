'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, Loader2, LogIn, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function MeusEventosLista() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      setUser(user)
      setLoading(false)
    }

    checkUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-title font-bold text-gray-900 mb-2">
              Meus Eventos
            </h1>
            <p className="text-gray-600 mb-8">
              Para visualizar e gerenciar seus eventos, você precisa estar conectado à sua conta.
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full h-12 text-lg font-title">
                <Link href="/login">
                  <LogIn className="w-5 h-5 mr-2" />
                  Entrar na minha conta
                </Link>
              </Button>
              <p className="text-sm text-gray-500">
                Ainda não tem conta?{' '}
                <Link href="/cadastro" className="text-primary hover:underline font-medium">
                  Cadastre-se agora
                </Link>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-title font-bold text-gray-900">Meus Eventos</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os seus eventos criados aqui</p>
          </div>
          <Button asChild>
            <Link href="/eventos/novo">
              <PlusCircle className="w-5 h-5 mr-2" />
              Criar Novo Evento
            </Link>
          </Button>
        </div>

        {/* Placeholder para lista de eventos */}
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            Você ainda não criou nenhum evento. Comece agora mesmo clicando no botão acima.
          </p>
          <Button variant="outline" asChild>
            <Link href="/eventos/novo">Criar meu primeiro evento</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
