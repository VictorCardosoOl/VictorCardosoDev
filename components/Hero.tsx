import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  // Using the local image uploaded by the user
  const portraitUrl = "/perfil.jpg";

  return (
    <section id="hero" className="w-full h-[100dvh] flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Pane */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex flex-col justify-between p-6 md:p-12 lg:p-16">
        {/* Top Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[25vw] md:text-[13vw] font-bold leading-[0.75] tracking-tighter text-[#111]"
        >
          Work
        </motion.h1>

        {/* Middle Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 flex justify-between items-start"
        >
          <p className="text-[10px] md:text-xs font-semibold text-[#111] tracking-tight">Victor Cardoso</p>
          <p className="text-[10px] md:text-xs font-semibold text-[#111] max-w-[180px] md:max-w-[220px] leading-relaxed tracking-tight">
            Software Engineer working within the fields of frontend and architecture
          </p>
        </motion.div>

        {/* Bottom Text */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[25vw] md:text-[13vw] font-bold leading-[0.75] tracking-tighter text-[#111]"
        >
          Studio
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
