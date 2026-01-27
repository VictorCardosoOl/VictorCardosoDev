
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';

const MotionImg = motion.img as any;
const MotionH1 = motion.h1 as any;

interface ProjectDetailContentProps {
  project: typeof PROJECTS[0];
  layoutId?: string;
}

// Variantes de animação para o slide da galeria
// Define como a imagem entra, permanece e sai da tela
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50, // Se direção for positiva, vem da direita. Negativa, da esquerda.
    opacity: 0,
    scale: 1.05,
    filter: "blur(4px)"
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)"
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50, // Sai para o lado oposto da entrada
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)"
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project, layoutId }) => {
  // page: índice absoluto (cresce indefinidamente)
  // direction: 1 para direita, -1 para esquerda
  const [[page, direction], setPage] = useState([0, 0]);

  // Garante que temos uma galeria válida
  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  
  // Índice cíclico seguro (garante que sempre retorne um índice válido do array)
  const imageIndex = ((page % galleryImages.length) + galleryImages.length) % galleryImages.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="bg-[#F2F4F6] min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <div className="w-full h-[60vh] md:h-[75vh] relative overflow-hidden bg-[#0B232E]">
        <MotionImg 
          layoutId={layoutId}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-80"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          style={{ willChange: "transform" }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B232E] via-[#0B232E]/20 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
            <Reveal>
                <MotionH1 
                    layoutId={`project-title-${project.title}`}
                    className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium text-[#F2F4F6] tracking-tighter leading-[0.9] mb-8"
                >
                  {project.title}
                </MotionH1>
            </Reveal>
            
            <Reveal delay={100}>
                <div className="flex flex-wrap items-center gap-6 text-[#F2F4F6]/80 border-t border-white/10 pt-6">
                   <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Ano</span>
                       <span className="font-mono text-sm">{project.year}</span>
                   </div>
                   <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Categoria</span>
                       <span className="font-mono text-sm">{project.category}</span>
                   </div>
                </div>
            </Reveal>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24 relative z-10 bg-[#F2F4F6]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-24">
            
            {/* 2. BARRA LATERAL (Sticky) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
               <div className="sticky top-24 space-y-12">
                   <div>
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0B232E]/40 mb-4 border-b border-[#0B232E]/10 pb-2">Tech Stack</span>
                      <div className="flex flex-col gap-3">
                        {project.tags.map((tag, i) => (
                           <div key={i} className="flex items-center gap-2 text-sm text-[#0B232E] font-medium">
                              <span className="w-1.5 h-1.5 bg-[#78909C] rounded-full"></span> {tag}
                           </div>
                        ))}
                      </div>
                   </div>

                   <div>
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0B232E]/40 mb-4 border-b border-[#0B232E]/10 pb-2">Deploy</span>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#0B232E] hover:text-[#78909C] transition-colors group"
                      >
                        Acessar Projeto <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                   </div>
               </div>
            </div>

            {/* 3. CONTEÚDO PRINCIPAL */}
            <div className="lg:col-span-9 order-1 lg:order-2">
               
               <div className="mb-24">
                  <Reveal width="100%">
                    <p className="text-xl md:text-3xl lg:text-4xl font-serif font-light text-[#0B232E] leading-[1.4] indent-12 md:indent-24">
                      {project.description} Como desenvolvedor responsável, foquei em criar uma arquitetura limpa e manutenível. O objetivo principal foi garantir performance sem sacrificar a fidelidade visual do design.
                    </p>
                  </Reveal>
               </div>

               {/* Estudo de Caso */}
               {project.caseStudy && (
                 <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-32 border-t border-[#0B232E]/10 pt-16">
                       <Reveal>
                          <span className="text-xs font-mono text-[#78909C] mb-4 block uppercase tracking-widest">01 / O Desafio</span>
                          <h3 className="text-2xl font-serif font-medium text-[#0B232E] mb-6">{project.caseStudy.challenge}</h3>
                       </Reveal>
                       
                       <Reveal delay={100}>
                          <span className="text-xs font-mono text-[#78909C] mb-4 block uppercase tracking-widest">02 / A Solução (Code)</span>
                          <h3 className="text-2xl font-serif font-medium text-[#0B232E] mb-6">{project.caseStudy.solution}</h3>
                       </Reveal>
                    </div>

                    <Reveal width="100%">
                        <div className="bg-[#0B232E] text-white p-8 md:p-16 rounded-sm relative overflow-hidden mb-32 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#153A48] to-[#0B232E] opacity-50"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">Impacto Técnico</span>
                                    <h4 className="text-6xl md:text-9xl font-serif font-medium tracking-tighter leading-[0.8] mb-4">
                                        {project.caseStudy.result.split(' ').find(w => w.includes('%') || w.match(/\d/)) || "100%"}
                                    </h4>
                                    <p className="text-lg text-white/70 font-light max-w-sm">{project.caseStudy.result}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                 </>
               )}

               {/* GALERIA INTERATIVA - APRIMORADA */}
               <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-[#0B232E]/10 pb-4">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B232E]/40">Interface & Código</span>
                     <span className="text-[10px] font-mono text-[#0B232E]/40">{imageIndex + 1} / {galleryImages.length}</span>
                  </div>

                  {/* Main Viewer with Directional Slide */}
                  <div className="relative aspect-video bg-[#0B232E]/5 overflow-hidden rounded-sm group shadow-inner">
                      <AnimatePresence initial={false} custom={direction}>
                          <MotionImg
                             key={page}
                             src={galleryImages[imageIndex]}
                             custom={direction}
                             variants={slideVariants}
                             initial="enter"
                             animate="center"
                             exit="exit"
                             transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.4 }
                             }}
                             drag="x"
                             dragConstraints={{ left: 0, right: 0 }}
                             dragElastic={1}
                             onDragEnd={(e: any, { offset, velocity }: any) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                  paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                  paginate(-1);
                                }
                             }}
                             alt={`Gallery image ${imageIndex + 1}`}
                             className="absolute w-full h-full object-cover"
                          />
                      </AnimatePresence>
                      
                      {/* Nav Buttons (Hidden on mobile usually, distinct on desktop) */}
                      <button 
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-[#0B232E]/80 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-[#0B232E] hover:scale-110 z-10"
                      >
                         <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#0B232E]/80 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-[#0B232E] hover:scale-110 z-10"
                      >
                         <ChevronRight size={20} />
                      </button>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                      {galleryImages.map((img, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
                            className={`
                                relative aspect-square cursor-pointer overflow-hidden rounded-sm transition-all duration-300
                                ${imageIndex === idx ? 'ring-2 ring-[#0B232E] ring-offset-2 opacity-100 scale-105 shadow-md' : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'}
                            `}
                          >
                             <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                          </div>
                      ))}
                  </div>
               </div>

            </div>
        </div>

        <div className="mt-32 pt-12 border-t border-[#0B232E]/10 flex justify-end">
            <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#0B232E] hover:text-[#78909C] transition-colors group">
                Próximo Projeto <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>
    </div>
  );
};
