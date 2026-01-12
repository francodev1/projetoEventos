'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoginModal } from '@/components/login-modal'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Verificar se já está logado
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Já está logado, redirecionar
        router.replace(redirect)
      } else {
        setChecking(false)
      }
    }
    checkAuth()
  }, [])

  const handleClose = () => {
    router.replace('/')
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <LoginModal 
      isOpen={true} 
      onClose={handleClose} 
      redirectTo={redirect}
    />
  )
}
