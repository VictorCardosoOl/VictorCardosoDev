import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;           // ms
  y?: number;               // pixels de deslocamento
  className?: string;
  /** 
   * 'translate'  → sobe com fade (padrão)
   * 'clip'       → revelação por clipPath (efeito cortina editorial)
   * 'blur'       → escala + blur desaparece
   * 'chars'      → revela letra por letra com stagger (requer texto simples)
   */
  variant?: 'translate' | 'clip' | 'blur' | 'chars';
}

/**
 * Wrapper de animação de entrada (in-view) usando GSAP ScrollTrigger.
 * Muito mais performático que o Framer Motion + useInView anterior,
 * pois o GSAP corre fora do React render cycle.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  width = 'fit-content',
  delay = 0,
  y = 50,
  className = '',
  variant = 'translate',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respeita prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el      = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;

    const delaySec = delay / 1000;

    const ctx = gsap.context(() => {
      // ── 'clip': cortina de baixo para cima ───────────────────────────
      if (variant === 'clip') {
        gsap.set(wrapper, { overflow: 'hidden' });
        gsap.fromTo(
          el,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 1.0,
            delay: delaySec,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 88%',
              once: true,
            },
          }
        );
        return;
      }

      // ── 'chars': revela letra por letra ──────────────────────────────
      if (variant === 'chars') {
        const textNode = el.querySelector('[data-chars]') ?? el.firstElementChild ?? el;
        const text = (textNode as HTMLElement).textContent ?? '';
        (textNode as HTMLElement).innerHTML = '';
        (textNode as HTMLElement).style.overflow = 'hidden';

        const spans: HTMLSpanElement[] = [];
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          (textNode as HTMLElement).appendChild(span);
          spans.push(span);
        });

        gsap.fromTo(
          spans,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.025,
            delay: delaySec,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 88%',
              once: true,
            },
          }
        );
        return;
      }

      // ── 'blur': zoom + blur desaparece ───────────────────────────────
      if (variant === 'blur') {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.06, filter: 'blur(10px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            delay: delaySec,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 88%',
              once: true,
            },
          }
        );
        return;
      }

      // ── 'translate' (padrão): sobe com fade ──────────────────────────
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: delaySec,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [variant, delay, y]);

  return (
    <div ref={wrapperRef} style={{ width }} className={`relative ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
};

export default Reveal;
