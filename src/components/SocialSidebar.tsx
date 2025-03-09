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
            href="https://github.com" 
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
        <li className="transition-all duration-300 hover:-translate-y-1">
          <a
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block p-2.5 text-[var(--light-slate)] hover:text-[var(--green)] focus:text-[var(--green)] transition-all"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <title>Twitter</title>
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
        </li>
        <li className="transition-all duration-300 hover:-translate-y-1">
          <a
            href="https://codepen.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block p-2.5 text-[var(--light-slate)] hover:text-[var(--green)] focus:text-[var(--green)] transition-all"
            aria-label="CodePen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <title>CodePen</title>
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
              <line x1="12" y1="22" x2="12" y2="15.5"></line>
              <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
              <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
              <line x1="12" y1="2" x2="12" y2="8.5"></line>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
} 