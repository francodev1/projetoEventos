'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <Header />

      <main className="w-full max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-title font-bold text-gray-900 mb-2">Bem-vindo de volta</h1>
            <p className="text-gray-600 font-body text-sm">Acesse sua conta para gerenciar eventos e vendas.</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-title">Continuar com Google</span>
            </button>

            <button className="w-full bg-black hover:bg-gray-900 text-white font-medium px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 group">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="font-title">Continuar com Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500 font-body">Ou com email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-body">Email</label>
              <input 
                id="email"
                type="email" 
                className="w-full border-2 border-gray-200 focus:border-primary focus:ring-0 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 transition-colors font-body" 
                placeholder="seu@exemplo.com" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-body">Senha</label>
              <input 
                id="password"
                type="password" 
                className="w-full border-2 border-gray-200 focus:border-primary focus:ring-0 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 transition-colors font-body" 
                placeholder="••••••••" 
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-600 font-body cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" /> 
                Lembrar-me
              </label>
              <Link href="#" className="text-sm text-primary hover:text-blue-700 font-medium font-body transition-colors">
                Esqueceu a senha?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all font-title mt-2"
            >
              Entrar
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 font-body">
              Não tem conta? <Link href="/cadastro" className="text-primary hover:text-blue-700 font-semibold font-title transition-colors">Criar conta grátis</Link>
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 font-body">
            Seus dados estão protegidos com criptografia de ponta a ponta
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
