import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Supabase Browser Client
 * Digunakan pada komponen client-side untuk auth & query terproteksi RLS
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
