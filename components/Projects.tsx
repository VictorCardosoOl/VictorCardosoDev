import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import clsx from 'clsx';
import { useLenis } from './ScrollContext';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevActiveRef = useRef(0);

  // Refs
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const imageRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const imgElemRefs = useRef<(HTMLImageElement | null)[]>([]);
  const watermarkRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rowRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const lenis = useLenis();

  // ── 1. LINK LENIS → GSAP ScrollTrigger ──────────────────────
  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      // @ts-ignore
      ScrollTrigger.scrollerProxy(document.documentElement, undefined);
    };
  }, [lenis]);

  // ── 2. PIN LEFT COLUMN ───────────────────────────────────────
  useLayoutEffect(() => {
    if (!leftRef.current || !rightRef.current || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${rightRef.current!.offsetHeight - window.innerHeight}`,
          pin: leftRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [lenis]);

  // ── 3. SCROLL-SPY ────────────────────────────────────────────
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    imageRefs.current.forEach((el, idx) => {
      if (!el) return;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(idx); },
        { rootMargin: '-49% 0px -49% 0px', threshold: 0 }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  // ── 4. Animação da lista esquerda quando muda o activeIndex ──
  useEffect(() => {
    const prev = prevActiveRef.current;
    const curr = activeIndex;
    prevActiveRef.current = curr;

    if (prev === curr) return;

    // Item anterior: pulsa para fora
    const prevRow = rowRefs.current[prev];
    if (prevRow) {
      gsap.to(prevRow, { opacity: 0.22, duration: 0.4, ease: 'power2.out' });
    }

    // Item atual: pulsa para dentro
    const currRow = rowRefs.current[curr];
    if (currRow) {
      gsap.fromTo(currRow,
        { opacity: 0.22, x: -6 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      );
    }

    // Watermark do item anterior sai
    const prevWm = watermarkRefs.current[prev];
    if (prevWm) {
      gsap.to(prevWm, { opacity: 0, y: -10, duration: 0.35, ease: 'power2.in' });
    }
    // Watermark do item atual entra
    const currWm = watermarkRefs.current[curr];
    if (currWm) {
      gsap.fromTo(currWm,
        { opacity: 0, y: 12, filter: 'blur(4px)' },
        { opacity: 0.7, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }
      );
    }
  }, [activeIndex]);

  // ── 5. Hover nas imagens ─────────────────────────────────────
  const handleImageEnter = (idx: number) => {
    const img = imgElemRefs.current[idx];
    if (img) gsap.to(img, { scale: 1.05, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
  };

  const handleImageLeave = (idx: number) => {
    const img = imgElemRefs.current[idx];
    if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
  };

  const handleOpen  = (p: typeof PROJECTS[0]) => setSelectedProject(p);
  const handleClose = () => setSelectedProject(null);

  return (
    <section ref={sectionRef} id="projects" className="w-full bg-white relative">

      <div ref={rightRef} className="w-full flex flex-col lg:flex-row">

        {/* ── LEFT COLUMN (pinned) ──────────────────────────────── */}
        <div
          ref={leftRef}
          className="hidden lg:flex lg:w-1/2 h-screen flex-col justify-between py-20 pl-16 pr-12 bg-white z-10"
        >
          <div className="overflow-hidden">
            <h2
              className="font-inter font-bold text-[#161719] tracking-tighter uppercase leading-[0.85]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 68px)' }}
            >
              Obras<br />Selecionadas
            </h2>
          </div>

          {/* Lista de projetos com animação controlada por GSAP */}
          <div className="flex flex-col gap-3">
            {PROJECTS.map((project, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={idx}
                  ref={el => { rowRefs.current[idx] = el; }}
                  onClick={() => handleOpen(project)}
                  className={clsx(
                    'flex justify-between items-baseline cursor-pointer',
                    isActive ? 'opacity-100' : 'opacity-[0.22]'
                  )}
                >
                  <span className={clsx(
                    'font-inter transition-all duration-300',
                    isActive ? 'text-lg font-bold uppercase text-[#161719]' : 'text-lg font-normal text-[#161719]'
                  )}>
                    {(idx + 1).toString().padStart(2, '0')} {project.title}
                  </span>
                  <span className={clsx(
                    'font-inter text-sm transition-all duration-300',
                    isActive ? 'font-bold text-[#161719]' : 'font-normal text-[#161719]'
                  )}>
                    {project.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN (scrolls naturally) ─────────────────── */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              ref={el => { imageRefs.current[index] = el; }}
              className="relative w-full overflow-hidden cursor-pointer group"
              style={{ height: '100vh' }}
              onClick={() => handleOpen(project)}
              onMouseEnter={() => handleImageEnter(index)}
              onMouseLeave={() => handleImageLeave(index)}
            >
              <img
                ref={el => { imgElemRefs.current[index] = el; }}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover will-change-transform"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* Watermark — controlado por GSAP via scroll-spy */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  ref={el => { watermarkRefs.current[index] = el; }}
                  className="text-white font-inter font-light text-2xl md:text-4xl tracking-widest"
                  style={{ opacity: index === 0 ? 0.7 : 0 }}
                >
                  © {project.title.toLowerCase()}
                </span>
              </div>

              {/* Label mobile */}
              <div className="absolute bottom-8 left-6 flex flex-col gap-1 lg:hidden">
                <span className="text-white font-inter font-bold text-2xl tracking-tighter">
                  {project.title}
                </span>
                <span className="text-white/60 font-inter text-sm uppercase tracking-widest">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <ContentModal
        isOpen={!!selectedProject}
        onClose={handleClose}
        title={selectedProject?.title}
        category={selectedProject?.category}
      >
        {selectedProject && <ProjectDetailContent project={selectedProject} />}
      </ContentModal>
    </section>
  );
};

export default Projects;
