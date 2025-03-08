import Link from 'next/link';
import { getAllPosts } from '@/utils/markdownUtils';

export const metadata = {
  title: 'Blog | Demo Web Service',
  description: 'Read our latest blog posts about web development and technology.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 