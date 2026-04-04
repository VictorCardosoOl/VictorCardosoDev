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

export const FlipLink: React.FC<FlipLinkProps> = ({ children, href, onClick, className }) => {
  return (
    <MotionA
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={onClick}
      className={`relative inline-flex whitespace-nowrap uppercase ${className}`}
      style={{ lineHeight: 1 }}
    >
      {children.split("").map((l, i) => (
        <span key={i} className="relative inline-flex overflow-hidden">
          {/* Primary Text (Sobe no hover) */}
          <MotionSpan
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

          {/* Secondary Text (Vem de baixo no hover) */}
          <MotionSpan
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="absolute inset-0 inline-block font-bold"
          >
            {l === " " ? "\u00A0" : l}
          </MotionSpan>
        </span>
      ))}
    </MotionA>
  );
};
