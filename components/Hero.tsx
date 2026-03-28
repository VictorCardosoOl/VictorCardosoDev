import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePageTransition } from './ui/PageTransition';

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  const physicsConfig = { damping: 20, stiffness: 60, mass: 1.0 };
  const smoothY = useSpring(scrollY, physicsConfig);
  
  // Parallax effects
  const mainImgY = useTransform(smoothY, [0, 1000], [0, 60]);
  const textY = useTransform(smoothY, [0, 1000], [0, -40]);

  // Using an image with a light background to make mix-blend-multiply work well
  const portraitUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200";

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#EAE8E3] overflow-hidden flex items-center justify-center"
    >
      {/* Subtle Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-multiply z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* Crisp, Elegant Typography Behind Image */}
      <motion.div 
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none w-full"
      >
        <div className="flex flex-col items-start">
          <h1 className="text-[18vw] font-sans font-medium text-[#1a1a1a] leading-[0.8] tracking-[-0.04em] uppercase">
            Victor
          </h1>
          <h1 className="text-[18vw] font-sans font-medium text-[#1a1a1a] leading-[0.8] tracking-[-0.04em] uppercase ml-[12vw]">
            Cardoso
          </h1>
        </div>
      </motion.div>

      {/* Main Central Image with Multiply Blend Mode */}
      <motion.div 
        style={{ y: mainImgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mix-blend-multiply"
      >
        <img 
          src={portraitUrl} 
          alt="Victor Cardoso" 
          className="h-[65vh] md:h-[75vh] w-auto object-cover grayscale contrast-125 opacity-90"
        />
      </motion.div>

      {/* Top Header / Nav items (Optional, adds to the editorial feel) */}
      <div className="absolute top-8 left-6 right-6 md:left-12 md:right-12 z-30 flex justify-between items-start">
        <span className="text-[10px] font-mono font-medium tracking-[0.2em] text-[#1a1a1a] uppercase">Portfolio '26</span>
        <span className="text-[10px] font-mono font-medium tracking-[0.2em] text-[#1a1a1a] uppercase">Available for work</span>
      </div>

      {/* Bottom Labels */}
      <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-30 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#1a1a1a] uppercase opacity-50">Role</span>
          <span className="text-[11px] font-mono font-medium tracking-[0.1em] text-[#1a1a1a] uppercase">Software Engineer</span>
        </div>
        <div className="flex flex-col gap-1 items-end md:items-start hidden md:flex">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#1a1a1a] uppercase opacity-50">Focus</span>
          <span className="text-[11px] font-mono font-medium tracking-[0.1em] text-[#1a1a1a] uppercase">Frontend Arch</span>
        </div>
        <div className="flex flex-col gap-1 items-end hidden sm:flex">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#1a1a1a] uppercase opacity-50">Design</span>
          <span className="text-[11px] font-mono font-medium tracking-[0.1em] text-[#1a1a1a] uppercase">UI/UX & Motion</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#1a1a1a] uppercase opacity-50">Location</span>
          <span className="text-[11px] font-mono font-medium tracking-[0.1em] text-[#1a1a1a] uppercase">Global</span>
        </div>
      </div>

    </section>
  );
};

export default Hero;
