/**
 * @file FloatingBlob.tsx
 * @description This component renders a set of decorative, floating blobs that move and react to the user's scroll position.
 * It is used to add a dynamic and visually interesting background effect to the application.
 */

import { useEffect, useState } from 'react';

/**
 * @component FloatingBlob
 * @description A component that creates a floating blob effect in the background.
 * The blobs' positions and transformations are updated based on the window's scroll position.
 */
const FloatingBlob = () => {
  // State to store the current vertical scroll position of the window.
  const [scrollY, setScrollY] = useState(0);

  // Effect to add and remove a scroll event listener.
  useEffect(() => {
    // Function to update the scrollY state when the user scrolls.
    const handleScroll = () => setScrollY(window.scrollY);
    
    // Add the scroll event listener when the component mounts.
    window.addEventListener('scroll', handleScroll);
    
    // Remove the scroll event listener when the component unmounts to prevent memory leaks.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // The container for the blobs. It is fixed to the viewport and does not interact with mouse events.
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Main floating blob */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl animate-blob"
        style={{
          background: 'hsl(88, 65%, 42%)',
          // The blob's position is dynamically calculated based on the scroll position.
          top: `${20 + scrollY * 0.1}%`,
          right: `${10 + Math.sin(scrollY * 0.01) * 5}%`,
          transform: `translateY(${Math.sin(scrollY * 0.005) * 50}px)`,
        }}
      />
      
      {/* Secondary smaller blob */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-2xl animate-float"
        style={{
          background: 'hsl(88, 65%, 42%)',
          top: `${60 + scrollY * 0.05}%`,
          left: `${5 + Math.cos(scrollY * 0.008) * 3}%`,
          transform: `translateY(${Math.cos(scrollY * 0.003) * 30}px)`,
          animationDelay: '2s',
        }}
      />
      
      {/* Tertiary micro blob */}
      <div
        className="absolute w-32 h-32 rounded-full opacity-25 blur-xl animate-blob"
        style={{
          background: 'hsl(88, 65%, 42%)',
          top: `${40 + scrollY * 0.08}%`,
          left: `${80 + Math.sin(scrollY * 0.012) * 4}%`,
          transform: `translateY(${Math.sin(scrollY * 0.007) * 40}px)`,
          animationDelay: '4s',
        }}
      />
    </div>
  );
};

export default FloatingBlob;
