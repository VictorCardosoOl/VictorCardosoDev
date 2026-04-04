import React, { useRef, useEffect, useCallback } from 'react';
import { SERVICES } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook que mantém uma referência mutável estável para uma função,
 * evitando dependências desnecessárias em useEffects.
 */
function useStableCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef(fn);
  ref.current = fn;
  return useCallback((...args: any[]) => ref.current(...args), []) as T;
}

const Services: React.FC = () => {
  const openIndexRef   = useRef<number | null>(null); // sem state — evita re-render
  const containerRef   = useRef<HTMLElement>(null);
  const headingRef     = useRef<HTMLDivElement>(null);
  // Refs para os painéis expansíveis de cada item
  const panelRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs       = useRef<(SVGSVGElement | null)[]>([]);
  const titleRefs      = useRef<(HTMLHeadingElement | null)[]>([]);

  // ── Entrada da seção com ScrollTrigger ─────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cabeçalho
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Linhas do acordeão — stagger editorial
      const rows = containerRef.current?.querySelectorAll('.svc-row');
      if (rows) {
        gsap.fromTo(rows,
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Toggle de acordeão via GSAP (sem maxHeight CSS) ────────────
  const toggle = useStableCallback((idx: number) => {
    const panel  = panelRefs.current[idx];
    const badges = badgeRefs.current[idx];
    const icon   = iconRefs.current[idx];
    const title  = titleRefs.current[idx];
    if (!panel) return;

    const isOpen = openIndexRef.current === idx;

    // Fechar o item anterior (se houver)
    if (openIndexRef.current !== null && openIndexRef.current !== idx) {
      const prevIdx   = openIndexRef.current;
      const prevPanel = panelRefs.current[prevIdx];
      const prevIcon  = iconRefs.current[prevIdx];
      const prevTitle = titleRefs.current[prevIdx];

      if (prevPanel) {
        gsap.to(prevPanel, {
          height: 0,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.in',
          onComplete: () => gsap.set(prevPanel, { display: 'none' }),
        });
      }
      if (prevIcon)  gsap.to(prevIcon,  { rotation: 0, duration: 0.3, ease: 'power2.out' });
      if (prevTitle) gsap.to(prevTitle, { color: 'rgba(17,17,17,0.7)', duration: 0.3 });
    }

    if (isOpen) {
      // Fechar atual
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => gsap.set(panel, { display: 'none' }),
      });
      if (icon)  gsap.to(icon,  { rotation: 0, duration: 0.35, ease: 'power2.out' });
      if (title) gsap.to(title, { color: 'rgba(17,17,17,0.7)', duration: 0.3 });
      if (badges) gsap.to(badges, { opacity: 1, duration: 0.3 });
      openIndexRef.current = null;
    } else {
      // Abrir novo
      gsap.set(panel, { display: 'block', height: 'auto', opacity: 1 });
      const autoH = panel.offsetHeight;
      gsap.fromTo(panel,
        { height: 0, opacity: 0 },
        { height: autoH, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );

      // Animar os badges de tech de dentro do painel com stagger
      const techBadges = panel.querySelectorAll('.tech-badge');
      if (techBadges.length) {
        gsap.fromTo(techBadges,
          { opacity: 0, y: 10, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, delay: 0.2, ease: 'power2.out' }
        );
      }

      if (icon)   gsap.to(icon,   { rotation: 45, duration: 0.35, ease: 'power2.out' });
      if (title)  gsap.to(title,  { color: '#111', duration: 0.3 });
      if (badges) gsap.to(badges, { opacity: 0, duration: 0.2 });
      openIndexRef.current = idx;
    }
  });

  return (
    <section
      id="services"
      ref={containerRef}
      className="w-full bg-white py-24 md:py-32 border-t border-black/8"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Cabeçalho ─────────────────────────────────────────── */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20" style={{ opacity: 0 }}>
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
          {SERVICES.map((service, idx) => (
            <div key={idx} className="svc-row border-b border-black/10">

              {/* Linha clicável */}
              <button
                onClick={() => toggle(idx)}
                aria-expanded={openIndexRef.current === idx}
                className="w-full py-7 md:py-8 flex items-center gap-6 md:gap-10 text-left group focus:outline-none"
              >
                {/* Índice */}
                <span className="font-inter text-[11px] tracking-widest text-black/30 w-6 shrink-0 select-none">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>

                {/* Título */}
                <h3
                  ref={el => { titleRefs.current[idx] = el; }}
                  className="flex-1 font-inter font-medium tracking-tight transition-colors duration-300 text-[#111]/70 group-hover:text-[#111]"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
                >
                  {service.title}
                </h3>

                {/* Tags — desaparecem ao abrir via GSAP */}
                <div
                  ref={el => { badgeRefs.current[idx] = el; }}
                  className="hidden lg:flex gap-2"
                >
                  {service.tags?.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-black/12 text-[11px] font-inter font-medium text-black/40 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Ícone + que rotaciona para × via GSAP */}
                <span
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-black/15 text-black/50 group-hover:border-black/40 group-hover:text-black transition-colors duration-300"
                  aria-hidden
                >
                  <svg
                    ref={el => { iconRefs.current[idx] = el; }}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
              </button>

              {/* Painel expandível — altura controlada por GSAP, não por CSS maxHeight */}
              <div
                ref={el => { panelRefs.current[idx] = el; }}
                className="overflow-hidden"
                style={{ height: 0, display: 'none', opacity: 0 }}
              >
                <div className="pl-0 md:pl-16 pb-10 pt-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <p className="text-[15px] text-[#444] font-inter leading-relaxed">
                    {service.description}
                  </p>

                  {service.techStack && service.techStack.length > 0 && (
                    <div>
                      <p className="text-[10px] font-inter font-semibold tracking-[0.2em] uppercase text-black/30 mb-4">
                        Ferramentas & Tecnologias
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="tech-badge px-3 py-1.5 rounded-full bg-[#f4f4f4] text-[12px] font-inter font-medium text-[#555] tracking-wide"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;