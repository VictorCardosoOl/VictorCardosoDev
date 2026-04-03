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

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const imageRefs  = useRef<(HTMLDivElement | null)[]>([]);

  // Get Lenis instance from context
  const lenis = useLenis();

  // ── 1. LINK LENIS → GSAP ScrollTrigger (proxy) ──────────────
  // Without this bridge, ScrollTrigger reads native window.scrollY
  // which Lenis overrides — so pinning never fires correctly.
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
      // @ts-ignore — reset proxy on cleanup
      ScrollTrigger.scrollerProxy(document.documentElement, undefined);
    };
  }, [lenis]);

  // ── 2. PIN LEFT COLUMN via ScrollTrigger ─────────────────────
  // Runs after the Lenis proxy is established (lenis dep).
  // Only active on ≥ lg viewports.
  useLayoutEffect(() => {
    if (!leftRef.current || !rightRef.current || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          // Unpin when the last image bottom clears the viewport
          end: () => `+=${rightRef.current!.offsetHeight - window.innerHeight}`,
          pin: leftRef.current,
          pinSpacing: false,  // right col stays in natural document flow
          anticipatePin: 1,   // prevents flicker at pin entry
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [lenis]); // re-run once lenis proxy is ready

  // ── 3. SCROLL-SPY: active project via IntersectionObserver ───
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

  const handleOpen  = (p: typeof PROJECTS[0]) => setSelectedProject(p);
  const handleClose = () => setSelectedProject(null);

  return (
    // ⚠️ NO overflow-hidden — would create a new scroll context and
    //    destroy both the Lenis proxy and ScrollTrigger pin.
    <section ref={sectionRef} id="projects" className="w-full bg-white relative">

      {/* Outer flex row — rightRef wraps BOTH columns so ScrollTrigger
          can measure the total scrollable height of the right column */}
      <div ref={rightRef} className="w-full flex flex-col lg:flex-row">

        {/* ── LEFT COLUMN (pinned by ScrollTrigger) ──────────── */}
        <div
          ref={leftRef}
          className="hidden lg:flex lg:w-1/2 h-screen flex-col justify-between py-20 px-20 bg-white z-10"
        >
          {/* Massive section title */}
          <div>
            <h2
              className="font-inter font-bold text-[#161719] tracking-tighter uppercase leading-[0.85]"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 110px)' }}
            >
              Obras<br />Selecionadas
            </h2>
          </div>

          {/* Project index list — opacity driven by scroll-spy */}
          <div className="flex flex-col gap-3">
            {PROJECTS.map((project, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleOpen(project)}
                  className={clsx(
                    'flex justify-between items-baseline cursor-pointer transition-opacity duration-300',
                    isActive ? 'opacity-100' : 'opacity-25'
                  )}
                >
                  <span className={clsx(
                    'font-inter transition-all duration-300',
                    isActive
                      ? 'text-lg font-bold uppercase text-[#161719]'
                      : 'text-lg font-normal text-[#161719]'
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

        {/* ── RIGHT COLUMN (scrolls naturally with the page) ──── */}
        {/* Each slide is exactly 100vh, stacked vertically.
            The section's total height = N × 100vh, which gives the
            page enough room to scroll before the pin releases.      */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              ref={el => { imageRefs.current[index] = el; }}
              className="relative w-full overflow-hidden cursor-pointer group"
              style={{ height: '100vh' }}
              onClick={() => handleOpen(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* © watermark (center) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-inter font-light text-2xl md:text-4xl tracking-widest opacity-70">
                  © {project.title.toLowerCase()}
                </span>
              </div>

              {/* Mobile label — left col is hidden on mobile */}
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

      {/* ── Detail Modal ─────────────────────────────────────── */}
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
