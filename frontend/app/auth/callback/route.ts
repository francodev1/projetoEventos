import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    // Se foi bem-sucedido, inserir dados em public.users se não existir
    if (data?.user && !error) {
      try {
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', data.user.id)
          .single()

        // Se não existe, inserir
        if (!existingUser) {
          await supabase
            .from('users')
            .insert([{
              id: data.user.id,
              name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuário',
              email: data.user.email,
              role: 'ORGANIZER',
              subscriptionStatus: 'INACTIVE'
            }])
        }
      } catch (err) {
        // Log apenas em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          console.error('[CALLBACK] Erro ao inserir usuário:', err)
        }
      }
    }
  }

  // Redirecionar para home
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}
            .from('users')
            .insert([
              {
                id: data.user.id,
                name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuário',
                email: data.user.email,
                role: 'ORGANIZER',
                subscriptionStatus: 'INACTIVE'
              }
            ])

          console.log('[CALLBACK] INSERT em users:', insertError ? `ERRO: ${insertError.message}` : 'sucesso')
        }
      } catch (err) {
        console.error('[CALLBACK] Erro ao inserir usuário:', err)
      }
    }
  } else {
    console.log('[CALLBACK] Nenhum code recebido')
  }

  // Redirecionar para home
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}
