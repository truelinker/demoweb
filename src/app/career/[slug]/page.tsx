import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMDXPostBySlug, getAllMDXSlugs, getMDXPostsByCategory } from '@/utils/mdxUtils';
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

  // Compute prev/next posts
  const allCareerPosts = getMDXPostsByCategory('career');
  const currentIndex = allCareerPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < allCareerPosts.length - 1 ? allCareerPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allCareerPosts[currentIndex - 1] : null;

  return (
    <div className="career-post-container">
      {/* Fixed position spacer that pushes content below the navigation bar */}
      <div className="h-[120px] w-full" aria-hidden="true"></div>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 font-mono text-xs text-[var(--slate)] max-w-4xl mx-auto pt-4">
          <Link href="/" className="hover:text-[var(--green)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/career" className="hover:text-[var(--green)] transition-colors">Career</Link>
          <span>/</span>
          <span className="text-[var(--lightest-slate)] truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

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

        {/* Prev / Next navigation */}
        <nav className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/career/${prevPost.slug}`}
              className="p-4 rounded-lg bg-[var(--light-navy)] border border-[var(--lightest-navy)] hover:border-[var(--green)] transition-all no-underline group"
            >
              <span className="text-xs font-mono text-[var(--slate)] group-hover:text-[var(--green)] transition-colors">
                &larr; Previous
              </span>
              <span className="block text-sm text-[var(--lightest-slate)] mt-1 truncate">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/career/${nextPost.slug}`}
              className="p-4 rounded-lg bg-[var(--light-navy)] border border-[var(--lightest-navy)] hover:border-[var(--green)] transition-all no-underline group text-right"
            >
              <span className="text-xs font-mono text-[var(--slate)] group-hover:text-[var(--green)] transition-colors">
                Next &rarr;
              </span>
              <span className="block text-sm text-[var(--lightest-slate)] mt-1 truncate">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </div>
  );
} 