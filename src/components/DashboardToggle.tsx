'use client';

import { useState } from 'react';

interface DashboardToggleProps {
  label?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export default function DashboardToggle({
  label,
  defaultChecked = false,
  onChange,
  className = '',
  disabled = false,
}: DashboardToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleChange = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    setChecked(newChecked);
    
    if (onChange) {
      onChange(newChecked);
    }
  };
  
  return (
    <div 
      className={`inline-flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`
          relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 
          transition-colors duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-blue-600 border-blue-600' : 'bg-gray-200 border-gray-200'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        disabled={disabled}
        onClick={handleChange}
      >
        <span className="sr-only">Toggle</span>
        <span
          className={`
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg 
            transition duration-300 ease-in-out
            ${checked ? 'translate-x-7' : 'translate-x-0'}
            ${isHovered && !disabled ? 'scale-110' : 'scale-100'}
          `}
        >
          {/* Center dot in the toggle */}
          <span
            className={`
              absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full 
              transition-colors duration-300
              ${checked ? 'bg-blue-600' : 'bg-gray-400'}
            `}
          />
        </span>
      </button>
      {label && (
        <span 
          className={`ml-3 text-sm font-medium ${disabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}
          onClick={!disabled ? handleChange : undefined}
        >
          {label}
        </span>
      )}
    </div>
  );
} 