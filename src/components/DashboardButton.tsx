'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';

interface DashboardButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function DashboardButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  icon,
  fullWidth = false,
  disabled = false,
}: DashboardButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:border-blue-800';
      case 'secondary':
        return 'bg-amber-400 hover:bg-amber-500 text-gray-900 border-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600';
      case 'tertiary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700';
    }
  };
  
  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
    transition-all duration-200 transform border
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} 
    ${fullWidth ? 'w-full' : ''} 
    ${getVariantClasses()} 
    ${className}
    ${isPressed ? 'translate-y-[2px]' : ''}`;
  
  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    if (!disabled) setIsPressed(false);
  };
  
  const handleMouseLeave = () => {
    if (isPressed) setIsPressed(false);
  };
  
  const ButtonContent = () => (
    <>
      {/* Shadow element */}
      <span 
        className={`absolute inset-0 w-full h-full bg-black/10 rounded-lg -z-10 transition-all duration-200
        ${isPressed ? 'translate-y-0 rounded-lg' : 'translate-y-[3px] rounded-lg blur-[0.5px]'}`} 
        aria-hidden="true"
      />
      
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );
  
  if (href && !disabled) {
    return (
      <Link 
        href={href}
        className={baseClasses}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <ButtonContent />
      </Link>
    );
  }
  
  return (
    <button
      type="button"
      className={baseClasses}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <ButtonContent />
    </button>
  );
} 