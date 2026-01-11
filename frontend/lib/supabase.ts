import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper para obter usuário atual
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper para fazer logout
export const signOut = async () => {
  await supabase.auth.signOut()
  window.location.href = '/login'
}

// Database Types
export interface User {
  id: string
  email: string
  name: string
  role: string
  subscriptionStatus: string
  pagarmeRecipientId?: string
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  description?: string
  price: number
  date: string
  location: string
  bannerUrl?: string
  capacity?: number
  published: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Ticket {
  id: string
  qrCode: string
  status: string
  purchasePrice: number
  eventId: string
  ownerId: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  id: string
  userId: string
  status: string
  planPrice: number
  startDate?: string
  endDate?: string
  pagarmeSubscriptionId?: string
  createdAt: string
  updatedAt: string
}
