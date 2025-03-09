'use client';

import { useEffect, useState } from 'react';

export default function EmailSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="fixed bottom-0 right-5 left-auto z-10 hidden lg:block xl:right-10">
      <div className={`flex flex-col items-center gap-7 after:content-[''] after:block after:w-px after:h-[90px] after:mx-auto after:my-0 after:bg-[var(--light-slate)] ${isMounted ? 'opacity-100' : 'opacity-0'} transition-all duration-300 delay-[1700ms]`}>
        <a
          href="mailto:truelinker@gmail.com"
          className="mx-auto my-5 p-2.5 font-mono text-[var(--light-slate)] text-xs tracking-widest writing-mode-vertical hover:text-[var(--green)] focus:text-[var(--green)] transition-all duration-300 hover:-translate-y-1"
        >
          truelinker@gmail.com
        </a>
      </div>
    </div>
  );
} 