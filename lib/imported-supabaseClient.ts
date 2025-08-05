// ⬇️ Imported from Csp-Ai/hybriddancers on 2025-08-04
// Source Commit: e1cb0d6e911eed297ba728a26b4e54ffa5a81bcc
// Original Path: supabaseClient.js
// Integration Status: ⚠️ Needs review
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = window.CONFIG?.SUPABASE_URL || '';
const supabaseAnonKey = window.CONFIG?.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
