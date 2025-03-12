'use client';

import { useEffect, useState } from 'react';

export default function SocialSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="fixed bottom-0 left-5 right-auto z-10 hidden lg:block xl:left-10">
      <ul className={`flex flex-col items-center m-0 p-0 gap-7 after:content-[''] after:block after:w-px after:h-[90px] after:mx-auto after:my-0 after:bg-[var(--light-slate)] ${isMounted ? 'opacity-100' : 'opacity-0'} transition-all duration-300 delay-[1700ms]`}>
        <li className="transition-all duration-300 hover:-translate-y-1">
          <a
            href="https://github.com/truelinker?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block p-2.5 text-[var(--light-slate)] hover:text-[var(--green)] focus:text-[var(--green)] transition-all"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <title>GitHub</title>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </li>
        <li className="transition-all duration-300 hover:-translate-y-1">
          <a
            href="https://www.linkedin.com/in/myung-guk-lee-713a9940/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block p-2.5 text-[var(--light-slate)] hover:text-[var(--green)] focus:text-[var(--green)] transition-all"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <title>LinkedIn</title>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
} 