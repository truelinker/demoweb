'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  href?: string;
  className?: string;
  interactive?: boolean;
}

export default function DashboardCard({
  title,
  icon,
  children,
  href,
  className = '',
  interactive = true,
}: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const CardContent = () => (
    <div 
      className={`relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 
        ${interactive ? 'hover:shadow-lg hover:-translate-y-1 group cursor-pointer' : ''} 
        ${isHovered && interactive ? 'shadow-lg -translate-y-1' : 'shadow-md'} 
        ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      
      <div className="relative">
        {children}
      </div>
      
      {interactive && (
        <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
} 