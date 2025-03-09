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
      <div className="relative rounded-3xl mb-16 py-20 px-6 overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-center">
        <div className="absolute inset-0 bg-grid-white dark:bg-grid-white bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Blog</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and updates from our team
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button className="px-5 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium hover:bg-indigo-200 transition-colors">
          All Posts
        </button>
        <button className="px-5 py-2 bg-slate-100 text-slate-800 rounded-full font-medium hover:bg-slate-200 transition-colors">
          Technology
        </button>
        <button className="px-5 py-2 bg-slate-100 text-slate-800 rounded-full font-medium hover:bg-slate-200 transition-colors">
          Design
        </button>
        <button className="px-5 py-2 bg-slate-100 text-slate-800 rounded-full font-medium hover:bg-slate-200 transition-colors">
          Development
        </button>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all"
          >
            <div className="h-48 w-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30" />
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                  {post.category || 'Article'}
                </span>
                <time className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-2 flex-1">
                {post.excerpt}
              </p>
              
              <div className="flex justify-end">
                <span className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <nav className="flex items-center gap-1" aria-label="Pagination">
          <button className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">1</button>
          <button className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">2</button>
          <button className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">3</button>
          <button className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">...</button>
          <button className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">8</button>
          
          <button className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
      
      <div className="mt-20 bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6">
          Subscribe to our newsletter to receive the latest updates, articles, and resources.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
} 