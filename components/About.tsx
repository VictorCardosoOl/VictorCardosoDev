
import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import ContentModal from './ui/ContentModal';
import { ResumeContent } from './ResumeContent';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="about" className="min-h-screen bg-white py-24 md:py-32 flex flex-col justify-center relative z-10">
      <div className="container mx-auto px-8 md:px-16 xl:px-32 max-w-7xl">
        
        {/* Top Section: Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 md:mb-32">
          {/* Left empty space to push text to the right */}
          <div className="hidden md:block md:col-span-6 lg:col-span-7"></div>
          
          {/* Right text block */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#111] leading-[1.05] tracking-tighter mb-8 uppercase">
                EU SOU VICTOR<br/>
                CARDOSO, E EU<br/>
                <span className="text-[#999]">CONSTRUO</span><br/>
                SISTEMAS.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm md:text-base text-[#333] font-serif leading-relaxed max-w-sm">
                Especialista em Engenharia de Software.<br/>
                Transformo problemas complexos em<br/>
                soluções escaláveis e arte em código.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bottom Section: Images */}
        <div className="relative">
          {/* The black dot from the template */}
          <div className="absolute -left-6 md:-left-10 top-[25%] w-2 h-2 bg-black rounded-full hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {/* Image 1: Industrial/Abstract */}
            <Reveal delay={200}>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" 
                  alt="Industrial"
                  className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </Reveal>

            {/* Image 2: Profile Photo + CV Interaction */}
            <Reveal delay={300}>
              <div 
                className="aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer group relative"
                onClick={() => setIsResumeOpen(true)}
              >
                <motion.img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                  alt="Victor Cardoso"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
                />
                {/* Hover overlay for CV */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-mono text-xs tracking-widest uppercase border border-white px-6 py-3 backdrop-blur-sm">
                    Ver Currículo
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Image 3: Nature/Minimal */}
            <Reveal delay={400}>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
                  alt="Nature"
                  className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </Reveal>
          </div>
        </div>

      </div>
      
      {/* MODAL CV */}
      <ContentModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)}
        title="Currículo Profissional"
        category="Sobre"
      >
         <ResumeContent />
      </ContentModal>

    </section>
  );
};

export default About;
