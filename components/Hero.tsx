import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const portraitUrl = "/profile.jpg";

  const sectionRef   = useRef<HTMLElement>(null);
  const titleTopRef  = useRef<HTMLHeadingElement>(null);
  const titleBotRef  = useRef<HTMLHeadingElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLImageElement>(null);

  // ── Animação de entrada (timeline GSAP) ──────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Função auxiliar: divide o texto em spans por letra para stagger
    const splitIntoChars = (el: HTMLElement | null) => {
      if (!el) return [];
      const text = el.textContent ?? '';
      el.innerHTML = '';
      el.style.overflow = 'hidden';
      return text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        el.appendChild(span);
        return span;
      });
    };

    const topChars = splitIntoChars(titleTopRef.current);
    const botChars = splitIntoChars(titleBotRef.current);

    // Posição inicial oculta
    gsap.set([...topChars, ...botChars], { yPercent: 110, opacity: 0 });
    gsap.set(metaRef.current, { opacity: 0, y: 16, filter: 'blur(6px)' });
    gsap.set(imageWrapRef.current, { scaleY: 0, transformOrigin: 'bottom center' });
    gsap.set(imageRef.current, { scale: 1.12 });

    // 1. Título superior — letras sobem com stagger
    tl.to(topChars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.028,
    });

    // 2. Título inferior — mesma ideia, começa logo depois
    tl.to(botChars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.025,
    }, '-=0.7');

    // 3. Foto: wrapper expande de baixo para cima (clipPath via scaleY)
    tl.to(imageWrapRef.current, {
      scaleY: 1,
      duration: 1.1,
      ease: 'power4.inOut',
    }, '-=0.6');

    // 4. Foto: zoom-out para a escala natural
    tl.to(imageRef.current, {
      scale: 1,
      duration: 1.3,
      ease: 'power3.out',
    }, '<');

    // 5. Metadados entram com blur
    tl.to(metaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.7,
    }, '-=0.5');

  }, []);

  // ── Parallax na foto ao mover o mouse ────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const img     = imageRef.current;
    if (!section || !img) return;

    const onMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height, left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
      const x = ((clientX - left) / width  - 0.5) * 12; // ±6px
      const y = ((clientY - top)  / height - 0.5) * 8;  // ±4px
      gsap.to(img, { x, y, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to(img, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="w-full h-[100dvh] flex flex-col md:flex-row bg-white overflow-hidden"
    >
      {/* Left Pane */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex flex-col justify-between p-6 md:p-12 lg:p-16">

        {/* Top Title */}
        <h1
          ref={titleTopRef}
          className="text-[25vw] md:text-[13vw] font-serif font-light leading-[0.75] tracking-tighter text-[#000000]"
        >
          Portfólio
        </h1>

        {/* Metadata (center absolute) */}
        <div
          ref={metaRef}
          className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 flex justify-between items-start z-10"
        >
          <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-[#000000]/60">
            Victor Cardoso
          </p>
          <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-[#000000]/60 max-w-[180px] md:max-w-[220px] leading-relaxed text-right">
            Engenheiro de Software & Design
          </p>
        </div>

        {/* Bottom Title */}
        <h1
          ref={titleBotRef}
          className="text-[25vw] md:text-[13vw] font-serif font-light leading-[0.75] tracking-tighter text-[#000000] italic"
        >
          Estúdio
        </h1>
      </div>

      {/* Right Pane */}
      <div
        ref={imageWrapRef}
        className="w-full md:w-1/2 h-[50vh] md:h-full relative"
        style={{ transformOrigin: 'bottom center' }}
      >
        <img
          ref={imageRef}
          src={portraitUrl}
          alt="Victor Cardoso"
          className="w-full h-full object-cover grayscale will-change-transform"
        />
      </div>
    </section>
  );
};

export default Hero;
