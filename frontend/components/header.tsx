'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, PlusCircle, Calendar, Ticket, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout, getToken, decodeToken } from '@/lib/auth-api'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = () => {
    try {
      const token = getToken()
      
      if (token) {
        const payload = decodeToken(token)
        if (payload) {
          setUser(payload)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error)
      setUser(null)
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image 
                src="/assets/Ativo 6.png" 
                alt="Fonte Church Logo" 
                fill
                className="object-contain brightness-0"
                priority
              />
            </div>
            <h1 className="text-2xl font-title font-bold text-gray-900">
              Fonte Church
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  href="/eventos/novo" 
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title"
                >
                  <PlusCircle className="w-5 h-5" />
                  Criar evento
                </Link>
                <Link 
                  href="/meus-eventos" 
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title"
                >
                  <Calendar className="w-5 h-5" />
                  Meus eventos
                </Link>
                <Link 
                  href="/meus-ingressos" 
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title"
                >
                  <Ticket className="w-5 h-5" />
                  Meus ingressos
                </Link>
                <Link 
                  href="/perfil" 
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title"
                >
                  <User className="w-5 h-5" />
                  Perfil
                </Link>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  className="font-title"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-600 hover:text-primary transition-colors font-medium font-title"
                >
                  Entrar
                </Link>
                <Button asChild className="font-title">
                  <Link href="/cadastro">
                    Começar Agora
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link
                    href="/eventos/novo"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PlusCircle className="w-5 h-5" />
                    Criar evento
                  </Link>
                  <Link
                    href="/meus-eventos"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calendar className="w-5 h-5" />
                    Meus eventos
                  </Link>
                  <Link
                    href="/meus-ingressos"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Ticket className="w-5 h-5" />
                    Meus ingressos
                  </Link>
                  <Link
                    href="/perfil"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Perfil
                  </Link>
                  <Button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                    variant="outline" 
                    className="w-full font-title"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Button asChild className="w-full font-title">
                    <Link href="/cadastro">
                      Começar Agora
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
