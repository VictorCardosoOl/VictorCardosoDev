
import React, { useState, useRef } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0], 
  index: number,
  onClick: () => void
}> = ({ project, index, onClick }) => {
  
  const containerRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });
  
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(15% 10% 15% 10% round 4px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  // Parallax reduced on mobile for better performance
  const yParallax = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-30%", "30%"]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.5, 0]);

  return (
    <div 
      ref={containerRef}
      className="group w-full cursor-pointer relative py-12 md:py-24 border-t border-petrol-base/10 first:border-t-0"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Coluna Metadados */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between items-baseline lg:sticky lg:top-32 transition-all duration-500 z-20">
             <div className="flex items-baseline gap-4">
                 <span className="text-sm font-mono text-petrol-base/40 group-hover:text-petrol-electric transition-colors">
                     ( {project.year} )
                 </span>
                 <span className="text-sm font-mono uppercase tracking-widest text-petrol-base/60">
                     {project.category}
                 </span>
             </div>
             
             <div className="hidden lg:block mt-8 overflow-hidden">
                <span className="text-[6rem] xl:text-[8rem] leading-[0.8] font-serif text-petrol-base/5 group-hover:text-petrol-base/10 transition-colors duration-700">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
             </div>
          </div>

          {/* Coluna Imagem & Conteúdo */}
          <div className="lg:col-span-9">
              {/* IMAGE WRAPPER */}
              <motion.div 
                 style={{ clipPath: isMobile ? undefined : clipPath }}
                 className="relative aspect-[16/9] md:aspect-[21/9] bg-petrol-base/5 mb-8 md:mb-10 group-hover:shadow-2xl transition-shadow duration-700 overflow-hidden rounded-md md:rounded-none"
              >
                 <motion.div className="w-full h-full relative overflow-hidden">
                     {/* IMAGE WITH PARALLAX */}
                     <motion.img 
                        src={project.image} 
                        alt={project.title}
                        style={{ 
                            scale: 1.35, 
                            y: yParallax 
                        }} 
                        className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
                     />
                     
                     <motion.div 
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-[#000000] pointer-events-none"
                     />
                 </motion.div>
                 
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none mix-blend-overlay" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-20">
                    <ArrowUpRight className="text-white" size={32} />
                 </div>
              </motion.div>

              {/* Text Info */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="max-w-2xl">
                      <Reveal>
                        <motion.h3 
                            className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-petrol-base mb-4 leading-tight group-hover:text-petrol-mid transition-colors"
                        >
                            {project.title}
                        </motion.h3>
                      </Reveal>
                      <Reveal delay={100}>
                        <p className="text-petrol-ink/70 font-light leading-relaxed text-base md:text-lg max-w-lg">
                            {project.description}
                        </p>
                      </Reveal>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:justify-end">
                      {project.tags.slice(0, 3).map((tag, i) => (
                          <Reveal key={i} delay={200 + (i * 50)}>
                            <span className="px-3 py-1 border border-petrol-base/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-petrol-base/60 bg-white">
                                {tag}
                            </span>
                          </Reveal>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  const handleOpen = (project: typeof PROJECTS[0]) => {
    setActiveProject(project);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative bg-paper py-24 md:py-32 z-10 overflow-hidden">
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-6 md:left-24 xl:left-32 w-px h-full bg-petrol-base/[0.03] z-0 pointer-events-none" />
      <div className="absolute top-0 right-6 md:right-12 w-px h-full bg-petrol-base/[0.03] z-0 pointer-events-none hidden md:block" />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        <div className="flex flex-col items-start mb-16 md:mb-24 pl-0 md:pl-16 lg:pl-24">
           <Reveal>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-petrol-base/40 mb-4 block">
                 Arquivo Selecionado
              </span>
              {/* FLUID TYPE for Title */}
              <h2 className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] font-serif font-light text-petrol-base tracking-tighter mix-blend-darken">
                 Obras <br/>
                 <span className="italic text-petrol-base/20 ml-8 md:ml-32">Recentes</span>
              </h2>
           </Reveal>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
             <ProjectCard 
                key={index}
                project={project} 
                index={index} 
                onClick={() => handleOpen(project)}
             />
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
            <Reveal variant="scale">
                <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 border border-petrol-base/10 hover:bg-petrol-base hover:text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group">
                    Iniciar um projeto <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </Reveal>
        </div>

      </div>

      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={handleClose}
        title={activeProject?.title}
        category={activeProject?.category}
      >
        {activeProject && (
            <ProjectDetailContent 
                project={activeProject} 
            />
        )}
      </ContentModal>
    </section>
  );
};

export default Projects;
