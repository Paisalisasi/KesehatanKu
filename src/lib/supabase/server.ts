import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Supabase Server / Admin Client
 * Digunakan khusus di dalam Route Handler (API backend)
 */
export const getSupabaseServerClient = () => {
  return createClient(supabaseUrl, serviceRoleKey);
};
