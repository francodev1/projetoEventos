import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CookieConsent } from '@/components/cookie-consent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fonte Church - Gestão de Eventos para Igrejas',
  description: 'Plataforma de venda de ingressos e gestão de eventos para igrejas. Segura, fácil e profissional.',
  keywords: 'eventos, igreja, ingressos, gestão, venda de ingressos',
  authors: [{ name: 'Fonte Church' }],
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
        <CookieConsent />
      </body>
    </html>
  )
}
