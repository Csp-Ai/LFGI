// ⬇️ Imported from Csp-Ai/hybriddancers on 2025-08-04
// Source Commit: e1cb0d6e911eed297ba728a26b4e54ffa5a81bcc
// Original Path: components/SupabaseProvider.tsx
// Integration Status: ⚠️ Needs review
'use client';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ReactNode, useState } from 'react';
import { getEnv } from '../lib/env';

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  const url = getEnv('NEXT_PUBLIC_SUPABASE_URL');
  const anonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  if (!url || !anonKey) {
    console.warn('Supabase environment variables are missing');
    return <>{children}</>;
  }

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>;
}
