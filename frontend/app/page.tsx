'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Calendar, Plus, Ticket, ArrowRight, Sparkles } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    } finally {
      setLoading(false)
    }
  }

  const handleMenuClick = (href: string) => {
    if (!user) {
      router.push('/login?redirect=' + href)
    } else {
      router.push(href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ESTADO: NÃO LOGADO */}
      {!user ? (
        <>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Sparkles className="w-3 h-3 mr-2 inline" />
                  Plataforma para Igrejas
                </Badge>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-title font-bold text-gray-900 mb-6 leading-tight">
                  Transforme os <span className="text-primary">Eventos</span> de sua Igreja
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  Gerencie eventos, venda ingressos e conecte sua comunidade em uma única plataforma.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" asChild className="text-lg px-8 py-6">
                    <Link href="/cadastro">
                      Começar Grátis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                    <Link href="/login">
                      Já tenho conta
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Funcionalidades com Click para Login */}
          <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-title font-bold text-gray-900 mb-4">
                  O que você pode fazer
                </h2>
                <p className="text-lg text-gray-600">
                  Clique em qualquer funcionalidade para começar (será necessário fazer login)
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1: Criar Evento */}
                <div 
                  onClick={() => handleMenuClick('/eventos/novo')}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Criar Evento</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Configure seu evento com data, horário, local, descrição e defina o preço dos ingressos.
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold group-hover:gap-2 gap-1 transition-all">
                    Começar <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Card 2: Meus Eventos */}
                <div 
                  onClick={() => handleMenuClick('/meus-eventos')}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Meus Eventos</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Veja todos os seus eventos, acompanhe vendas, estatísticas e gerencie ingressos vendidos.
                  </p>
                  <div className="inline-flex items-center text-purple-600 font-semibold group-hover:gap-2 gap-1 transition-all">
                    Ver eventos <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Card 3: Meus Ingressos */}
                <div 
                  onClick={() => handleMenuClick('/meus-ingressos')}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Ticket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Meus Ingressos</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Veja os ingressos que você comprou, acesse seu QR code e mostre na entrada do evento.
                  </p>
                  <div className="inline-flex items-center text-green-600 font-semibold group-hover:gap-2 gap-1 transition-all">
                    Ver ingressos <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl lg:text-5xl font-title font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg mb-10 text-blue-50">
                Crie sua conta gratuitamente e comece a gerenciar eventos da sua igreja agora!
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
                <Link href="/cadastro">
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>
        </>
      ) : (
        /* ESTADO: LOGADO - Dashboard Profissional */
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Hero */}
            <div className="mb-12 relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 shadow-xl">
              <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
              <div className="relative">
                <h1 className="text-4xl lg:text-5xl font-title font-bold text-white mb-3">
                  Olá, {user.user_metadata?.name?.split(' ')[0] || 'Organizador'}! 👋
                </h1>
                <p className="text-lg text-blue-100 max-w-2xl">
                  Gerencie seus eventos, acompanhe vendas e conecte sua comunidade em um só lugar.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -right-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">Este mês</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">0</h3>
                <p className="text-sm text-gray-600">Eventos criados</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">Total</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">0</h3>
                <p className="text-sm text-gray-600">Ingressos vendidos</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">Acumulado</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">R$ 0</h3>
                <p className="text-sm text-gray-600">Receita total</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
              <h2 className="text-2xl font-title font-bold text-gray-900 mb-6">Ações Rápidas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/eventos/novo" className="group">
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500 cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Criar Evento
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Configure um novo evento com ingressos, data e local
                    </p>
                  </div>
                </Link>

                <Link href="/meus-eventos" className="group">
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-purple-500 cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      Meus Eventos
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Gerencie eventos e acompanhe vendas em tempo real
                    </p>
                  </div>
                </Link>

                <Link href="/meus-ingressos" className="group">
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-green-500 cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Ticket className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      Meus Ingressos
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Acesse ingressos comprados e QR codes
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Eventos Recentes */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-title font-bold text-gray-900">
                    Seus Eventos
                  </h2>
                  <Link href="/eventos/novo">
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Novo
                    </Button>
                  </Link>
                </div>
                
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum evento ainda
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm mx-auto">
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

              {/* Atividade Recente */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-title font-bold text-gray-900 mb-6">
                  Atividade
                </h2>
                <div className="space-y-4">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Suas atividades recentes aparecerão aqui
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
