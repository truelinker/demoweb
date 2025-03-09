'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardCard from '@/components/DashboardCard';
import DashboardButton from '@/components/DashboardButton';
import DashboardToggle from '@/components/DashboardToggle';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [controlValue, setControlValue] = useState(50);
  const [isRotated, setIsRotated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const fadeClass = (delay: number) => 
    isMounted 
      ? `opacity-100 translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[${delay}ms]` 
      : 'opacity-0 translate-y-[20px]';
  
  // Simulate rotation of the knob
  const handleRotation = () => {
    setIsRotated(!isRotated);
  };
  
  return (
    <div className="container px-0 sm:px-12">
      {/* Hero Section */}
      <section 
        id="hero"
        className="flex flex-col items-start justify-center min-h-screen"
      >
        <div>
          <h1 className={`font-mono text-[var(--green)] mb-5 ${fadeClass(100)}`}>
            Hi, my name is
          </h1>
          
          <h2 className={`big-heading text-[var(--lightest-slate)] ${fadeClass(200)}`}>
            Myungguk Lee.
          </h2>
          
          <h3 className={`big-heading text-[var(--slate)] ${fadeClass(300)}`}>
            I bring hardware to life with code.
          </h3>
          
          <p className={`max-w-xl mt-5 text-[var(--slate)] ${fadeClass(400)}`}>
            I am a Firmware Engineer at <a href="https://greenwaveradios.com" className="inline-link" target="_blank" rel="noopener noreferrer">GreenWave Radios</a>, where I currently develop firmware for 5G Radio Unit (RU) SoC. With over a decade of experience in embedded systems development, I've designed and implemented firmware solutions for a diverse range of products across multiple industries. My expertise spans microcontroller programming, real-time operating systems, hardware-software integration, and low-level device drivers. I'm passionate about creating efficient, reliable embedded systems that solve complex technical challenges while meeting stringent performance requirements. Throughout my career, I've consistently delivered innovative firmware solutions that balance technical excellence with practical implementation.
          </p>
          
          <div className={fadeClass(500)}>
            <a href="#work" className="button mt-12">
              Check out my work!
            </a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="section">
        <h2 className="numbered-heading">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12">
          <div>
            <p className="mb-4">
              Hello! I'm Myungguk, a firmware engineer specializing in embedded systems design and development. 
              My passion for electronic systems began over 15 years ago when I built my first microcontroller 
              project — turns out programming that simple LED display sparked my lifelong fascination with the 
              intersection of hardware and software.
            </p>
            
            <p className="mb-4">
              Throughout my career, I've had the privilege of working at 
              <a href="#" className="inline-link mx-1">a telecommunications company</a>,
              <a href="#" className="inline-link mx-1">a semiconductor startup</a>,
              <a href="#" className="inline-link mx-1">a major electronics manufacturer</a>, and
              <a href="#" className="inline-link mx-1">a wireless infrastructure provider</a>.
              Currently at GreenWave Radios, I'm focused on developing high-performance firmware for 5G Radio 
              Unit (RU) SoCs, optimizing both functionality and energy efficiency.
            </p>
            
            <p className="mb-4">
              Here are a few technologies I've been working with recently:
            </p>
            
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 max-w-[500px] font-mono text-[var(--slate)] text-[var(--fz-sm)] mt-5">
              <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                C/C++
              </li>
              <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                Embedded Linux
              </li>
              <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                ARM Architecture
              </li>
              <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                RTOS
              </li>
              <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                Digital Signal Processing
              </li>
              <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                RF Systems
              </li>
            </ul>
          </div>
          
          <div className="relative max-w-[300px] mx-auto md:mx-0">
            <div className="relative block w-full h-0 pb-[100%] rounded-[var(--border-radius)] bg-[var(--green)] transition-all">
              <div className="absolute w-full h-full rounded-[var(--border-radius)] -translate-x-5 -translate-y-5 transition-all border-2 border-[var(--green)] group-hover:-translate-x-3 group-hover:-translate-y-3">
                <div className="relative w-full h-full rounded-[var(--border-radius)] overflow-hidden">
                  {/* 
                    Image file is now located at /public/images/blog/myunglogo.png
                    In Next.js, files in the public directory are accessed without the 'public' part,
                    so we reference it as /images/blog/myunglogo.png
                    
                    If you need to move the image again, just update the src path below.
                  */}
                  <Image
                    src="/images/blog/myunglogo.png"
                    alt="Myung Guk Lee logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover rounded-[var(--border-radius)] transition-all"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="section">
        <h2 className="numbered-heading">Where I've Worked</h2>
        
        <div className="grid md:grid-cols-[auto_1fr] gap-6">
          <div className="flex md:flex-col overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden">
            <button className="min-w-[120px] p-3 border-b-2 md:border-b-0 md:border-l-2 border-[var(--lightest-navy)] hover:bg-[var(--light-navy)] text-left text-[var(--lightest-slate)]">
              <span className="text-[var(--fz-sm)]">Company One</span>
            </button>
            <button className="min-w-[120px] p-3 border-b-2 md:border-b-0 md:border-l-2 border-[var(--green)] bg-[var(--light-navy)] text-left text-[var(--green)]">
              <span className="text-[var(--fz-sm)]">Company Two</span>
            </button>
            <button className="min-w-[120px] p-3 border-b-2 md:border-b-0 md:border-l-2 border-[var(--lightest-navy)] hover:bg-[var(--light-navy)] text-left text-[var(--lightest-slate)]">
              <span className="text-[var(--fz-sm)]">Company Three</span>
            </button>
          </div>
          
          <div className="min-h-[340px]">
            <h3 className="text-[var(--lightest-slate)] text-[var(--fz-xxl)] font-medium mb-1">
              Senior Frontend Engineer <span className="text-[var(--green)]">@ Company Two</span>
            </h3>
            
            <p className="mb-6 text-[var(--light-slate)] text-[var(--fz-sm)]">
              January 2021 - Present
            </p>
            
            <ul className="space-y-4">
              <li className="relative pl-8 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                Developed and maintained major features for client projects using React, Next.js, and Node.js
              </li>
              <li className="relative pl-8 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                Collaborated with designers, project managers, and other engineers to build high-quality user interfaces
              </li>
              <li className="relative pl-8 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                Implemented responsive designs and improved site performance through optimization techniques
              </li>
              <li className="relative pl-8 before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)]">
                Managed team of junior developers and provided technical leadership on projects
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Work Section */}
      <section id="work" className="section">
        <h2 className="numbered-heading">Some Things I've Built</h2>
        
        {/* Featured Project 1 */}
        <div className="relative grid grid-cols-12 gap-2 items-center mb-24">
          <div className="project-image col-span-12 md:col-span-7 md:col-start-6">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="bg-[var(--green)] rounded-[var(--border-radius)] h-full w-full">
                {/* This would be an actual image in production */}
                <div className="aspect-video rounded-[var(--border-radius)] bg-gradient-to-br from-[var(--light-navy)] to-[var(--navy)]" />
              </div>
            </a>
          </div>
          
          <div className="project-content col-span-12 md:col-span-7 md:col-start-1 md:row-start-1 z-[5] text-right md:text-left md:text-right">
            <p className="font-mono text-[var(--green)] text-[var(--fz-sm)] mb-2">DPD project</p>
            <h3 className="text-[var(--lightest-slate)] text-[var(--fz-xxl)] mb-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--green)] transition-all">
                Project Title
              </a>
            </h3>
            
            <div className="p-6 bg-[var(--light-navy)] rounded-[var(--border-radius)] shadow-md mb-6 text-[var(--light-slate)]">
              <p>
                A feature-rich Spotify client that allows users to authenticate and view personalized 
                data like top artists, top tracks, and detailed audio analysis. Built with NextJS and 
                the Spotify Web API.
              </p>
            </div>
            
            <ul className="project-tech-list flex justify-end md:justify-start md:justify-end font-mono">
              <li>Next.js</li>
              <li>Spotify API</li>
              <li>Tailwind CSS</li>
              <li>Vercel</li>
            </ul>
            
            <div className="project-links flex justify-end md:justify-start md:justify-end">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <title>GitHub</title>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <title>External Link</title>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Featured Project 2 */}
        <div className="relative grid grid-cols-12 gap-2 items-center mb-24">
          <div className="project-image col-span-12 md:col-span-7 md:col-start-1">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="bg-[var(--green)] rounded-[var(--border-radius)] h-full w-full">
                {/* This would be an actual image in production */}
                <div className="aspect-video rounded-[var(--border-radius)] bg-gradient-to-br from-[var(--light-navy)] to-[var(--navy)]" />
              </div>
            </a>
          </div>
          
          <div className="project-content col-span-12 md:col-span-7 md:col-start-6 md:row-start-1 z-[5]">
            <p className="font-mono text-[var(--green)] text-[var(--fz-sm)] mb-2">Featured Project</p>
            <h3 className="text-[var(--lightest-slate)] text-[var(--fz-xxl)] mb-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--green)] transition-all">
                Second Project
              </a>
            </h3>
            
            <div className="p-6 bg-[var(--light-navy)] rounded-[var(--border-radius)] shadow-md mb-6 text-[var(--light-slate)]">
              <p>
                A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available 
                on various platforms including VS Code Marketplace, Package Control, Atom Package Manager, 
                and npm.
              </p>
            </div>
            
            <ul className="project-tech-list font-mono">
              <li>VS Code</li>
              <li>Sublime Text</li>
              <li>Atom</li>
              <li>iTerm2</li>
            </ul>
            
            <div className="project-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <title>GitHub</title>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <title>External Link</title>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Other Projects */}
        <h3 className="text-center font-mono text-[var(--lightest-slate)] text-[var(--fz-xxl)] mb-10">
          Other Noteworthy Projects
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Project Card 1 */}
          <div className="bg-[var(--light-navy)] rounded-[var(--border-radius)] p-8 flex flex-col justify-between h-full hover:-translate-y-2 transition-all">
            <header>
              <div className="flex justify-between items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[var(--green)]">
                  <title>Folder</title>
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                
                <div className="flex gap-3">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--lightest-slate)] hover:text-[var(--green)] transition-all">
                      <title>GitHub</title>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--lightest-slate)] hover:text-[var(--green)] transition-all">
                      <title>External Link</title>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
              
              <h3 className="text-[var(--lightest-slate)] text-[var(--fz-xl)] mb-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--green)] transition-all">
                  Time to Have More Fun
                </a>
              </h3>
              
              <p className="text-[var(--light-slate)] mb-8">
                A single page web app for helping me choose where to travel, built with Next.js, Mapbox, 
                and Tailwind CSS. It pulls data from an API for travel recommendations.
              </p>
            </header>
            
            <footer>
              <ul className="flex flex-wrap mt-auto text-[var(--light-slate)] font-mono text-[var(--fz-xxs)]">
                <li className="mr-4">Next.js</li>
                <li className="mr-4">Tailwind CSS</li>
                <li className="mr-4">Mapbox</li>
              </ul>
            </footer>
          </div>
          
          {/* Project Card 2 */}
          <div className="bg-[var(--light-navy)] rounded-[var(--border-radius)] p-8 flex flex-col justify-between h-full hover:-translate-y-2 transition-all">
            <header>
              <div className="flex justify-between items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[var(--green)]">
                  <title>Folder</title>
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                
                <div className="flex gap-3">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--lightest-slate)] hover:text-[var(--green)] transition-all">
                      <title>GitHub</title>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <h3 className="text-[var(--lightest-slate)] text-[var(--fz-xl)] mb-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--green)] transition-all">
                  Build a Spotify Connected App
                </a>
              </h3>
              
              <p className="text-[var(--light-slate)] mb-8">
                A web app for visualizing personalized Spotify data. View your top artists, top tracks, 
                recently played tracks, and detailed audio information about each track.
              </p>
            </header>
            
            <footer>
              <ul className="flex flex-wrap mt-auto text-[var(--light-slate)] font-mono text-[var(--fz-xxs)]">
                <li className="mr-4">React</li>
                <li className="mr-4">Express</li>
                <li className="mr-4">Spotify API</li>
                <li className="mr-4">Styled Components</li>
              </ul>
            </footer>
          </div>
          
          {/* Project Card 3 */}
          <div className="bg-[var(--light-navy)] rounded-[var(--border-radius)] p-8 flex flex-col justify-between h-full hover:-translate-y-2 transition-all">
            <header>
              <div className="flex justify-between items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[var(--green)]">
                  <title>Folder</title>
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                
                <div className="flex gap-3">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--lightest-slate)] hover:text-[var(--green)] transition-all">
                      <title>GitHub</title>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--lightest-slate)] hover:text-[var(--green)] transition-all">
                      <title>External Link</title>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
              
              <h3 className="text-[var(--lightest-slate)] text-[var(--fz-xl)] mb-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--green)] transition-all">
                  Markdown Previewer
                </a>
              </h3>
              
              <p className="text-[var(--light-slate)] mb-8">
                A minimal markdown previewer built with React that allows you to write and preview 
                markdown in real-time. Supports common markdown syntax and custom extensions.
              </p>
            </header>
            
            <footer>
              <ul className="flex flex-wrap mt-auto text-[var(--light-slate)] font-mono text-[var(--fz-xxs)]">
                <li className="mr-4">React</li>
                <li className="mr-4">Markdown</li>
                <li className="mr-4">CSS Modules</li>
              </ul>
            </footer>
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <a href="#" target="_blank" rel="noopener noreferrer" className="button">
            View More Projects
          </a>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section text-center">
        <h2 className="numbered-heading justify-center">What's Next?</h2>
        <h2 className="text-[var(--lightest-slate)] text-[var(--fz-heading)] mt-5">Get In Touch</h2>
        
        <p className="max-w-[600px] mx-auto mt-4 mb-12 text-[var(--slate)]">
          Although I'm not currently looking for new opportunities, my inbox is always open. 
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <a href="mailto:truelinker@gmail.com" className="button">
          Say Hello
        </a>
      </section>
      
      <footer className="py-6 text-center text-[var(--light-slate)] font-mono text-[var(--fz-xs)]">
        <div className="mt-5">
          <a 
            href="https://github.com/bchiang7/v4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[var(--green)] transition-all"
          >
            Designed & Built by Brittany Chiang
          </a>
        </div>
        <div className="mt-2">
          <span>Adapted by Myungguk Lee</span>
        </div>
      </footer>
    </div>
  );
}
