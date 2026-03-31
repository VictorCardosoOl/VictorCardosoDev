
import React from 'react';
import { motion } from 'motion/react';

const MotionA = motion.a as any;
const MotionSpan = motion.span as any;

interface FlipLinkProps {
  children: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  isActive?: boolean;
}

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink: React.FC<FlipLinkProps> = ({ children, href, onClick, className, isActive }) => {
  return (
    <MotionA
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={onClick}
      className={`relative block overflow-hidden whitespace-nowrap uppercase ${className}`}
      style={{ lineHeight: 1 }}
    >
      {/* Primary Text (Visible initially) */}
      <div className="relative z-10">
        {children.split("").map((l, i) => (
          <MotionSpan
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l === " " ? "\u00A0" : l}
          </MotionSpan>
        ))}
      </div>
      
      {/* Secondary Text (Comes from bottom on hover) */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <MotionSpan
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block text-slate-900 font-bold"
          >
            {l === " " ? "\u00A0" : l}
          </MotionSpan>
        ))}
      </div>
    </MotionA>
  );
};
