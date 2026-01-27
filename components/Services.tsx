import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { usePageTransition } from './ui/PageTransition';
import ContentModal from './ui/ContentModal';

const Services: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  // NOTA DE PERFORMANCE:
  // Removemos o useState para 'hoveredIndex'. O efeito "Spotlight" agora é feito via CSS puro
  // usando as classes 'group/list' e 'group-hover/list'.
  // Isso evita re-renders do React enquanto o mouse se move, eliminando o lag de scroll.

  return (
    <section id="services" className="py-32 md:py-48 bg-paper text-petrol-base relative z-10 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header Minimalista */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-6 border-b border-petrol-base/10">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-petrol-base tracking-tighter leading-[0.9]">
                Expertise
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <span className="text-[10px] font-mono text-petrol-base/40 uppercase tracking-widest block mt-4 md:mt-0">
                Estratégia & Engenharia
              </span>
            </Reveal>
        </div>

        {/* --- PERFORMANCE OPTIMIZED LIST --- */}
        {/* 'group/list' permite controlar o estado dos filhos baseado no hover do pai */}
        <div 
            className="flex flex-col group/list"
        >
          {SERVICES.map((service, index) => {
             return (
               <Reveal key={index} width="100%" delay={index * 50}>
                 <div 
                    className="group/item relative border-b border-petrol-base/10 transition-all duration-500 ease-out cursor-pointer
                        hover:!opacity-100 hover:!scale-100 
                        group-hover/list:opacity-30 group-hover/list:scale-[0.99] group-hover/list:grayscale
                    "
                    onClick={() => setSelectedService(service)}
                 >
                    <div className="py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-0 items-baseline relative z-10">
                        
                        {/* 01. Index */}
                        <div className="md:w-1/12">
                            <span className="text-[10px] font-mono text-petrol-base/30 group-hover/item:text-petrol-electric transition-colors">
                                0{index + 1}
                            </span>
                        </div>

                        {/* 02. Title */}
                        <div className="md:w-4/12">
                            <h3 className="text-3xl md:text-5xl font-serif font-light text-petrol-base transition-all duration-500 group-hover/item:translate-x-4 tracking-tight group-hover/item:font-normal">
                               {service.title}
                            </h3>
                        </div>

                        {/* 03. Description & Static Tech Stack */}
                        <div className="md:w-5/12 pr-8 relative">
                            <p className="text-sm md:text-base font-light leading-relaxed text-petrol-ink/60 group-hover/item:text-petrol-ink transition-colors max-w-sm mb-6">
                               {service.description}
                            </p>
                            
                            {/* Tech Stack - Static Display (No Height Animation) 
                                Mostra as tags sempre, mas com opacidade reduzida que acende no hover.
                                Isso remove o "layout shift" que causava o engasgo.
                            */}
                            <div className="hidden md:flex flex-wrap gap-2 opacity-50 group-hover/item:opacity-100 transition-opacity duration-500">
                                {service.techStack?.slice(0, 4).map((tech, i) => (
                                    <span key={i} className="text-[9px] font-mono border border-petrol-base/10 px-2 py-0.5 rounded-full text-petrol-base/60 bg-white">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 04. Action Icon */}
                        <div className="md:w-2/12 flex justify-end items-center">
                           <div className="w-10 h-10 rounded-full border border-petrol-base/10 flex items-center justify-center transition-all duration-500 group-hover/item:bg-petrol-base group-hover/item:text-white group-hover/item:rotate-[-45deg] group-hover/item:scale-110 text-petrol-base/30">
                               <ArrowRight size={14} />
                           </div>
                        </div>

                    </div>
                 </div>
               </Reveal>
             );
          })}
        </div>

        {/* Footer / CTA */}
        <div className="mt-24 text-center">
            <Reveal variant="scale">
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
                  className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-petrol-base hover:text-petrol-electric transition-colors border-b border-transparent hover:border-petrol-electric pb-1"
                >
                    Iniciar um Projeto <ArrowRight size={12} />
                </a>
            </Reveal>
        </div>

        {/* Modal Logic */}
        <ContentModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title}
          category="Expertise"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
              <div className="mb-12">
                 <h3 className="text-3xl md:text-5xl font-serif font-medium text-petrol-base mb-6 leading-tight">
                    {selectedService?.title}
                 </h3>
                 <p className="text-lg md:text-xl text-petrol-ink font-light leading-relaxed border-l border-petrol-base/10 pl-6">
                   {selectedService?.description}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-4">Stack Tecnológico</h4>
                    <ul className="space-y-2">
                        {selectedService?.techStack?.map((tech, i) => (
                            <li key={i} className="flex items-center gap-2 text-petrol-base font-medium text-sm">
                                <span className="w-1 h-1 rounded-full bg-petrol-electric"></span> {tech}
                            </li>
                        ))}
                    </ul>
                 </div>
                 
                 <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-4">Metodologia</h4>
                     <p className="text-sm text-petrol-ink/80 font-light leading-relaxed">
                        Abordagem modular focada em desacoplamento e escalabilidade. Cada componente é desenhado para sobreviver a mudanças de requisitos.
                     </p>
                 </div>
              </div>
              
              <div className="bg-petrol-base text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                 <div>
                     <h4 className="text-xl font-serif">Precisa desta expertise?</h4>
                     <p className="text-white/60 text-sm font-light">Vamos aplicar esta tecnologia no seu próximo projeto.</p>
                 </div>
                 <a 
                   href="#contact" 
                   onClick={(e) => { 
                      e.preventDefault(); 
                      setSelectedService(null);
                      setTimeout(() => transitionTo('#contact'), 300);
                   }}
                   className="px-6 py-3 bg-white text-petrol-base rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-paper transition-colors"
                 >
                   Conversar
                 </a>
              </div>
            </div>
        </ContentModal>

      </div>
    </section>
  );
};

export default Services;