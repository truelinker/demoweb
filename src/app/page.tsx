'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { companyDetails, companyOrder, type CompanyKey } from '@/data/careerData';

// Define type for project details
type ProjectDetail = {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl?: string;
  githubLink?: string;
  externalLink: string;
  featured?: boolean;
  type?: 'career' | 'portfolio';
  companyKey?: CompanyKey;
};

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, setTheme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [controlValue, setControlValue] = useState(50);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRotated, setIsRotated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeCompany, setActiveCompany] = useState<CompanyKey>('westernDigital');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Featured projects data
  const featuredProjects = useMemo<ProjectDetail[]>(() => [
    {
      title: "Optimizing DPD Algorithm with ARM NEON SIMD",
      description: "A deep dive into optimizing Digital Predistortion algorithm using ARM Cortex-A's NEON SIMD capabilities. This project focuses on accelerating DSP performance through NEON register optimization techniques.",
      category: "DSP",
      technologies: ["ARM", "NEON SIMD", "Performance Optimization", "DSP"],
      externalLink: "/career/optimizing-dpd-algorithm-with-arm-neon-simd",
      featured: true,
      type: "career",
      companyKey: "greenWaveRadio"
    },
    {
      title: "Flash FileSystem",
      description: "Implemented a File System on QSPI NOR flash. Using Azure RTOS (ThreadX) FileX/LevelX APIs to develop FAT16/32 file systems on flash memory.",
      category: "Storage",
      technologies: ["Azure RTOS", "ThreadX", "FileX/LevelX", "QSPI Flash"],
      externalLink: "/career/flash-filesystem",
      featured: true,
      type: "career",
      companyKey: "greenWaveRadio"
    },
    {
      title: "Secure Drive",
      description: "Storage drive (HDD, SSD) with security protocols such as TCG, Sanitize, ATA Security, and security features such as Secure Boot enabled.",
      category: "Security",
      technologies: ["TCG", "Sanitize", "ATA Security", "Secure Boot"],
      externalLink: "/career/secure-drive",
      featured: true,
      type: "career",
      companyKey: "westernDigital"
    },
    {
      title: "Shingled Magnetic Recording (SMR)",
      description: "Development of SMR HDD firmware that only uses sequential read and write. Participated in drive-managed SMR HDD development, focusing on validation and bug fixing.",
      category: "Storage",
      technologies: ["HDD Firmware", "SMR", "Sequential I/O", "Indirection Mapping"],
      externalLink: "/career/smr",
      featured: true,
      type: "career",
      companyKey: "westernDigital"
    },
    {
      title: "PCIe AHCI Device Driver Development",
      description: "Deep dive into PCIe AHCI Device Driver development for Hybrid HDD systems, focusing on performance optimization and hardware integration.",
      category: "Driver",
      technologies: ["PCIe", "AHCI", "Device Drivers", "Storage Systems"],
      externalLink: "/career/pcie-ahci-device-driver-development",
      featured: true,
      type: "career",
      companyKey: "westernDigital"
    },
    {
      title: "Half-Duplex SIO Communication",
      description: "Adding half-duplex SIO communication along with the existing full-duplex protocol. Developed firmware to work with testers that use different serial communication methods, including collision handling.",
      category: "Communication",
      technologies: ["Serial Communication", "Half-Duplex", "Protocol Design", "Error Handling"],
      externalLink: "/career/serial-communication",
      featured: true,
      type: "career",
      companyKey: "westernDigital"
    },
    {
      title: "Flash Writer Implementation",
      description: "Deep dive into the implementation of a Flash Writer program for embedded systems, focusing on secure boot sequence and memory management for multi-core boot systems.",
      category: "Firmware",
      technologies: ["Bootloader", "Flash Memory", "Secure Boot", "Multi-core Systems"],
      externalLink: "/career/flash-writer-implementation-for-embedded-systems",
      featured: true,
      type: "career",
      companyKey: "greenWaveRadio"
    },
    {
      title: "UART Daisy Chain Architecture",
      description: "Architecture and implementation of a UART-based daisy chain communication system for multi-core H64 SoC with SLIP framing, DMA transfers, and zero-copy forwarding on ThreadX RTOS.",
      category: "Communication",
      technologies: ["UART", "SLIP Protocol", "ThreadX", "DMA"],
      externalLink: "/career/uart-daisy-chain",
      featured: true,
      type: "career",
      companyKey: "greenWaveRadio"
    },
    {
      title: "CAST SPI Device Driver",
      description: "SPI device drivers for CAST SPI-to-AHB bridge and 25LC020 EEPROM with predictable/unpredictable timing modes for FPGA register access on embedded SoC.",
      category: "Driver",
      technologies: ["SPI", "Device Driver", "CAST", "EEPROM"],
      externalLink: "/career/cast-spi-device-driver",
      featured: true,
      type: "career",
      companyKey: "greenWaveRadio"
    },
    // Add portfolio projects
    {
      title: "Word Memorization App",
      description: "Android app to help users memorize new English words using spaced repetition and visual learning techniques. Designed for GRE and TOEFL preparation.",
      category: "Mobile",
      technologies: ["Android", "Java", "SQLite", "UX Design"],
      externalLink: "/portfolio/word-memorization-app",
      githubLink: "https://github.com/truelinker/vocaMaster",
      featured: true,
      type: "portfolio"
    },
    {
      title: "Log Parser",
      description: "Command-line tool for parsing and analyzing log files. Features include pattern matching, statistical analysis, and customizable reporting.",
      category: "Tools",
      technologies: ["Python", "RegEx", "Data Analysis", "CLI"],
      externalLink: "/portfolio/log-parser",
      featured: true,
      type: "portfolio"
    },
    {
      title: "WebRTC Communications",
      description: "Real-time communication application using WebRTC for video and audio calls. Includes features such as screen sharing and text chat.",
      category: "Web",
      technologies: ["WebRTC", "JavaScript", "Node.js", "WebSockets"],
      externalLink: "/portfolio/web-rtc",
      featured: true,
      type: "portfolio"
    }
  ], []);

  // Extract unique categories
  const projectCategories = useMemo(() => {
    return Array.from(new Set(featuredProjects.map(project => project.category)));
  }, [featuredProjects]);

  // Filter projects by selected category
  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return featuredProjects;
    return featuredProjects.filter(project => project.category === selectedCategory);
  }, [featuredProjects, selectedCategory]);

  // Get color for category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'DSP': return 'from-purple-500 to-purple-700';
      case 'Storage': return 'from-blue-500 to-blue-700';
      case 'Security': return 'from-red-500 to-red-700';
      case 'Driver': return 'from-green-500 to-green-700';
      case 'Communication': return 'from-yellow-500 to-yellow-700';
      case 'Embedded': return 'from-orange-500 to-orange-700';
      default: return 'from-teal-500 to-teal-700';
    }
  };

  // Get bg class for category buttons
  const getCategoryButtonClass = (category: string) => {
    const isActive = selectedCategory === category;
    
    switch(category) {
      case 'DSP': 
        return isActive 
          ? 'bg-purple-600 text-white' 
          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Storage': 
        return isActive 
          ? 'bg-blue-600 text-white' 
          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Security': 
        return isActive 
          ? 'bg-red-600 text-white' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Driver': 
        return isActive 
          ? 'bg-green-600 text-white' 
          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Communication': 
        return isActive 
          ? 'bg-yellow-600 text-white' 
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Embedded': 
        return isActive 
          ? 'bg-orange-600 text-white' 
          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: 
        return isActive 
          ? 'bg-teal-600 text-white' 
          : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
    }
  };

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'DSP':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'Storage':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'Security':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'Driver':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'Communication':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'Embedded':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        );
    }
  };

  // Derive projects for the active company
  const companyProjects = useMemo(() => {
    return featuredProjects.filter(p => p.companyKey === activeCompany);
  }, [featuredProjects, activeCompany]);

  // Animation fade-in classes
  const fadeClass = (delay: number) => {
    if (!isMounted) return 'opacity-0 translate-y-5';
    return `opacity-100 translate-y-0 transition-all duration-500 delay-${delay}`;
  };
  
  // Mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle project filter
  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(current => current === category ? null : category);
  }, []);

  return (
    <div className="container mx-auto bg-[var(--navy)] text-[var(--slate)] leading-normal font-sans antialiased w-full min-h-screen pt-[var(--nav-height)]">
      {/* Hero Section */}
      <section 
        id="hero"
        className="flex flex-col items-start justify-center min-h-[calc(100vh-var(--nav-height))]"
      >
        <div>
          <h1 className={`font-mono text-[var(--green)] mb-5 ${fadeClass(100)}`}>
            Hi, my name is
          </h1>
          
          <h2 className={`big-heading text-[var(--lightest-slate)] ${fadeClass(200)}`}>
             Myung Guk Lee.
          </h2>
          
          <h3 className={`big-heading text-[var(--slate)] ${fadeClass(300)}`}>
            I bring hardware to life with code.
          </h3>
          
          <p className={`max-w-xl mt-5 text-[var(--slate)] ${fadeClass(400)}`}>
            I am a Senior Firmware Engineer with over 15 years of experience, currently developing advanced 5G Radio Unit firmware at <a href="https://greenwaveradios.com" className="inline-link" target="_blank" rel="noopener noreferrer">GreenWave Radios</a>. I specialize in embedded systems architecture, real-time operating systems, and hardware-software integration for mission-critical applications.
          </p>
          
          <div className={fadeClass(500)}>
            <a href="#work" className="button mt-12">
              Check out my work!
            </a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="section py-20">
        <h2 className="section-heading">
          <span className="number">01.</span> About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12">
          <div>
            <div className="space-y-4 text-[var(--slate)]">
              <p>
                Hello! I&apos;m Myung Guk,a firmware engineer passionate about building efficient, reliable embedded systems. My journey in embedded development began at Dasan Networks, where I developed software for networking devices.
              </p>
              
              <p>
              Over the past 15+ years, I&apos;ve worked across various domains from networking equipment to storage devices and wireless communication systems. This diverse experience has given me a comprehensive understanding of embedded systems architecture, real-time constraints, and hardware-software interfaces.
              </p>
              
              <p>
              My approach combines deep technical expertise with practical implementation. I enjoy solving complex problems that bridge the gap between hardware capabilities and software requirements.
              </p>
              
              <p>
                Here are some technologies I&apos;ve been working with recently:
              </p>
            </div>
            
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 mt-5">
              <li className="font-mono text-xs text-[var(--slate)] flex items-center before:content-['▹'] before:text-[var(--green)] before:mr-2">ARM Cortex-M/A/R</li>
              <li className="font-mono text-xs text-[var(--slate)] flex items-center before:content-['▹'] before:text-[var(--green)] before:mr-2">RTOS (ThreadX, FreeRTOS)</li>
              <li className="font-mono text-xs text-[var(--slate)] flex items-center before:content-['▹'] before:text-[var(--green)] before:mr-2">Embedded C/C++</li>
              <li className="font-mono text-xs text-[var(--slate)] flex items-center before:content-['▹'] before:text-[var(--green)] before:mr-2">Device Drivers</li>
              <li className="font-mono text-xs text-[var(--slate)] flex items-center before:content-['▹'] before:text-[var(--green)] before:mr-2">NEON SIMD</li>
              <li className="font-mono text-xs text-[var(--slate)] flex items-center before:content-['▹'] before:text-[var(--green)] before:mr-2">Tool Development using Python</li>
            </ul>
          </div>
          
          <div className="relative max-w-[300px] mx-auto md:mx-0">
            <div className="relative z-10 overflow-hidden rounded-md bg-[var(--green)] w-full h-full">
              <Image 
                src="/images/blog/myunglogo.png" 
                alt=" Myung Guk Lee"
                width={300}
                height={300}
                className="mix-blend-multiply filter grayscale contrast-100 brightness-90 hover:filter-none transition-all duration-300"
              />
              <div className="absolute inset-0 bg-[var(--green)] opacity-20 hover:opacity-0 transition-opacity duration-300"></div>
            </div>
            <div className="absolute -z-10 top-5 left-5 w-full h-full border-2 border-[var(--green)] rounded-md transition-all group-hover:translate-x-4 group-hover:translate-y-4"></div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="section py-20">
        <h2 className="section-heading">
          <span className="number">02.</span> Where I&apos;ve Worked
        </h2>

        <div className="grid md:grid-cols-[200px_1fr] gap-6">
          {/* Left column: Vertical timeline (desktop) / Horizontal tabs (mobile) */}
          <div className="relative">
            {/* Vertical line (desktop only) */}
            <div className="hidden md:block absolute left-[7px] top-0 bottom-0 w-[2px] bg-[var(--lightest-navy)]" />

            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-2 md:pb-0">
              {companyOrder.slice().reverse().map((key) => {
                const detail = companyDetails[key];
                const isActive = activeCompany === key;
                return (
                  <button
                    key={key}
                    className={`flex items-center gap-3 px-3 py-3 text-sm font-mono text-left transition-all whitespace-nowrap rounded-r-md
                      md:border-b-0 border-b-2 md:border-b-0
                      ${isActive
                        ? 'text-[var(--green)] bg-[var(--light-navy)] border-[var(--green)]'
                        : 'text-[var(--slate)] border-[var(--lightest-navy)] hover:text-[var(--green)] hover:bg-[var(--light-navy)]'
                      }`}
                    onClick={() => setActiveCompany(key)}
                  >
                    {/* Timeline dot (desktop only) */}
                    <span className={`hidden md:block flex-shrink-0 w-3 h-3 rounded-full border-2 transition-all
                      ${isActive
                        ? 'bg-[var(--green)] border-[var(--green)] timeline-dot-active'
                        : 'bg-transparent border-[var(--slate)]'
                      }`}
                    />
                    <span className="flex flex-col">
                      <span>{detail.companyShort}</span>
                      <span className="text-[10px] text-[var(--light-slate)]">
                        {detail.yearStart}–{detail.yearEnd ?? 'Now'}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right column: Detail panel */}
          <div className="min-h-[420px]">
            <h3 className="text-xl text-[var(--lightest-slate)] mb-1">
              <span>{companyDetails[activeCompany].title}</span>
              <span className="text-[var(--green)]"> @ {companyDetails[activeCompany].company}</span>
            </h3>
            <p className="font-mono text-xs text-[var(--light-slate)] mb-4">
              {companyDetails[activeCompany].period}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {companyDetails[activeCompany].techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--green-tint)] text-[var(--green)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Duties */}
            <ul className="space-y-3 mb-6">
              {companyDetails[activeCompany].duties.map((duty, i) => (
                <li key={i} className="text-[var(--slate)] flex items-start">
                  <span className="text-[var(--green)] mr-2 translate-y-1">▹</span>
                  <span>{duty}</span>
                </li>
              ))}
            </ul>

            {/* Key Achievements */}
            {companyDetails[activeCompany].achievements.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-mono text-[var(--green)] mb-3 uppercase tracking-wider">Key Achievements</h4>
                <ul className="space-y-2">
                  {companyDetails[activeCompany].achievements.map((achievement, i) => (
                    <li key={i} className="text-[var(--light-slate)] flex items-start text-sm">
                      <span className="text-[var(--green)] mr-2 mt-0.5">★</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Projects */}
            {companyProjects.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-mono text-[var(--green)] mb-3 uppercase tracking-wider">Related Projects</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companyProjects.map((project) => (
                    <Link
                      key={project.title}
                      href={project.externalLink}
                      className="block p-3 rounded-md bg-[var(--light-navy)] border border-[var(--lightest-navy)] hover:border-[var(--green)] transition-all no-underline group"
                    >
                      <span className="text-sm text-[var(--lightest-slate)] group-hover:text-[var(--green)] transition-colors block mb-1">
                        {project.title}
                      </span>
                      <span className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] font-mono text-[var(--slate)] bg-[var(--lightest-navy)] px-1.5 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Link to full career page */}
            <Link
              href="/career"
              className="inline-flex items-center gap-1 font-mono text-sm text-[var(--green)] hover:underline"
            >
              View full career timeline
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Work Section - Featured Projects */}
      <section id="work" className="section py-20">
        <h2 className="section-heading">
          <span className="number">03.</span> Some Things I&apos;ve Built
        </h2>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === null 
                ? 'bg-[var(--green)] text-[var(--navy)]' 
                : 'bg-[var(--light-navy)] text-[var(--light-slate)] hover:bg-[var(--lightest-navy)]'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All Projects
          </button>
          
          {projectCategories.map(category => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors ${getCategoryButtonClass(category)}`}
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.title}
              className="animate-fadeIn"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0
              }}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div 
                className={`group h-full overflow-hidden rounded-lg border border-[var(--lightest-navy)] bg-[var(--light-navy)] shadow-md transition-all duration-300 ${
                  hoveredProject === project.title ? 'transform -translate-y-2 shadow-xl' : ''
                } cursor-pointer hover:border-[var(--green)]`}
                onClick={() => window.open(project.externalLink, '_blank', 'noopener,noreferrer')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(project.externalLink, '_blank', 'noopener,noreferrer');
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${project.title} project`}
              >
                {/* Card Header */}
                <div className={`
                  relative overflow-hidden h-48 ${project.imageUrl ? '' : 'bg-gradient-to-r ' + getCategoryColor(project.category)}
                `}>
                  {project.imageUrl ? (
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      {getCategoryIcon(project.category)}
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-[var(--navy)] opacity-70 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="inline-flex items-center rounded-full bg-[var(--navy)] px-2.5 py-0.5 text-xs font-medium text-[var(--green)]">
                        {project.category}
                      </span>
                      
                      <div className="flex space-x-2">
                        {project.githubLink && (
                          <a 
                            href={project.githubLink} 
                            className="text-[var(--lightest-slate)] hover:text-[var(--green)]"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} on GitHub`}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </a>
                        )}
                        
                        <a 
                          href={project.externalLink}
                          className="text-[var(--lightest-slate)] hover:text-[var(--green)]"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title} project`}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    <span className="text-xl font-semibold text-[var(--lightest-slate)] group-hover:text-[var(--green)] transition-colors">
                      {project.title}
                    </span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                  <p className="text-[var(--slate)] text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="text-xs font-mono px-2 py-1 rounded-full bg-[var(--lightest-navy)] text-[var(--light-slate)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section py-20 text-center">
        <h2 className="section-heading justify-center">
          <span className="number">05.</span> What&apos;s Next?
        </h2>
        
        <h3 className="text-4xl text-[var(--lightest-slate)] mt-10 mb-4">Get In Touch</h3>
        
        <p className="text-[var(--slate)] max-w-lg mx-auto mb-12">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out if you&apos;d like to connect!
        </p>
        
        <a href="mailto:truelinker@gmail.com" className="button">
          Say Hello
        </a>
      </section>
      
      {/* Footer */}
      <footer className="py-6 text-center text-[var(--light-slate)] text-sm font-mono">
        <div>Designed & Built by Myung Guk Lee</div>
        <div className="mt-2">© {new Date().getFullYear()} All Rights Reserved</div>
      </footer>
    </div>
  );
}