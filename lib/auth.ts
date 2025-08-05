import { Session } from '@supabase/auth-helpers-nextjs';

export function isAuthenticated(session: Session | null): boolean {
  return !!session?.user;
}
