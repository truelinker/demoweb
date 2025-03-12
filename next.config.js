/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx');

// Handle ESM modules with a dynamic import wrapper
const getRemarkGfm = async () => {
  return (await import('remark-gfm')).default;
};

const getRehypeRaw = async () => {
  return (await import('rehype-raw')).default;
};

// Export an async function that returns the next config
module.exports = async () => {
  // Wait for the dynamic imports
  const remarkGfm = await getRemarkGfm();
  const rehypeRaw = await getRehypeRaw();

  // Configure MDX with the dynamically imported plugins
  const mdxConfig = withMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeRaw],
      providerImportSource: '@mdx-js/react',
    },
  });

  const nextConfig = {
    output: 'standalone', // Optimizes for containerized environments like Render
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    // Other config options here
  };

  return mdxConfig(nextConfig);
};
