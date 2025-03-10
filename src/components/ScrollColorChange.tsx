'use client';

import { useEffect, useState } from 'react';

// Debounce function to limit how often the scroll handler fires
const debounce = <T extends (...args: any[]) => void>(
  func: T, 
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Utility function to interpolate between two colors
const interpolateColor = (color1: string, color2: string, factor: number): string => {
  // Convert hex to RGB
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  // Parse the colors
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  // Interpolate each RGB component
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
};

// Function to get color at a specific scroll position
const getColorForScrollPosition = (scrollProgress: number): string => {
  // Define color stops - colors to transition between at different scroll positions
  const colorStops = [
    { position: 0, color: '#0a192f' },    // Navy (start - var(--navy))
    { position: 0.33, color: '#142952' },  // Deeper blue at 33% scroll
    { position: 0.66, color: '#1e3a75' },  // More vibrant blue at 66% scroll
    { position: 1, color: '#2c2c6c' }     // Purple-blue at full scroll
  ];

  // Find the two color stops to interpolate between
  let startStop = colorStops[0];
  let endStop = colorStops[colorStops.length - 1];

  for (let i = 0; i < colorStops.length - 1; i++) {
    if (scrollProgress >= colorStops[i].position && scrollProgress <= colorStops[i + 1].position) {
      startStop = colorStops[i];
      endStop = colorStops[i + 1];
      break;
    }
  }

  // Calculate how far between the two stops we are (0 to 1)
  const stopProgress = (scrollProgress - startStop.position) / (endStop.position - startStop.position);
  
  // Interpolate between the two colors
  return interpolateColor(startStop.color, endStop.color, stopProgress);
};

export default function ScrollColorChange() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bgColor, setBgColor] = useState('#0a192f'); // Initial color (navy)

  useEffect(() => {
    // Function to update the background color based on scroll position
    const updateColor = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      
      const newColor = getColorForScrollPosition(scrollProgress);
      setBgColor(newColor);
      
      // Update CSS variable or apply directly to body
      document.body.style.backgroundColor = newColor;
      
      // Update the CSS variable as well for components that reference it
      document.documentElement.style.setProperty('--background', newColor);
    };

    // Create a debounced version for better performance
    const debouncedUpdateColor = debounce(updateColor, 10);

    // Attach scroll event listener
    window.addEventListener('scroll', debouncedUpdateColor);
    
    // Handle resize events too, as they change the total scrollable height
    window.addEventListener('resize', debouncedUpdateColor);
    
    // Initial call to set the color
    updateColor();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', debouncedUpdateColor);
      window.removeEventListener('resize', debouncedUpdateColor);
    };
  }, []);

  return null; // This component doesn't render anything visible
} 