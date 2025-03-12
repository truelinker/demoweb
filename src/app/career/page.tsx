import { getMDXPostsByCategory } from '@/utils/mdxUtils';
import { getPostsByCategory } from '@/utils/markdownUtils';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Career | Demo Web Service',
  description: 'My professional background and experience.',
};

// Use dynamic import for MDX content
const MDXContent = dynamic(() => import('@/components/MDXContent'), {
  loading: () => <p>Loading...</p>,
});

export default function CareerPage() {
  // Try to find career posts from MDX content first
  const mdxCareerPosts = getMDXPostsByCategory('career');
  
  // If no MDX posts, fall back to markdown posts
  const markdownCareerPosts = getPostsByCategory('career');
  
  // Use MDX posts if available, otherwise use markdown posts
  const careerPosts = mdxCareerPosts.length > 0 ? mdxCareerPosts : markdownCareerPosts;
  const careerContent = careerPosts.length > 0 ? careerPosts[0].content : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Career</h1>
      
      {careerContent ? (
        <div className="prose dark:prose-invert lg:prose-lg max-w-none">
          {mdxCareerPosts.length > 0 ? (
            <MDXContent content={careerContent} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: careerContent }} />
          )}
        </div>
      ) : (
        <div className="prose dark:prose-invert lg:prose-lg max-w-none">
          <h2>Professional Experience</h2>
          
          <div className="mb-8">
            <h3>Firmware Engineer at Innophase</h3>
            <p className="text-sm text-gray-500">Current</p>
            <p>
              Developing firmware for 5G RU (Radio Unit) SoC.
            </p>
          </div>
          
          <p className="text-gray-600 italic">
            This section will be updated with more detailed career information after running 
            the conversion script to import content from the old blog.
          </p>
        </div>
      )}
    </div>
  );
} 