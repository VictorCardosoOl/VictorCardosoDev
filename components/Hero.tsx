
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { usePageTransition } from './ui/PageTransition';

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  const physicsConfig = { damping: 20, stiffness: 60, mass: 1.0 };
  const smoothY = useSpring(scrollY, physicsConfig);
  
  // Parallax effects
  const bgY = useTransform(smoothY, [0, 1000], [0, 150]);
  const mainImgY = useTransform(smoothY, [0, 1000], [0, 50]);
  const leftTextY = useTransform(smoothY, [0, 1000], [0, -100]);
  const rightTextY = useTransform(smoothY, [0, 1000], [0, -50]);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  const accentColor = "#5A7D8A"; // Teal from template
  // Using an image with a light background to make mix-blend-multiply work well
  const portraitUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200";

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-white overflow-hidden flex items-center justify-center"
    >
      {/* Background Echo Image */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center opacity-10 blur-xl scale-110 pointer-events-none z-0"
      >
        <img 
          src={portraitUrl} 
          alt="Background Echo" 
          className="h-[90vh] w-auto object-cover grayscale"
        />
      </motion.div>

      {/* Left Title: LÓGICA (Solid, behind main image) */}
      <motion.div 
        style={{ y: leftTextY }}
        className="absolute left-[-2vw] md:left-8 lg:left-16 top-1/2 -translate-y-[60%] z-0"
      >
        <h1 className="text-[24vw] md:text-[16vw] font-sans font-black text-[#1a1a1a] leading-none uppercase tracking-tighter">
          Lógica
        </h1>
      </motion.div>

      {/* Main Central Image with Multiply Blend Mode */}
      <motion.div 
        style={{ y: mainImgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mix-blend-multiply"
      >
        <img 
          src={portraitUrl} 
          alt="Victor Cardoso" 
          className="h-[85vh] w-auto object-cover grayscale"
        />
      </motion.div>

      {/* Right Title: ESTÉTICA (Outline, in front of main image) */}
      <motion.div 
        style={{ y: rightTextY }}
        className="absolute right-[-2vw] md:right-8 lg:right-16 top-1/2 -translate-y-[40%] z-20"
      >
        <h1 
          className="text-[24vw] md:text-[16vw] font-sans font-black text-transparent leading-none uppercase tracking-tighter"
          style={{ WebkitTextStroke: '2px #1a1a1a' }}
        >
          Estétic<span style={{ color: accentColor, WebkitTextStroke: '0px' }}>a</span>
        </h1>
      </motion.div>

      {/* Bottom Left Content */}
      <div className="absolute bottom-8 md:bottom-16 left-6 md:left-12 lg:left-24 z-30 max-w-[220px] md:max-w-xs">
        <Reveal delay={200} variant="translate">
          <p className="text-[10px] md:text-sm text-[#1a1a1a] mb-4 md:mb-6 font-medium leading-relaxed">
            Arquitetura de software de alta precisão fundida com design editorial.
          </p>
        </Reveal>
        <Reveal delay={400} variant="translate">
          <a 
            href="#projects" 
            onClick={(e) => handleNav(e, '#projects')}
            className="inline-block bg-[#5A7D8A] text-white px-6 py-3 md:px-8 md:py-4 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#4A6D7A] transition-colors"
          >
            [ Ver Obras ]
          </a>
        </Reveal>
      </div>

      {/* Bottom Right Content */}
      <div className="absolute bottom-8 md:bottom-16 right-6 md:right-12 lg:right-24 z-30 max-w-[220px] md:max-w-xs flex items-start justify-end gap-4">
        <Reveal delay={300} variant="translate">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-6 md:w-8 h-[2px] bg-[#1a1a1a] mt-1.5 md:mt-2 shrink-0"></div>
            <p className="text-[10px] md:text-sm text-[#1a1a1a] font-medium text-left leading-relaxed">
              Transformando complexidade<br/>em interfaces silenciosas.
            </p>
          </div>
        </Reveal>
      </div>

    </section>
  );
};

export default Hero;
