import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCESS_STEPS } from '../constants';
import { Reveal } from './ui/Reveal';

const Process: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="process" className="py-24 md:py-32 bg-[#F3F2EE] text-[#000000] relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        {/* Esquerda: Lista de Opções */}
        <div className="lg:col-span-5 relative z-10 w-full max-w-2xl">
          <Reveal>
             {PROCESS_STEPS.map((step, index) => {
               const isActive = activeIndex === index;
               return (
                 <div
                   key={step.id}
                   onMouseEnter={() => setActiveIndex(index)}
                   onClick={() => setActiveIndex(index)}
                   className={`group border-b border-[#000000]/10 py-6 md:py-10 cursor-pointer transition-colors duration-500`}
                 >
                   <div className="flex justify-between items-baseline mb-2">
                     <h3 
                        className={`text-3xl md:text-5xl font-serif font-light transition-all duration-500 ${isActive ? 'text-[#000000] translate-x-3 italic' : 'text-[#000000]/30 hover:text-[#000000]/50'}`}
                     >
                       {step.title}
                     </h3>
                     <span className={`text-[10px] font-mono tracking-widest transition-all duration-500 ${isActive ? 'text-[#000000]' : 'text-[#000000]/30'}`}>
                       {step.id}
                     </span>
                   </div>
                   
                   {/* Subtitle that only shows for the active step resembling the screenshot */}
                   <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#000000]/40 uppercase mt-4 mb-2 max-w-sm pl-4 relative before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#000000]">
                            {step.subtitle}
                          </p>
                        </motion.div>
                      )}
                   </AnimatePresence>
                 </div>
               );
             })}
          </Reveal>
        </div>

        {/* Espaço Negativo (Gap) */}
        <div className="hidden lg:block lg:col-span-2"></div>

        {/* Direita: Descrição Expansiva e Dinâmica */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-40 min-h-[400px]">
           <Reveal delay={200}>
              <div className="relative">
                 {/* Titulo fixo */}
                 <h4 className="font-serif italic text-3xl md:text-4xl text-[#000000] mb-8">
                   Detalhes da Etapa
                 </h4>
                 
                 <div className="relative">
                    {/* Big background fading number */}
                    <AnimatePresence mode="wait">
                       <motion.div
                          key={`bg-${activeIndex}`}
                          initial={{ opacity: 0, scale: 0.8, x: -20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 1.1, x: 20 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="absolute -top-16 -left-12 text-[15rem] md:text-[20rem] font-serif italic text-[#000000]/5 pointer-events-none select-none leading-none tracking-tighter"
                       >
                          {PROCESS_STEPS[activeIndex].id}
                       </motion.div>
                    </AnimatePresence>
                    
                    {/* Main Description text */}
                    <AnimatePresence mode="wait">
                       <motion.div
                         key={`desc-${activeIndex}`}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -20 }}
                         transition={{ duration: 0.4 }}
                         className="relative z-10 text-base md:text-lg text-[#000000]/70 leading-relaxed max-w-lg mt-8 md:mt-16 font-sans"
                       >
                         {PROCESS_STEPS[activeIndex].description}
                       </motion.div>
                    </AnimatePresence>
                 </div>
              </div>
           </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Process;
