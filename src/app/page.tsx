import Link from "next/link";
import { getAllPosts } from "@/utils/markdownUtils";

export default function Home() {
  // Get the latest 3 blog posts for the homepage
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">Welcome to Demo Web Service</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          A modern web application built with Next.js, ready for deployment on Render.
        </p>
        <Link
          href="/blog"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore Our Blog
        </Link>
      </section>

      {/* Latest Posts Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
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
      </section>

      {/* Features Section */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Modern Architecture</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built with Next.js 15, leveraging the App Router for optimized
              performance and improved developer experience.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fully responsive UI built with Tailwind CSS, ensuring a great
              experience on all devices.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Blog Platform</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Integrated blog with categories, tags, and Markdown support for
              easy content creation and management.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
