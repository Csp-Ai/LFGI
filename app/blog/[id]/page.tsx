import { supabase } from '../../../lib/supabaseClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function Post({ params }: Props) {
  const { data } = await supabase.from('posts').select('*').eq('id', params.id).single();
  if (!data) return notFound();
  return (
    <article className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </article>
  );
}
