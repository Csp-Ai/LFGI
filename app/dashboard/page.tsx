'use client';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Dashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const savePost = async () => {
    if (!session) return;
    await supabase.from('posts').insert({ title, content });
    setTitle('');
    setContent('');
  };

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
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
