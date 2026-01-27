
import React, { useState, useRef } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Componente ProjectCard
 * Responsável por renderizar um item da lista com efeitos visuais avançados.
 */
const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0], 
  index: number,
  onClick: () => void
}> = ({ project, index, onClick }) => {
  
  const containerRef = useRef(null);
  
  // Rastreia o progresso de scroll deste card específico.
  // offset ["start 0.9", "start 0.2"] significa:
  // Começa a animar quando o topo do card atinge 90% da altura da viewport.
  // Termina quando o topo atinge 20% da altura da viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"]
  });

  // Suaviza o valor bruto do scroll para uma animação "física"
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });
  
  // 1. Mask Reveal (Efeito de Recorte)
  // Cria uma máscara que "abre" a imagem conforme o scroll desce.
  // inset(TOP RIGHT BOTTOM LEFT round RADIUS)
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(15% 10% 15% 10% round 4px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  // 2. Scale Effect (Container)
  // O container da imagem cresce levemente
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  
  // 3. Parallax Profundo e Agressivo
  // Move a imagem DENTRO do container em velocidade diferente do scroll.
  // yParallax vai de -40% a 40%. Para isso funcionar sem criar espaços brancos,
  // a imagem precisa ser maior que o container (scale 1.35 aplicada abaixo).
  const yParallax = useTransform(smoothProgress, [0, 1], ["-40%", "40%"]);
  
  // 4. Overlay Opacity
  // Escurece a imagem no início para foco dramático
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.5, 0]);

  return (
    <div 
      ref={containerRef}
      className="group w-full cursor-pointer relative py-12 md:py-24 border-t border-petrol-base/10 first:border-t-0"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Coluna Metadados - Sticky para acompanhar o scroll */}
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
                <span className="text-[8rem] leading-[0.8] font-serif text-petrol-base/5 group-hover:text-petrol-base/10 transition-colors duration-700">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
             </div>
          </div>

          {/* Coluna Imagem & Conteúdo */}
          <div className="lg:col-span-9">
              {/* IMAGE WRAPPER com Clip Path dinâmico */}
              <motion.div 
                 style={{ clipPath }}
                 className="relative aspect-[16/9] md:aspect-[21/9] bg-petrol-base/5 mb-10 group-hover:shadow-2xl transition-shadow duration-700 overflow-hidden"
              >
                 <motion.div className="w-full h-full relative overflow-hidden">
                     {/* IMAGE WITH DEEP PARALLAX */}
                     <motion.img 
                        layoutId={`project-image-${project.title}`}
                        src={project.image} 
                        alt={project.title}
                        style={{ 
                            // Scale precisa ser 1.35 ou mais para cobrir o movimento de +/- 40% sem mostrar fundo
                            scale: 1.35, 
                            y: yParallax 
                        }} 
                        className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
                     />
                     
                     {/* Overlay Layer */}
                     <motion.div 
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-[#0B232E] pointer-events-none"
                     />
                 </motion.div>
                 
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none mix-blend-overlay" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-20">
                    <ArrowUpRight className="text-white" size={32} />
                 </div>
              </motion.div>

              {/* Text Info */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="max-w-2xl">
                      <Reveal>
                        <motion.h3 
                            layoutId={`project-title-${project.title}`}
                            className="text-4xl md:text-6xl font-serif font-medium text-petrol-base mb-4 leading-tight group-hover:text-petrol-mid transition-colors"
                        >
                            {project.title}
                        </motion.h3>
                      </Reveal>
                      <Reveal delay={100}>
                        <p className="text-petrol-ink/70 font-light leading-relaxed text-lg max-w-lg">
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

  return (
    <section id="projects" className="relative bg-paper py-32 md:py-48 z-10 overflow-hidden">
      
      {/* Linhas de grade decorativas */}
      <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-petrol-base/[0.03] z-0 pointer-events-none" />
      <div className="absolute top-0 right-6 md:right-24 w-px h-full bg-petrol-base/[0.03] z-0 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10">
        
        <div className="flex flex-col items-start mb-32 pl-0 md:pl-24">
           <Reveal>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-petrol-base/40 mb-4 block">
                 Arquivo Selecionado
              </span>
              <h2 className="text-7xl md:text-[9rem] leading-[0.85] font-serif font-light text-petrol-base tracking-tighter mix-blend-darken">
                 Obras <br/>
                 <span className="italic text-petrol-base/20 ml-16 md:ml-32">Recentes</span>
              </h2>
           </Reveal>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
             <ProjectCard 
                key={index}
                project={project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
             />
          ))}
        </div>

        <div className="mt-32 text-center">
            <Reveal variant="scale">
                <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 border border-petrol-base/10 hover:bg-petrol-base hover:text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group">
                    Iniciar um projeto <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </Reveal>
        </div>

      </div>

      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        category={selectedProject?.category}
        layoutId={selectedProject ? `project-image-${selectedProject.title}` : undefined}
      >
        {selectedProject && (
            <ProjectDetailContent 
                project={selectedProject} 
                layoutId={`project-image-${selectedProject.title}`}
            />
        )}
      </ContentModal>
    </section>
  );
};

export default Projects;
