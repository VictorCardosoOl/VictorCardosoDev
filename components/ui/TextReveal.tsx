
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number; // in ms
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Split text into words
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay / 1000 }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    },
    hidden: {
      opacity: 0,
      y: 40, // Start lower for the reveal up effect
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    }
  };

  return (
    <MotionDiv
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`${className} pb-2`} // Added pb-2 to prevent clipping of descenders
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em] -mb-2 pb-2">
          <MotionSpan variants={child} className="inline-block">
            {word}
          </MotionSpan>
        </span>
      ))}
    </MotionDiv>
  );
};
