import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || 'https://tkcnefujgwgjvwlrlxdc.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_Etgjg96PYmfci8NpkNYPIQ_iwXfgATH'

export const supabase = createClient(supabaseUrl, supabaseKey)
