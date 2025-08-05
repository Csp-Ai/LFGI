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
