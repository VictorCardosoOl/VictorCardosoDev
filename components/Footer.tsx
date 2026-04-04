import React, { useRef, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';
import { FlipLink } from './ui/FlipLink';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const year = new Date().getFullYear();

  const footerRef  = useRef<HTMLElement>(null);
  const victorRef  = useRef<HTMLHeadingElement>(null);
  const topGridRef = useRef<HTMLDivElement>(null);

  // ── Parallax inverso no texto "Victor" ─────────────────────────
  // O texto move-se para CIMA mais devagar que o scroll, criando profundidade.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        if (!victorRef.current || !footerRef.current) return;

        gsap.fromTo(victorRef.current,
          { yPercent: 8 },
          {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1.5,
            },
          }
        );
      }, footerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // ── Entrada do grid superior ────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(topGridRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: 'home',     href: '#home'     },
    { label: 'projects', href: '#projects' },
    { label: 'about',    href: '#about'    },
    { label: 'services', href: '#services' },
    { label: 'FAQ',      href: '#faq'      },
  ];

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      className="relative bg-white text-black w-full flex flex-col overflow-hidden z-20 pt-8"
    >
      {/* Grid superior */}
      <div
        ref={topGridRef}
        className="px-6 md:px-12 lg:px-16 w-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 mb-16"
        style={{ opacity: 0 }}
      >

        {/* Left: Social & Contact */}
        <div className="flex flex-col gap-2 text-xs md:text-sm font-sans tracking-tight">
          <div className="flex gap-4">
            <span className="w-24 opacity-60">social media:</span>
            <div className="flex gap-4">
              {CONTACT_INFO.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-40 transition-opacity"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <span className="w-24 opacity-60">say hello:</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:opacity-40 transition-opacity">
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        {/* Center: Endereços */}
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left text-xs md:text-sm gap-8 md:gap-16">
          <div className="flex flex-col gap-1">
            <span className="block font-bold uppercase tracking-widest opacity-40 mb-2 text-[9px]">O Estúdio</span>
            <span className="font-serif text-base font-medium">Estúdio Formosa</span>
            <span className="opacity-80">Vila Formosa, São Paulo</span>
            <span className="opacity-80">Brasil</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="block font-bold uppercase tracking-widest opacity-40 mb-2 text-[9px]">Escritório</span>
            <span className="font-serif text-base font-medium">Escritório do Tatuapé</span>
            <span className="opacity-80">Tatuapé, São Paulo</span>
            <span className="opacity-80">Brasil</span>
          </div>
        </div>

        {/* Right: Navigation com FlipLink */}
        <div className="flex justify-start md:justify-end text-xs md:text-sm font-sans tracking-tight">
          <div className="flex gap-4 md:gap-6 flex-wrap md:justify-end">
            {navLinks.map((link) => (
              <FlipLink
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); transitionTo(link.href); }}
                className="text-xs md:text-sm text-black hover:text-black/40"
              >
                {link.label}
              </FlipLink>
            ))}
          </div>
        </div>

      </div>

      {/* Nome gigante com parallax inverso */}
      <div className="relative w-full flex flex-col justify-center items-center overflow-hidden mt-auto">
        <h1
          ref={victorRef}
          className="text-[28vw] leading-[0.8] font-serif font-light text-black tracking-tight select-none will-change-transform"
        >
          Victor
        </h1>
        <div className="w-full flex justify-center text-center py-8 opacity-60 text-[10px] font-sans">
          <span>© {year} Victor Cardoso | Design & Engenharia</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
