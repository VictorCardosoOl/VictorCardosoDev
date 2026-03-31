import React, { useState, useRef, useEffect } from 'react';
import { SERVICES } from '../constants';
import { Plus, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Abre o primeiro serviço por default
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animar a Esquerda
      if (leftRef.current) {
        gsap.fromTo(leftRef.current, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 2. Animar a Direita (Itens)
      if (rightRef.current) {
        const items = rightRef.current.querySelectorAll('.service-item');
        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="py-16 md:py-24 px-6 bg-[#FFFFFF] text-[#111] relative z-10 border-t border-[#000000]/5">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* COLUNA ESQUERDA (Foco Narrativo/Sticky) */}
        <div className="lg:col-span-4 relative h-full">
           <div className="lg:sticky lg:top-32">
             <div ref={leftRef}>
               {/* Título sem label superior */}
               <h2 className="text-3xl md:text-4xl font-sans tracking-tight mb-6 text-[#111]">
                 Expertise
               </h2>
               
               {/* Parágrafo de Missão estético ao Print de Referência */}
               <p className="text-sm md:text-base text-[#999] leading-relaxed font-sans max-w-sm mb-12">
                 Desde a descoberta até a entrega de um sistema maduro, minha missão é ajudar lideranças técnicas a desenhar arquiteturas incríveis por meio de um código de primeira classe. Apesar da minha principal especialização ser Engenharia Front-end e UX dinâmico, uma ampla gama de habilidades backend fazem parte do tecido fundamental do meu trabalho.
               </p>

               {/* Ponto Preto (Indicador Iconográfico flutuante isolado na esquerda como na imagem) */}
               <div className="w-[6px] h-[6px] bg-[#111] rounded-full mx-auto md:mx-0 lg:ml-24 mt-16 md:mt-24"></div>
             </div>
           </div>
        </div>

        {/* Espaço Negativo Funcional reduzido em pro do layout apertado */}
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* COLUNA DIREITA (Acordeão) */}
        <div className="lg:col-span-7">
          <div ref={rightRef} className="border-t-[1px] border-[#111]/10">
            {SERVICES.map((service, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="service-item border-b-[1px] border-[#111]/10">
                  <button 
                    onClick={() => toggleItem(idx)}
                    className="w-full py-6 md:py-8 flex justify-between items-center text-left group focus:outline-none"
                  >
                    {/* Título - Mantido em sans-serif acompanhando o design do print */}
                    <h3 className={`text-2xl md:text-[2.25rem] font-sans font-normal tracking-tight transition-transform duration-500 ease-out ${isOpen ? 'translate-x-2 text-[#111]' : 'text-[#111]/80 group-hover:text-[#111]'}`}>
                      {service.title}
                    </h3>
                    
                    {/* Indicadores Visuais Limpos (Plus/Minus sem Circle) */}
                    <div className="shrink-0 ml-4 text-[#111] group-hover:scale-110 transition-transform duration-300">
                      {isOpen ? <Minus size={22} strokeWidth={1} /> : <Plus size={22} strokeWidth={1} />}
                    </div>
                  </button>
                  
                  {/* Área de Resposta Expandível */}
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ 
                      maxHeight: isOpen ? '900px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="pb-8 pt-2">
                       {/* Descrição Principal (Escura e Destaque) */}
                       <p className="text-sm md:text-[15px] text-[#111] max-w-2xl leading-relaxed font-sans mb-8 pr-4">
                         {service.description}
                       </p>
                       
                       {/* Lista Vertical de Sub-tópicos Simulando os links secundários ('Painel de Inspiração...') */}
                       {service.techStack && service.techStack.length > 0 && (
                          <ul className="space-y-4">
                            {service.techStack.map((tech, i) => (
                              <li key={i} className="text-[13px] md:text-sm text-[#999] font-sans tracking-wide">
                                {tech}
                              </li>
                            ))}
                          </ul>
                       )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;