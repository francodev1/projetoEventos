'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { validateEmail, validatePassword, validateName, sanitizeInput, checkRateLimit, secureLog } from '@/lib/security'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Loader2, Check, X } from 'lucide-react'

// Componente de força da senha
function PasswordStrength({ password }: { password: string }) {
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const strength = [hasMinLength, hasUppercase, hasLowercase, hasNumber].filter(Boolean).length

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-gray-200'
    if (strength <= 2) return 'bg-red-500'
    if (strength === 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (strength === 0) return ''
    if (strength <= 2) return 'Fraca'
    if (strength === 3) return 'Média'
    return 'Forte'
  }

  const CheckItem = ({ checked, text }: { checked: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {checked ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span className={checked ? 'text-green-700' : 'text-gray-500'}>{text}</span>
    </div>
  )

  if (!password) return null

  return (
    <div className="mt-3 space-y-3">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">Força da senha:</span>
          <span className={`text-xs font-medium ${
            strength <= 2 ? 'text-red-600' : strength === 3 ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${(strength / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
        <CheckItem checked={hasMinLength} text="8+ caracteres" />
        <CheckItem checked={hasUppercase} text="Maiúscula" />
        <CheckItem checked={hasLowercase} text="Minúscula" />
        <CheckItem checked={hasNumber} text="Número" />
      </div>
    </div>
  )
}

export default function CadastroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validações básicas
    if (!formData.name || !formData.email || !formData.password) {
      setError('Preencha todos os campos')
      return
    }

    // Validação de nome
    if (!validateName(formData.name)) {
      setError('Nome inválido. Use apenas letras, espaços e hífens.')
      return
    }

    // Validação de email
    if (!validateEmail(formData.email)) {
      setError('Email inválido')
      return
    }

    // Validação de senha
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Senha inválida')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    // Rate limiting
    if (!checkRateLimit(`signup-${formData.email}`, 3, 300000)) {
      setError('Muitas tentativas. Aguarde 5 minutos e tente novamente.')
      return
    }

    setLoading(true)

    try {
      // Sanitizar nome
      const sanitizedName = sanitizeInput(formData.name)
      const normalizedEmail = formData.email.toLowerCase().trim()

      // Criar usuário com Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: formData.password,
        options: {
          data: {
            name: sanitizedName,
            role: 'ORGANIZER'
          }
        }
      })

      if (authError) {
        secureLog.error('Erro ao criar conta', authError)
        setError('Erro ao criar conta. Verifique se o email já não está em uso.')
        return
      }

      // Inserir dados na tabela public.users
      if (authData.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: authData.user.id,
            name: sanitizedName,
            email: normalizedEmail,
            role: 'ORGANIZER',
            subscriptionStatus: 'INACTIVE'
          }])

        if (insertError) {
          secureLog.error('Erro ao salvar dados do usuário', insertError)
          // Não bloquear o cadastro por erro de insert
        }
      }

      secureLog.auth('Cadastro bem-sucedido', normalizedEmail)

      // Aguardar um pouco para garantir que a sessão foi criada
      await new Promise(resolve => setTimeout(resolve, 500))

      // Redirecionar para home
      router.push('/')
      router.refresh()
    } catch (err: any) {
      secureLog.error('Erro no cadastro', err)
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignup = async (provider: 'google' | 'apple') => {
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (error) {
        setError('Erro ao criar conta com ' + provider)
        setLoading(false)
      }
      // Não desativa loading aqui pois vai redirecionar
    } catch (err: any) {
      setError('Erro: ' + err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-title">Criar Conta</CardTitle>
          <CardDescription>
            Comece a gerenciar seus eventos hoje
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Social Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup('google')}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => handleSocialSignup('apple')}
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white font-medium px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500">Ou com email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
                required
              />
              <PasswordStrength password={formData.password} />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Digite a senha novamente"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={loading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar Conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Fazer login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
