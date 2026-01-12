// Utilitários de segurança para validação e sanitização

/**
 * Valida email usando regex robusto
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Valida senha com requisitos de segurança
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'A senha deve ter no mínimo 8 caracteres' }
  }
  if (password.length > 128) {
    return { valid: false, message: 'A senha não pode ter mais de 128 caracteres' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'A senha deve conter pelo menos uma letra maiúscula' }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'A senha deve conter pelo menos uma letra minúscula' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'A senha deve conter pelo menos um número' }
  }
  return { valid: true }
}

/**
 * Sanitiza string para prevenir XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Valida nome (não permite caracteres especiais perigosos)
 */
export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,100}$/
  return nameRegex.test(name)
}

/**
 * Valida URL de redirect para prevenir open redirect
 */
export function validateRedirectUrl(url: string): boolean {
  // Só permite URLs relativas que começam com /
  if (!url.startsWith('/')) return false
  
  // Não permite // (protocol-relative URLs)
  if (url.startsWith('//')) return false
  
  // Não permite javascript:, data:, etc
  if (/^(javascript|data|vbscript|file|about):/i.test(url)) return false
  
  return true
}

/**
 * Limpa redirect URL ou retorna padrão seguro
 */
export function getSafeRedirectUrl(url: string | null, defaultUrl: string = '/'): string {
  if (!url) return defaultUrl
  
  try {
    const decoded = decodeURIComponent(url)
    return validateRedirectUrl(decoded) ? decoded : defaultUrl
  } catch {
    return defaultUrl
  }
}

/**
 * Rate limiting simples no cliente (pode ser melhorado com Redis no backend)
 */
const rateLimitMap = new Map<string, number[]>()

export function checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const attempts = rateLimitMap.get(key) || []
  
  // Remove tentativas antigas
  const recentAttempts = attempts.filter(time => now - time < windowMs)
  
  if (recentAttempts.length >= maxAttempts) {
    return false
  }
  
  recentAttempts.push(now)
  rateLimitMap.set(key, recentAttempts)
  return true
}

/**
 * Mascarar email para logs (LGPD)
 */
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@')
  if (!name || !domain) return '***@***'
  
  const maskedName = name.length > 2 
    ? name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
    : name[0] + '*'
  
  return `${maskedName}@${domain}`
}

/**
 * Logger seguro que não expõe dados sensíveis
 */
export const secureLog = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data)
    }
  },
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, error?.message || error)
    } else {
      // Em produção, enviar para serviço de logging (Sentry, etc)
      console.error(`[ERROR] ${message}`)
    }
  },
  auth: (action: string, email?: string) => {
    const masked = email ? maskEmail(email) : 'unknown'
    console.log(`[AUTH] ${action} - User: ${masked}`)
  }
}
