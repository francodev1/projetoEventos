'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getCurrentUser, signOut } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Calendar, CreditCard, LogOut, Settings, Plus } from 'lucide-react'
import Link from 'next/link'

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    eventsCreated: 0,
    ticketsSold: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const currentUser = await getCurrentUser()
      
      if (!currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      // Buscar dados do usuário na tabela users
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      if (userData) {
        setUser({ ...currentUser, ...userData })
      }

      // Buscar estatísticas
      const { count: eventsCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('createdBy', currentUser.id)

      const { data: tickets } = await supabase
        .from('tickets')
        .select('purchasePrice')
        .eq('ownerId', currentUser.id)

      setStats({
        eventsCreated: eventsCount || 0,
        ticketsSold: tickets?.length || 0,
        totalRevenue: tickets?.reduce((sum, t) => sum + (t.purchasePrice || 0), 0) || 0
      })

    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const subscriptionStatus = user.subscriptionStatus || 'INACTIVE'
  const role = user.role || 'ORGANIZER'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-title font-bold text-primary">
              ChurchPass
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-title font-bold text-gray-900 mb-2">
            Olá, {user.user_metadata?.name || user.email}! 👋
          </h1>
          <p className="text-gray-600">Bem-vindo à sua área pessoal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Nome</label>
                  <p className="font-medium">{user.user_metadata?.name || 'Não informado'}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <p className="font-medium text-sm">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Tipo de Conta</label>
                  <div className="mt-1">
                    <Badge variant={role === 'ADMIN' ? 'default' : 'secondary'}>
                      {role === 'ADMIN' ? 'Administrador' : 'Organizador'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    Assinatura
                  </label>
                  <div className="mt-1">
                    <Badge 
                      variant={
                        subscriptionStatus === 'ACTIVE' ? 'default' : 
                        subscriptionStatus === 'TRIAL' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {subscriptionStatus === 'ACTIVE' && 'Ativo'}
                      {subscriptionStatus === 'TRIAL' && 'Período de Teste'}
                      {subscriptionStatus === 'INACTIVE' && 'Inativo'}
                      {subscriptionStatus === 'CANCELED' && 'Cancelado'}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/perfil/configuracoes">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-900">{stats.eventsCreated}</p>
                    <p className="text-sm text-gray-500">Eventos Criados</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-900">{stats.ticketsSold}</p>
                    <p className="text-sm text-gray-500">Ingressos Vendidos</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <span className="text-3xl">💰</span>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      R$ {stats.totalRevenue.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">Receita Total</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>O que você gostaria de fazer?</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 text-base" asChild>
                  <Link href="/eventos/novo">
                    <Plus className="mr-2 h-5 w-5" />
                    Criar Novo Evento
                  </Link>
                </Button>

                <Button variant="outline" className="h-20 text-base" asChild>
                  <Link href="/eventos">
                    <Calendar className="mr-2 h-5 w-5" />
                    Gerenciar Eventos
                  </Link>
                </Button>

                <Button variant="outline" className="h-20 text-base" asChild>
                  <Link href="/precos">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Ver Planos
                  </Link>
                </Button>

                <Button variant="outline" className="h-20 text-base" asChild>
                  <Link href="/perfil/configuracoes">
                    <Settings className="mr-2 h-5 w-5" />
                    Configurações
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Alert */}
            {subscriptionStatus === 'INACTIVE' && (
              <Card className="shadow-lg border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="text-4xl">⚠️</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-yellow-900 mb-1">
                        Ative sua assinatura
                      </h3>
                      <p className="text-sm text-yellow-800 mb-3">
                        Para criar eventos e vender ingressos, você precisa de uma assinatura ativa.
                      </p>
                      <Button asChild>
                        <Link href="/precos">
                          Ver Planos Disponíveis
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
