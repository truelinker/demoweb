'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    // Check for clickable elements
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])')
        .forEach(el => {
          el.addEventListener('mouseenter', () => setLinkHovered(true));
          el.addEventListener('mouseleave', () => setLinkHovered(false));
        });
    };

    addEventListeners();
    handleLinkHoverEvents();
    
    return () => {
      removeEventListeners();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Main cursor */}
      <div
        className={`absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
          clicked ? 'scale-90' : 'scale-100'
        } ${
          linkHovered ? 'w-9 h-9 bg-blue-500/30 border border-blue-400' : 'w-6 h-6'
        }`}
        style={{
          background: linkHovered ? '' : 'rgba(39, 121, 167, 0.2)',
          border: linkHovered ? '' : '1.5px solid #2779a7',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Dot cursor */}
      <div
        className={`absolute w-2 h-2 rounded-full bg-blue-400 transform -translate-x-1/2 -translate-y-1/2 ${
          clicked ? 'scale-75' : 'scale-100'
        }`}
      />
    </div>
  );
} 