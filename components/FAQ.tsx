import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

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
    answer: "Nosso processo é dividido em quatro etapas principais: Descoberta (imersão no seu negócio), Estratégia (planejamento e arquitetura), Design (criação visual e prototipagem) e Desenvolvimento (implementação técnica e testes)." 
  },
  { 
    id: 3, 
    question: "Qual o prazo médio de entrega?", 
    answer: "Projetos institucionais geralmente levam de 4 a 6 semanas. Plataformas mais complexas ou e-commerces podem levar de 8 a 12 semanas. O cronograma exato é definido durante a fase de planejamento." 
  },
  { 
    id: 4, 
    question: "Vocês oferecem suporte pós-lançamento?", 
    answer: "Sim, oferecemos pacotes de manutenção e suporte contínuo para garantir que seu site permaneça seguro, atualizado e performando da melhor maneira possível após o lançamento." 
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animar .sticky-content (Esquerda)
      if (stickyRef.current) {
        gsap.fromTo(stickyRef.current, 
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

      // 2. Animar .faq-item (Direita) com stagger
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
    <section ref={containerRef} className="py-20 px-6 bg-[#FFFFFF] text-[#000000] relative z-10">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLUNA ESQUERDA (Sticky) */}
        <div className="lg:col-span-4 relative">
          <div ref={stickyRef} className="lg:sticky lg:top-32">
            <h2 className="font-serif font-light text-5xl md:text-7xl mb-8 leading-[0.85] tracking-tight">
              Dúvidas <br/> <span className="italic opacity-50">Frequentes</span>
            </h2>
            <p className="text-lg opacity-80 max-w-sm mb-8">
              Encontre respostas rápidas para as perguntas mais comuns sobre nosso processo e serviços.
            </p>
          </div>
        </div>

        {/* Espaço Negativo (Gap) - Coluna 5 vazia */}
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* COLUNA DIREITA (Lista) */}
        <div ref={listRef} className="lg:col-span-7">
          <div className="border-t border-[#000000]/10">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={item.id} className="faq-item border-b border-[#000000]/10">
                <button 
                  onClick={() => toggleItem(idx)}
                  className="w-full py-8 md:py-10 flex justify-between items-center text-left group focus:outline-none"
                >
                  <h3 className={`text-2xl md:text-3xl font-serif font-light transition-transform duration-500 ${openIndex === idx ? 'translate-x-4 text-[#000000]' : 'text-[#000000]/70 group-hover:text-[#000000]'}`}>
                    {item.question}
                  </h3>
                  <div className={`w-10 h-10 rounded-full border border-[#000000]/10 flex items-center justify-center shrink-0 ml-4 transition-all duration-500 ${openIndex === idx ? 'bg-[#000000] text-[#FFFFFF] rotate-45' : 'bg-transparent text-[#000000]'}`}>
                    <Plus size={20} />
                  </div>
                </button>
                
                {/* Área de Resposta (Expandable) */}
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ 
                    maxHeight: openIndex === idx ? '500px' : '0px',
                    opacity: openIndex === idx ? 1 : 0,
                    paddingBottom: openIndex === idx ? '2.5rem' : '0px'
                  }}
                >
                  <p className="text-base md:text-lg opacity-80 max-w-2xl leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
