'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Ticket, Loader2, LogIn, Search } from 'lucide-react'
import Link from 'next/link'


export default function MeusIngressosLista() {
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
              <Ticket className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-title font-bold text-gray-900 mb-2">
              Meus Ingressos
            </h1>
            <p className="text-gray-600 mb-8">
              Para visualizar seus ingressos e histórico de compras, você precisa estar conectado.
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
            <h1 className="text-3xl font-title font-bold text-gray-900">Meus Ingressos</h1>
            <p className="text-gray-600 mt-1">Todos os seus ingressos e confirmações de presença</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <Search className="w-5 h-5 mr-2" />
              Procurar Eventos
            </Link>
          </Button>
        </div>

        {/* Placeholder para lista de ingressos */}
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Você ainda não possui ingressos</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            Explore os eventos disponíveis na nossa plataforma e garanta sua vaga.
          </p>
          <Button asChild>
            <Link href="/">Ver eventos disponíveis</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
