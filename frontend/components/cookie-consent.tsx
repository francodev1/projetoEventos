'use client'

import { useEffect, useState } from 'react'
import { X, Shield, Cookie, FileText } from 'lucide-react'
import Link from 'next/link'

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre true
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShow(false)
  }

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 pointer-events-none">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 pointer-events-auto animate-in slide-in-from-bottom duration-300">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Cookie className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Este site usa cookies 🍪
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais para melhorar sua experiência. 
              Você pode escolher quais cookies aceitar. Para mais informações, consulte nossa{' '}
              <Link href="/#privacidade" className="text-blue-600 hover:underline">
                Política de Privacidade
              </Link>
              {' '}e{' '}
              <Link href="/#lgpd" className="text-blue-600 hover:underline">
                Política de LGPD
              </Link>
              .
            </p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">
                  <strong>Essenciais:</strong> Necessários para autenticação e segurança (sempre ativos)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">
                  <strong>Analíticos:</strong> Ajudam a entender como você usa o site
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                Aceitar Todos
              </button>
              <button
                onClick={acceptNecessary}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition-colors"
              >
                Apenas Essenciais
              </button>
              <Link
                href="/#privacidade"
                className="px-6 py-2.5 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-colors inline-flex items-center"
              >
                Saiba Mais
              </Link>
            </div>
          </div>

          <button
            onClick={acceptNecessary}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
