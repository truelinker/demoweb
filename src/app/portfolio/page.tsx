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
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                <Link href={`/blog/${item.slug}`}>
                  {item.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {item.excerpt}
              </p>
              <Link 
                href={`/blog/${item.slug}`}
                className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {portfolioItems.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No portfolio items available yet. Run the conversion script to import your portfolio from the old blog.
          </p>
        </div>
      )}
    </div>
  );
} 