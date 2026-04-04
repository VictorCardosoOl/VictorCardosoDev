import React, { useState, useRef, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import ContentModal from './ui/ContentModal';
import { ResumeContent } from './ResumeContent';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref    = useRef<HTMLImageElement>(null);
  const img2Ref    = useRef<HTMLImageElement>(null);
  const img3Ref    = useRef<HTMLImageElement>(null);

  // ── Parallax multi-camada nas imagens ──────────────────────────
  // Cada imagem tem uma velocidade diferente de paralaxe, criando profundidade.
  // Só ativa em telas >= md (768px) para preservar performance no mobile.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        // Img 1 — move mais devagar (fundo)
        gsap.fromTo(img1Ref.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img1Ref.current?.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );

        // Img 2 — velocidade intermediária
        gsap.fromTo(img2Ref.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: img2Ref.current?.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );

        // Img 3 — mais rápida (frente)
        gsap.fromTo(img3Ref.current,
          { yPercent: -6 },
          {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: {
              trigger: img3Ref.current?.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-white py-16 md:py-20 flex flex-col justify-center relative z-10"
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Top Section: Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 md:mb-32">
          {/* Left empty space */}
          <div className="hidden md:block md:col-span-6 lg:col-span-7" />

          {/* Right text block */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center">
            {/* Título com clipPath (cortina) para efeito editorial */}
            <Reveal variant="clip">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#111] leading-[1.05] tracking-tighter mb-8 uppercase">
                EU SOU VICTOR<br />
                CARDOSO, E EU<br />
                <span className="text-[#999]">CONSTRUO</span><br />
                SISTEMAS.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-sm md:text-base text-[#333] font-sans font-medium leading-relaxed max-w-sm">
                Especialista em Engenharia de Software.<br />
                Transformo problemas complexos em<br />
                soluções escaláveis e arte em código.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bottom Section: Images (parallax) */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

            {/* Imagem 1 — parallax lento */}
            <Reveal delay={200}>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  ref={img1Ref}
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
                  alt="Industrial"
                  className="w-full h-[115%] object-cover grayscale will-change-transform"
                />
              </div>
            </Reveal>

            {/* Imagem 2 — foto do Victor + modal CV */}
            <Reveal delay={300}>
              <div
                className="aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer group relative"
                onClick={() => setIsResumeOpen(true)}
              >
                <img
                  ref={img2Ref}
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
                  alt="Victor Cardoso"
                  className="w-full h-[125%] object-cover grayscale will-change-transform"
                />
                {/* Overlay hover com entrada suave */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-500 ease-out flex items-center justify-center">
                  <span className="text-white font-mono text-xs tracking-widest uppercase border border-white/0 group-hover:border-white px-6 py-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    Ver Currículo
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Imagem 3 — parallax rápido */}
            <Reveal delay={400}>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  ref={img3Ref}
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
                  alt="Nature"
                  className="w-full h-[120%] object-cover grayscale will-change-transform"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      {/* Modal CV */}
      <ContentModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        title="Currículo Profissional"
        category="Sobre"
      >
        <ResumeContent />
      </ContentModal>
    </section>
  );
};

export default About;
