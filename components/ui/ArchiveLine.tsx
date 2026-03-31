import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const MotionDiv = motion.div as any;

interface ArchiveLineProps {
  index: string;
  label: string;
  className?: string;
}

export const ArchiveLine: React.FC<ArchiveLineProps> = ({ index, label, className = "" }) => {
  const ref = useRef(null);
  
  // Track scroll position of the line
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.6"]
  });

  // Scale the line width from 0 to 100% based on scroll
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div ref={ref} className={`w-full flex items-center gap-4 py-4 ${className}`}>
      <span className="text-micro text-petrol-base opacity-40">{index}</span>
      
      {/* Animated Line */}
      <div className="flex-1 h-[1px] bg-petrol-base/10 relative overflow-hidden">
          <MotionDiv 
            style={{ scaleX, opacity, transformOrigin: 'left center' }}
            className="absolute top-0 left-0 w-full h-full bg-petrol-base/40"
          />
      </div>
      
      <span className="text-micro text-petrol-base opacity-60">{label}</span>
    </div>
  );
};