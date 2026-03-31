
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const MotionDiv = motion.div as any;

const Cursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover'>('default');
  
  // Mouse position logic
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setVariant('hover');
    const handleMouseLeave = () => setVariant('default');

    window.addEventListener('mousemove', moveCursor);
    
    // Logic to detect clickable elements dynamically
    const addListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, .cursor-hover, [role="button"]');
      clickables.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return clickables;
    };

    const clickables = addListeners();

    // Re-run listener attachment on DOM mutations (for client-side routing/dynamic content)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <MotionDiv 
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ 
        x, 
        y, 
        translateX: '-50%', 
        translateY: '-50%',
      }}
    >
        {/* Main Cursor Circle */}
        <MotionDiv 
            className="bg-white rounded-full"
            animate={{
                width: variant === 'hover' ? 64 : 16,
                height: variant === 'hover' ? 64 : 16,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        {/* Text inside cursor (optional, visible only on hover if desired, currently plain circle as per reference style) */}
    </MotionDiv>
  );
};

export default Cursor;
