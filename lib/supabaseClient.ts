// ⬇️ Imported from Csp-Ai/hybriddancers on 2025-08-04
// Source Commit: e1cb0d6e911eed297ba728a26b4e54ffa5a81bcc
// Original Path: lib/supabaseClient.ts
// Integration Status: ⚠️ Needs review
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './env';

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
