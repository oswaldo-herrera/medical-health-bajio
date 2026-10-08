import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// null hasta que se configuren las variables en .env (ver .env.example)
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null
