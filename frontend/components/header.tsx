'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/eventos/novo" 
              className="text-gray-600 hover:text-primary transition-colors font-medium font-title"
            >
              Criar Evento
            </Link>
            <Link 
              href="/recursos" 
              className="text-gray-600 hover:text-primary transition-colors font-medium font-title"
            >
              Recursos
            </Link>
            <Link 
              href="/precos" 
              className="text-gray-600 hover:text-primary transition-colors font-medium font-title"
            >
              Preços
            </Link>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-primary transition-colors font-medium font-title"
            >
              Login
            </Link>
            <Button asChild className="font-title">
              <Link href="/cadastro">
                Começar Agora
              </Link>
            </Button>
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
              <Link
                href="/eventos/novo"
                className="text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Criar Evento
              </Link>
              <Link
                href="/recursos"
                className="text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recursos
              </Link>
              <Link
                href="/precos"
                className="text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preços
              </Link>
              <Link
                href="/login"
                className="text-gray-600 hover:text-primary transition-colors font-medium font-title px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Button asChild className="w-full font-title">
                <Link href="/cadastro">
                  Começar Agora
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
