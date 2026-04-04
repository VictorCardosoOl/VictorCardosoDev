import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  { 
    id: 1, 
    question: "Qual o valor do investimento?", 
    answer: "Os valores variam de acordo com a complexidade e escopo do projeto. Cada solução é personalizada para atender às necessidades específicas do seu negócio. Entre em contato para um orçamento detalhado." 
  },
  { 
    id: 2, 
    question: "Como funciona o processo de criação?", 
    answer: "Nosso processo é dividido em quatro etapas principais: Imersão (entendimento do seu negócio), Estratégia (planejamento e arquitetura), Engenharia (desenvolvimento técnico) e Sustentação (testes e lançamento)." 
  },
  { 
    id: 3, 
    question: "Qual o prazo médio de entrega?", 
    answer: "Projetos institucionais geralmente levam de 4 a 6 semanas. Plataformas mais complexas ou ecossistemas web podem levar de 8 a 12 semanas. O cronograma exato é definido durante a fase de planejamento." 
  },
  { 
    id: 4, 
    question: "Vocês oferecem suporte pós-lançamento?", 
    answer: "Sim, oferecemos pacotes de manutenção e suporte contínuo para garantir que sua aplicação permaneça segura, atualizada e performando da melhor maneira possível após o lançamento." 
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animar a Esquerda
      if (leftRef.current) {
        gsap.fromTo(leftRef.current, 
          { y: 80, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.4, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 2. Animar .faq-item (Direita) com stagger em cachoeira
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.faq-item');
        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={containerRef} className="pt-0 pb-8 md:pt-0 md:pb-12 px-6 bg-[#FFFFFF] text-[#111] relative z-10 border-t border-[#000000]/5">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* COLUNA ESQUERDA (Metade Esquerda - Sticky Flow) */}
        <div className="lg:col-span-5 relative h-full">
          {/* Ancoragem 100vh: Cobre a tela usando flexbox para centralizar matematicamente no meio sem bugar Transforms */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center items-center lg:items-start">
            <div ref={leftRef} className="w-full max-w-lg">
               {/* Label Padrão Removido */}
               
               {/* Título com a métrica "COMO EU construo" */}
               <h2 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl mb-8 leading-[0.9] tracking-tighter uppercase text-center lg:text-left">
                 DÚVIDAS <br/> <span className="italic text-[#999] lowercase">frequentes</span>
               </h2>
               
               {/* Parágrafo padrão do projeto */}
               <p className="text-sm md:text-base text-[#333] max-w-sm mb-12 leading-relaxed font-sans text-center lg:text-left mx-auto lg:mx-0">
                 A transparência é fundamental para um processo de engenharia fluido. Aqui estão as respostas para as questões mais comuns.
               </p>
            </div>
          </div>
        </div>

        {/* Espaço Negativo Removido, grid absorve a distribuição */}

        {/* COLUNA DIREITA (Lista - Metade Direita) */}
        <div ref={listRef} className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center mt-12 lg:mt-0">
          <div className="border-t border-[#000000]/10">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.id} className="faq-item border-b border-[#000000]/10">
                  <button 
                    onClick={() => toggleItem(idx)}
                    className="w-full py-8 md:py-10 flex justify-between items-center text-left group focus:outline-none"
                  >
                    <h3 className={`text-2xl md:text-3xl font-serif font-light transition-transform duration-500 ease-out ${isOpen ? 'translate-x-4 text-[#111]' : 'text-[#333] group-hover:text-[#111]'}`}>
                      {item.question}
                    </h3>
                    
                    {/* Botão circular exigido pelas regras de consistência da UI */}
                    <div className={`w-10 h-10 rounded-full border border-[#000000]/10 flex items-center justify-center shrink-0 ml-4 transition-all duration-500 ease-out ${isOpen ? 'bg-[#111] text-white rotate-45' : 'bg-transparent text-[#111] group-hover:border-[#111]'}`}>
                      <Plus size={20} />
                    </div>
                  </button>
                  
                  {/* Área de Resposta */}
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ 
                      maxHeight: isOpen ? '500px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="text-base text-[#333] max-w-2xl leading-relaxed pb-8 md:pb-10 pl-4 md:pl-0 font-sans">
                      {item.answer}
                    </p>
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

export default FAQ;
