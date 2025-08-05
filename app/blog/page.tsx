import Link from 'next/link';
import { fetchPosts } from '../../lib/blog';

export default async function Blog() {
  const posts = await fetchPosts();
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`} className="block border-b pb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
        </Link>
      ))}
    </div>
  );
}
