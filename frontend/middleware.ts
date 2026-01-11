import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Renovar sessão se expirada
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas protegidas (requerem autenticação)
  const protectedRoutes = ['/perfil', '/eventos/novo', '/eventos/editar']
  
  // Rotas públicas mesmo estando logado
  const publicRoutes = ['/', '/login', '/cadastro', '/precos', '/recursos', '/fontes']

  const path = req.nextUrl.pathname

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  // Redirecionar para login se tentar acessar rota protegida sem estar autenticado
  if (isProtectedRoute && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirecionar para perfil se já estiver autenticado e tentar acessar login/cadastro
  if ((path === '/login' || path === '/cadastro') && session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/perfil'
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
