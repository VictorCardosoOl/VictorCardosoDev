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
    <section id="faq" ref={containerRef} className="pt-0 pb-8 md:pt-0 md:pb-12 px-6 bg-[#FFFFFF] text-[#111] relative z-10">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* COLUNA ESQUERDA (Metade Esquerda - Sticky Flow) */}
        <div className="lg:col-span-5 relative h-full">
          {/* Ancoragem Sticky ao topo da seção em vez de centro */}
          <div className="lg:sticky lg:top-24 flex flex-col items-center lg:items-start pt-12 lg:pt-0">
            <div ref={leftRef} className="w-full max-w-lg">
               
               {/* Label Suporte */}
               <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
                 <div className="w-8 h-[1px] bg-black/20" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#333]">Suporte</span>
               </div>
               
               {/* Título com cases exatos do print */}
               <h2 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.05] tracking-tighter text-center lg:text-left">
                 Dúvidas<br/>
                 <span className="italic text-[#999]">Frequentes</span>
               </h2>
               
               {/* Parágrafo com borda lateral na esquerda (como no print) */}
               <div className="pl-4 md:pl-6 border-l border-black/10 mx-auto lg:mx-0 max-w-sm mb-12">
                 <p className="text-sm md:text-[15px] text-[#555] leading-relaxed font-sans text-left">
                   A transparência é fundamental para um processo criativo fluido. Aqui estão as respostas para as questões mais comuns.
                 </p>
               </div>

               {/* Botão de WhatsApp */}
               <div className="flex justify-center lg:justify-start">
                 <a 
                   href="https://wa.me/5511999999999" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#111] pb-2 border-b border-black/20 hover:border-black transition-colors"
                 >
                   Falar no Whatsapp <ArrowRight size={14} />
                 </a>
               </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA (Lista - Metade Direita) */}
        {/* Removido justify-center daqui para o Right Column subir e alinhar ao topo do Left Column */}
        <div ref={listRef} className="lg:col-span-6 lg:col-start-7 flex flex-col mt-12 lg:mt-0 pt-0 lg:pt-0">
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
