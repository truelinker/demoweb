import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/utils/markdownUtils';
import ReactMarkdown from 'react-markdown';

// Generate static routes at build time
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug: string) => ({
    slug,
  }));
}

// Generate dynamic metadata for each post
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  // IMPORTANT: Await the params before using them
  const params = await props.params;
  const slug = params.slug;
  
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | Demo Web Service`,
    description: post.excerpt,
  };
}

// Make sure the component is async to handle params properly
export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  // IMPORTANT: Await the params before using them
  const params = await props.params;
  const slug = params.slug;
  
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="blog-post-container">
      {/* Fixed position spacer that pushes content below the navigation bar */}
      <div className="h-[120px] w-full" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 pt-10">{post.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          <div className="prose dark:prose-invert lg:prose-lg max-w-none blog-content">
            <ReactMarkdown
              components={{
                // Add extra padding to headings to prevent them from being hidden under the navbar
                h1: ({...props}) => <h1 className="pt-6 mt-6" {...props} />,
                h2: ({...props}) => <h2 className="pt-6 mt-6" {...props} />,
                h3: ({...props}) => <h3 className="pt-4 mt-4" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
} 