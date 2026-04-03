import React, { useState, useRef, useEffect } from 'react';
import { SERVICES } from '../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Animar linhas do acordeão
      const items = containerRef.current?.querySelectorAll('.svc-row');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="w-full bg-white py-24 md:py-32 border-t border-black/8"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Cabeçalho ─────────────────────────────────────────── */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <p className="text-[11px] font-inter font-medium tracking-[0.25em] uppercase text-black/40 mb-3">
              02 — Expertise
            </p>
            <h2
              className="font-inter font-bold text-[#111] tracking-tighter uppercase leading-[0.88]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 72px)' }}
            >
              O que<br />ofereço
            </h2>
          </div>
          <p className="text-sm md:text-[15px] text-black/50 font-inter leading-relaxed max-w-sm md:text-right">
            Da descoberta à entrega de um sistema maduro — arquiteturas incríveis por meio de código de primeira classe.
          </p>
        </div>

        {/* ── Acordeão ──────────────────────────────────────────── */}
        <div className="border-t border-black/10">
          {SERVICES.map((service, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="svc-row border-b border-black/10"
              >
                {/* Linha clicável */}
                <button
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-7 md:py-8 flex items-center gap-6 md:gap-10 text-left group focus:outline-none"
                >
                  {/* Índice */}
                  <span className="font-inter text-[11px] tracking-widest text-black/30 w-6 shrink-0 select-none">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>

                  {/* Título */}
                  <h3
                    className={`flex-1 font-inter font-medium tracking-tight transition-all duration-300 ${
                      isOpen ? 'text-[#111]' : 'text-[#111]/70 group-hover:text-[#111]'
                    }`}
                    style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
                  >
                    {service.title}
                  </h3>

                  {/* Tags (visíveis apenas quando fechado, em tela grande) */}
                  <div className={`hidden lg:flex gap-2 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                    {service.tags?.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full border border-black/12 text-[11px] font-inter font-medium text-black/40 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ícone +/– */}
                  <span
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-black/15 text-black/50 group-hover:border-black/40 group-hover:text-black transition-all duration-300"
                    aria-hidden
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    >
                      <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </button>

                {/* Painel expandível */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '600px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pl-0 md:pl-16 pb-10 pt-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Descrição */}
                    <p className="text-[15px] text-[#444] font-inter leading-relaxed">
                      {service.description}
                    </p>

                    {/* Tech stack */}
                    {service.techStack && service.techStack.length > 0 && (
                      <div>
                        <p className="text-[10px] font-inter font-semibold tracking-[0.2em] uppercase text-black/30 mb-4">
                          Ferramentas & Tecnologias
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-full bg-[#f4f4f4] text-[12px] font-inter font-medium text-[#555] tracking-wide"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;