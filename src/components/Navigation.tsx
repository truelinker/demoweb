'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
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
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when a link is clicked and handle smooth scrolling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Only handle hash links specially
    if (path.startsWith('/#')) {
      e.preventDefault();
      
      // Close the menu first
      setIsMobileMenuOpen(false);
      
      // Get the ID from the hash
      const id = path.substring(2);
      
      // After a short delay to allow menu close animation, scroll to the element
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      // For non-hash links, just close the menu
      setIsMobileMenuOpen(false);
    }
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const navItems = [
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Work', path: '/#work' },
    { name: 'Contact', path: '/#contact' },
  ];
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resumePath = '/resume';
  
  return (
    <header 
      className={`fixed top-0 z-10 w-full bg-[var(--navy)] transition-all duration-300 ${
        !scrolledToTop ? 'shadow-md h-[var(--nav-scroll-height)]' : 'h-[var(--nav-height)]'
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
        
        {/* Desktop Nav Links */}
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
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
            {isMobileMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden fixed top-[var(--nav-height)] right-0 bottom-0 w-3/4 bg-[var(--light-navy)] shadow-xl transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex flex-col h-full p-5">
          <nav className="mt-8">
            <ol className="space-y-6">
              {navItems.map((item, i) => (
                <li key={i} className="font-mono text-lg">
                  <Link 
                    href={item.path} 
                    className={`${
                      pathname === item.path ? 'text-[var(--green)]' : 'text-[var(--lightest-slate)]'
                    } hover:text-[var(--green)] transition-all duration-300 flex items-center`}
                    onClick={(e) => handleLinkClick(e, item.path)}
                  >
                    <span className="text-[var(--green)] mr-2">{`0${i + 1}.`}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          
          <div className="mt-10">
            <a 
              href="/api/resume" 
              className="button !px-4 !py-2 w-full text-center !mt-0"
              download="MyungGuk_Resume.pdf"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
      
      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-70 z-10"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
} 