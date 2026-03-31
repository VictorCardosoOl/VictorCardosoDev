import React from 'react';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  // Using the local image uploaded by the user
  const portraitUrl = "/profile.jpg";

  return (
    <section id="hero" className="w-full h-[100dvh] flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Pane */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex flex-col justify-between p-6 md:p-12 lg:p-16">
        {/* Top Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[25vw] md:text-[13vw] font-serif font-light leading-[0.75] tracking-tighter text-[#000000]"
        >
          Portifólio
        </motion.h1>

        {/* Middle Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 flex justify-between items-start z-10"
        >
          <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-[#000000]/60">Victor Cardoso</p>
          <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-[#000000]/60 max-w-[180px] md:max-w-[220px] leading-relaxed text-right">
            Engenheiro de Software & Design
          </p>
        </motion.div>

        {/* Bottom Text */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[25vw] md:text-[13vw] font-serif font-light leading-[0.75] tracking-tighter text-[#000000] italic"
        >
          Estúdio
        </motion.h1>
      </div>

      {/* Right Pane */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={portraitUrl} 
          alt="Victor Cardoso" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
    </section>
  );
};

export default Hero;
