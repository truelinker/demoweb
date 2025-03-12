import { notFound } from 'next/navigation';
import { getMDXPostBySlug, getAllMDXSlugs } from '@/utils/mdxUtils';
import dynamic from 'next/dynamic';

// Use dynamic import for MDX content
const MDXContent = dynamic(() => import('@/components/MDXContent'), {
  loading: () => <p>Loading...</p>,
});

// Generate static routes at build time
export async function generateStaticParams() {
  const slugs = getAllMDXSlugs();
  
  // Filter for only career posts
  const careerSlugs = slugs.filter(slug => {
    const post = getMDXPostBySlug(slug);
    return post?.category === 'career';
  });
  
  return careerSlugs.map((slug: string) => ({
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
  
  const post = getMDXPostBySlug(slug);
  
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
export default async function CareerPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  // IMPORTANT: Await the params before using them
  const params = await props.params;
  const slug = params.slug;
  
  const post = getMDXPostBySlug(slug);
  
  if (!post || post.category !== 'career') {
    notFound();
  }
  
  return (
    <div className="career-post-container">
      {/* Fixed position spacer that pushes content below the navigation bar */}
      <div className="h-[120px] w-full" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 pt-10">{post.title}</h1>
            {post.subtitle && (
              <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">{post.subtitle}</h2>
            )}
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
          
          <div className="prose prose-lg dark:prose-invert max-w-none career-content
                        prose-headings:font-bold 
                        prose-headings:tracking-tight
                        prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-6
                        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                        prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2
                        prose-p:mb-4 prose-p:leading-relaxed
                        prose-a:text-blue-600 prose-a:dark:text-blue-400
                        prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc
                        prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal
                        prose-li:my-2 prose-li:pl-2
                        prose-table:my-6 prose-table:border prose-table:border-gray-300 prose-table:dark:border-gray-700
                        prose-th:bg-gray-100 prose-th:dark:bg-gray-800 prose-th:p-3 prose-th:font-semibold
                        prose-td:border prose-td:p-3 prose-td:border-gray-200 prose-td:dark:border-gray-700">
            <MDXContent content={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
} 