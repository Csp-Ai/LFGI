import { supabase } from './supabaseClient';

export async function fetchPosts() {
  if (!supabase) return [];
  try {
    const { data } = await supabase
      .from('posts')
      .select('id,title,slug,created_at')
      .order('created_at', { ascending: false });
    return data ?? [];
  } catch (e) {
    console.warn('Error fetching posts', e);
    return [];
  }
}

export async function fetchPostBySlug(slug: string) {
  if (!supabase) return null;
  try {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
    return data ?? null;
  } catch (e) {
    console.warn('Error fetching post', e);
    return null;
  }
}
