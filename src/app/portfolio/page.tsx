import Link from 'next/link';
import { getPostsByCategory } from '@/utils/markdownUtils';

export const metadata = {
  title: 'Portfolio | Demo Web Service',
  description: 'Check out my portfolio of projects and work samples.',
};

export default function PortfolioPage() {
  const portfolioItems = getPostsByCategory('portfolio');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Modern Header Section */}
      <div className="relative rounded-3xl mb-16 py-20 px-6 overflow-hidden bg-gradient-to-r from-amber-500 to-pink-500 text-center">
        <div className="absolute inset-0 bg-grid-white dark:bg-grid-white bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Portfolio</h1>
          <p className="text-xl text-amber-50 max-w-2xl mx-auto">
            Showcasing my best work and projects across various domains
          </p>
        </div>
      </div>
      
      {/* Project Type Filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button className="px-5 py-2 bg-amber-100 text-amber-800 rounded-full font-medium hover:bg-amber-200 transition-colors">
          All Projects
        </button>
        <button className="px-5 py-2 bg-slate-100 text-slate-800 rounded-full font-medium hover:bg-slate-200 transition-colors">
          Web Apps
        </button>
        <button className="px-5 py-2 bg-slate-100 text-slate-800 rounded-full font-medium hover:bg-slate-200 transition-colors">
          Mobile
        </button>
        <button className="px-5 py-2 bg-slate-100 text-slate-800 rounded-full font-medium hover:bg-slate-200 transition-colors">
          Design
        </button>
      </div>
      
      {/* Portfolio Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <div 
            key={item.id} 
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all"
          >
            {/* Project Image */}
            <div className="relative h-56 w-full bg-gradient-to-r from-amber-100 to-pink-100 dark:from-amber-900/30 dark:to-pink-900/30 overflow-hidden">
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-lg border-2 border-white text-white font-bold">View Project</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                  {item.category || 'Project'}
                </span>
                {item.tags && item.tags[0] && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                    {item.tags[0]}
                  </span>
                )}
              </div>
              
              <h2 className="text-xl font-bold mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                <Link href={`/blog/${item.slug}`} className="after:absolute after:inset-0">
                  {item.title}
                </Link>
              </h2>
              
              <p className="text-slate-700 dark:text-slate-300 mb-5 line-clamp-2">
                {item.excerpt}
              </p>
              
              <div className="flex justify-between items-center">
                <time className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short"
                  })}
                </time>
                
                <span className="text-amber-600 dark:text-amber-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {portfolioItems.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">No Portfolio Items Yet</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
            Run the conversion script to import your portfolio from the old blog, or add new projects manually.
          </p>
          <button className="px-6 py-3 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-colors">
            Import Portfolio Items
          </button>
        </div>
      )}
      
      {/* Contact CTA */}
      {portfolioItems.length > 0 && (
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-amber-500 to-pink-600 p-10 text-white shadow-xl">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
              <p className="text-amber-50 text-lg mb-6">
                I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-amber-600 font-bold rounded-xl inline-flex items-center gap-2 hover:bg-amber-50 transition-colors"
              >
                Let&apos;s Connect
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
            <div className="hidden md:block md:col-span-2">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-800 to-pink-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 