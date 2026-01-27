
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';
import { Globe, ArrowDown, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  // --- PHYSICS & PARALLAX ---
  const physicsConfig = { damping: 20, stiffness: 60, mass: 1.0 };
  const smoothY = useSpring(scrollY, physicsConfig);
  
  const textY = useTransform(smoothY, [0, 1000], [0, -120]); 
  const imageY = useTransform(smoothY, [0, 1000], [0, -250]);
  const opacity = useTransform(smoothY, [0, 400], [1, 0]);

  const scrollVelocity = useVelocity(scrollY);
  const rawSkew = useTransform(scrollVelocity, [-2000, 2000], [-3, 3]); 
  const skewVelocity = useSpring(rawSkew, { stiffness: 100, damping: 30, mass: 1 });

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  // Curva Bezier "Cinematic" (Awwwards Standard)
  const cinematicEase = [0.76, 0, 0.24, 1];

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="min-h-screen relative bg-paper text-petrol-base pt-32 pb-12 flex flex-col justify-end md:justify-center overflow-hidden"
    >
      
      {/* Grid Lines */}
      <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-petrol-base/[0.03] z-0" />
      <div className="absolute top-0 right-12 w-px h-full bg-petrol-base/[0.03] z-0 hidden md:block" />

      <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10 h-full flex flex-col justify-center">
        
        {/* Meta Header */}
        <div className="absolute top-32 left-6 md:left-24 right-6 md:right-12 flex justify-between items-start pointer-events-none z-20">
           <Reveal width="100%">
             <div className="flex flex-col gap-1 pl-4 md:pl-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-petrol-base/40">Victor Cardoso</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-petrol-base">Engenharia de Software</span>
             </div>
           </Reveal>
           
           <Reveal width="100%" delay={100}>
             <div className="flex flex-col gap-1 text-right">
                <div className="flex items-center justify-end gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-petrol-base/40">
                   <Globe size={10} className="text-petrol-electric" /> SP, BR
                </div>
             </div>
           </Reveal>
        </div>

        {/* ASYMMETRIC COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative mt-20 md:mt-0">
            
            {/* TEXT MASS */}
            <div className="lg:col-span-8 flex flex-col justify-center relative z-20 pl-2 md:pl-24">
                <motion.div style={{ y: textY }} className="relative">
                   
                   {/* Main Title Block - Masked Reveal */}
                   <div className="relative mb-16 md:mb-24">
                       
                       {/* Linha 1: MASKED */}
                       <div className="overflow-hidden py-2">
                           <motion.h1 
                             initial={{ y: "110%" }} // Começa totalmente escondido em baixo
                             animate={{ y: "0%" }}   // Sobe para a posição original
                             transition={{ duration: 1.4, ease: cinematicEase }}
                             style={{ skewX: skewVelocity, transformOrigin: "bottom left" }}
                             className="text-[16vw] md:text-[9rem] lg:text-[11rem] leading-[0.75] font-serif font-light text-petrol-base tracking-tighter mix-blend-darken block"
                           >
                             Lógica
                           </motion.h1>
                       </div>
                       
                       {/* Linha 2: MASKED & INDENTED */}
                       <div className="flex flex-col items-start ml-[15%] md:ml-[25%] mt-2 md:mt-4">
                          <div className="overflow-hidden py-2">
                            <motion.h1 
                                initial={{ y: "110%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 1.4, delay: 0.15, ease: cinematicEase }}
                                style={{ skewX: skewVelocity, transformOrigin: "bottom left" }}
                                className="text-[16vw] md:text-[9rem] lg:text-[11rem] leading-[0.75] font-serif font-light text-petrol-base tracking-tighter italic opacity-80 block"
                            >
                                Estética
                            </motion.h1>
                          </div>
                          
                          <Reveal delay={400} variant="blur">
                             <span className="text-xs font-mono text-petrol-base/30 mt-4 self-end mr-4 hidden md:block max-w-[150px] text-right">
                                (01) Interseção entre Código e Design
                             </span>
                          </Reveal>
                       </div>
                   </div>

                   {/* Description */}
                   <div className="max-w-md flex flex-col gap-8 ml-2 md:ml-0">
                      <Reveal delay={500} variant="translate">
                        <p className="text-sm md:text-base font-light text-petrol-ink leading-[1.6] border-l border-petrol-base/20 pl-6">
                           Arquitetura de software de alta precisão fundida com design editorial. 
                           Transformando complexidade em interfaces silenciosas.
                        </p>
                      </Reveal>

                      <Reveal delay={600} variant="scale">
                         <div className="flex items-center gap-6">
                            <Magnetic strength={0.3}>
                                <a href="#projects" onClick={(e) => handleNav(e, '#projects')}>
                                  <motion.div
                                    animate={{ 
                                      scale: [1, 1.03, 1],
                                      boxShadow: [
                                        "0px 0px 0px rgba(11,35,46,0)",
                                        "0px 4px 20px rgba(11,35,46,0.15)",
                                        "0px 0px 0px rgba(11,35,46,0)"
                                      ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                  >
                                    <Button 
                                      variant="outline" 
                                      className="rounded-full px-8 py-3 border-petrol-base text-petrol-base hover:bg-petrol-base hover:text-white transition-colors duration-300 group text-[10px]"
                                    >
                                      <span className="tracking-[0.25em] group-hover:tracking-[0.35em] transition-all font-bold">
                                        VER OBRAS
                                      </span>
                                    </Button>
                                  </motion.div>
                                </a>
                             </Magnetic>
                         </div>
                      </Reveal>
                   </div>

                </motion.div>
            </div>

            {/* IMAGE ANCHOR */}
            <div className="lg:col-span-4 relative flex flex-col justify-end items-end z-10 mt-12 lg:mt-0">
               <motion.div 
                  style={{ y: imageY }}
                  className="relative w-full max-w-[280px] md:max-w-[320px] mr-0 md:mr-12"
               >
                  <Reveal width="100%" className="w-full" delay={200} variant="scale">
                      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] border border-petrol-base/5 shadow-2xl bg-slate-200 group">
                          <motion.img 
                            initial={{ scale: 1.4, filter: "grayscale(100%) blur(5px)" }}
                            animate={{ scale: 1, filter: "grayscale(0%) blur(0px)" }}
                            transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600&h=800" 
                            alt="Victor Cardoso Portrait" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-3 border border-white/20 rounded-[1.5rem] pointer-events-none mix-blend-overlay"></div>
                      </div>
                      
                      {/* Caption */}
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col items-end pointer-events-none mix-blend-difference">
                         <div className="rotate-[-90deg] origin-center translate-y-8">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-white/60">
                               Perfil Doc.
                            </span>
                         </div>
                      </div>
                      
                      {/* Spinner */}
                      <div className="absolute -bottom-6 -right-6 z-20">
                         <div className="bg-petrol-base text-white w-20 h-20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                            <svg viewBox="0 0 100 100" width="80" height="80">
                              <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent"/>
                              <text>
                                <textPath href="#curve" className="text-[10px] font-mono uppercase tracking-widest fill-current">
                                  Engenharia • Design • Produto •
                                </textPath>
                              </text>
                            </svg>
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center text-white">
                             <ArrowRight size={14} className="-rotate-45" />
                         </div>
                      </div>

                  </Reveal>
               </motion.div>
            </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-8 md:left-24 flex items-center gap-4 text-petrol-base/30 z-20"
      >
         <div className="h-px w-12 bg-petrol-base/20"></div>
         <span className="text-[9px] uppercase tracking-widest font-mono">Role</span>
         <ArrowDown size={12} className="animate-bounce" />
      </motion.div>

    </section>
  );
};

export default Hero;
