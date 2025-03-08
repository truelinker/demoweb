import { getPostsByCategory } from '@/utils/markdownUtils';

export const metadata = {
  title: 'About | Demo Web Service',
  description: 'Learn more about me and my background.',
};

export default function AboutPage() {
  // Try to find an about page from converted content
  const aboutPosts = getPostsByCategory('about');
  const aboutContent = aboutPosts.length > 0 ? aboutPosts[0].content : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About</h1>
      
      {aboutContent ? (
        <div 
          className="prose dark:prose-invert lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: aboutContent }}
        />
      ) : (
        <div className="prose dark:prose-invert lg:prose-lg max-w-none">
          <h2>About Me</h2>
          <p>
            I&apos;m a Firmware Engineer at Innophase. I&apos;m currently developing firmware for 5G RU (Radio Unit) SoC, 
            but I have experience in developing computer networks related devices and Android applications before.
          </p>
          
          <p>
            This section will be updated with more detailed information after running the conversion script
            to import content from the old blog.
          </p>
          
          <div className="mt-8">
            <h3>Contact</h3>
            <p>
              Feel free to reach out via:
            </p>
            <ul>
              <li>
                <a 
                  href="https://www.linkedin.com/in/myung-guk-lee-713a9940/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 