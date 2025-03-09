'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrolledToTop = currentScrollPos < 50;
      
      setScrolledToTop(scrolledToTop);
      
      if (!scrolledToTop) {
        if (currentScrollPos > prevScrollPos && !scrolledToTop) {
          setScrollDirection('down');
        } else if (currentScrollPos < prevScrollPos) {
          setScrollDirection('up');
        }
      }
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  
  const navItems = [
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Work', path: '/#work' },
    { name: 'Contact', path: '/#contact' },
  ];
  
  const resumePath = '/resume';
  
  return (
    <header 
      className={`fixed top-0 z-10 w-full bg-black backdrop-blur transition-all duration-300 ${
        !scrolledToTop ? 'shadow-md backdrop-blur-sm h-[var(--nav-scroll-height)]' : 'h-[var(--nav-height)]'
      }`}
    >
      <nav className="container flex items-center justify-between h-full px-6 md:px-10 lg:px-12">
        {/* Logo */}
        <div className="logo">
          <Link 
            href="/" 
            className="flex items-center transition-all duration-300"
            aria-label="home"
          >
            <Image
              src="/images/blog/logo_2.png"
              alt="Logo"
              width={200}
              height={200}
              className="transition-all duration-300"
            />
          </Link>
        </div>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center">
          <ol className="nav-links flex items-center p-0 m-0 list-none">
            {navItems.map((item, i) => (
              <li key={i} className="ml-5">
                <Link 
                  href={item.path} 
                  className={`${
                    pathname === item.path ? 'text-[var(--green)]' : 'text-[var(--lightest-slate)]'
                  } hover:text-[var(--green)] transition-all duration-300 flex items-center`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ol>
          
          <div className="ml-5">
            <a 
              href="/api/resume" 
              className="button !px-4 !py-2 !mt-0"
              download="MyungGuk_Resume.pdf"
            >
              Resume
            </a>
          </div>
          
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <div className="mr-4">
            <ThemeToggle />
          </div>
          
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-[var(--lightest-slate)] hover:text-[var(--green)] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--green)]"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
} 