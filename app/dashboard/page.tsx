'use client';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { isAuthenticated } from '../../lib/auth';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function Dashboard() {
  const session = useSession();
  let supabase: ReturnType<typeof useSupabaseClient> | null = null;
  try {
    supabase = useSupabaseClient();
  } catch (e) {
    console.warn('Supabase client unavailable', e);
  }

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const savePost = async () => {
    if (!session || !supabase) return;
    await supabase.from('posts').upsert({
      title,
      slug,
      body: content,
      author: session.user?.email ?? null,
    });
    setTitle('');
    setSlug('');
    setContent('');
  };

  if (!supabase) {
    return <div>Supabase client unavailable</div>;
  }

  if (!isAuthenticated(session)) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        view="magic_link"
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="slug"
        className="w-full p-2 border rounded"
      />
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <button
        onClick={savePost}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Post
      </button>
    </div>
  );
}
