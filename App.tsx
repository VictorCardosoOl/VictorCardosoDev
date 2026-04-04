import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GrainBackground from './components/GrainBackground';
import Gamification from './components/Gamification';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import { ScrollProvider } from './components/ScrollContext';
import { GamificationProvider } from './components/GamificationContext'; 
import { PageTransitionProvider } from './components/ui/PageTransition';
import { MessageCircle } from 'lucide-react';
import Magnetic from './components/ui/Magnetic';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

/**
 * COMPONENTE: App (Root)
 * ----------------------
 * ARQUITETURA DE PERFORMANCE (Code Splitting):
 * Para garantir um LCP (Largest Contentful Paint) rápido, o Hero e Navbar são importados estaticamente.
 * Todas as seções abaixo da dobra (Projects, Services, Lab, etc.) são carregadas via React.lazy.
 * Isso divide o bundle JS, permitindo que o navegador renderize a primeira tela quase instantaneamente.
 */

// Lazy Loaded Components
const Services = lazy(() => import('./components/Services'));
const Process = lazy(() => import('./components/Process'));
const Projects = lazy(() => import('./components/Projects'));
const Lab = lazy(() => import('./components/Lab'));
const About = lazy(() => import('./components/About'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Reviews = lazy(() => import('./components/Reviews')); 

/**
 * COMPONENTE: Preloader (GSAP)
 * ----------------------------
 * Timeline GSAP que orquestra a entrada do logotipo, troca de palavras com
 * efeito de blur/y, e uma saída cinematográfica em "cortina" — o painel
 * é clipado de baixo para cima, revelando o hero atrás dele.
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<SVGSVGElement>(null);
  const labelRef     = useRef<HTMLSpanElement>(null);
  const wordRef      = useRef<HTMLDivElement>(null);

  const words = ["INICIALIZANDO", "ESTRATÉGIA", "DESIGN", "SISTEMA PRONTO"];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    // Importar GSAP de forma dinâmica para não bloquear o bundle inicial
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });

      // 1. Label de boot aparece rápido
      tl.fromTo(labelRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      // 2. Logo path se desenha
      const path = logoRef.current?.querySelector('path');
      if (path) {
        const length = (path as SVGPathElement).getTotalLength?.() ?? 200;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.inOut'
        }, '<+0.2');
      }

      // 3. Palavras trocam com blur/y – stagger por word
      const wordElem = wordRef.current;
      if (wordElem) {
        // Define a primeira palavra visível imediatamente
        wordElem.textContent = words[0];
        tl.fromTo(wordElem,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
        );

        // Trocar palavras em sequência
        words.slice(1).forEach((word) => {
          tl.to(wordElem, {
            opacity: 0, y: -20, filter: 'blur(6px)',
            duration: 0.35, ease: 'power2.in'
          }, '+=0.55')
          .call(() => { wordElem.textContent = word; })
          .fromTo(wordElem,
            { opacity: 0, y: 20, filter: 'blur(6px)' },
            { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }
          );
        });
      }

      // 4. Pausa breve antes da saída
      tl.to({}, { duration: 0.6 });

      // 5. Cortina: clipPath revela o hero de baixo para cima
      tl.to(panelRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1.1,
        ease: 'power4.inOut'
      });
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999]"
    >
      <div
        ref={panelRef}
        className="absolute inset-0 bg-[#000000] flex items-center justify-center text-[#FFFFFF]"
        style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      >
        <div className="flex flex-col items-center relative z-10">
          <span
            ref={labelRef}
            className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6"
            style={{ opacity: 0 }}
          >
            sys.boot_sequence
          </span>

          {/* Palavra animada */}
          <div className="h-20 flex items-center justify-center overflow-hidden mb-8">
            <div
              ref={wordRef}
              className="text-4xl md:text-6xl font-serif font-light tracking-tight text-center"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Logo SVG */}
          <svg
            ref={logoRef}
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z M5 20 L30 35 L55 20 M30 35 L30 55"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Inicialização do Loading com verificação de sessionStorage
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
       return !sessionStorage.getItem('hasSeenIntro');
    }
    return true;
  });
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Esconder no hero (aprox. 500px, mesmo limiar da navbar original)
    if (latest > 500) {
      setShowWhatsapp(true);
    } else {
      setShowWhatsapp(false);
    }
  });

  const handlePreloaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  useEffect(() => {
    console.log(
      "%c Olá, recrutador/desenvolvedor! 👋 \n Se você está vendo isso, acho que deveríamos conversar. \n Mande um email para: victorcardcunha@gmail.com", 
      "color: #00FF00; font-size: 16px; font-weight: bold; background: #000; padding: 10px; border-radius: 5px;"
    );
  }, []);

  return (
    <GamificationProvider>
      <ScrollProvider>
        <PageTransitionProvider>
          <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-[#FFFFFF] selection:bg-[#000000] selection:text-white">
            
            {/* Preloader Phase */}
            {loading && <Preloader onComplete={handlePreloaderComplete} />}
            
            {/* Global Visual Effects & Scroll Aware Tools */}
            <GrainBackground />
            <ScrollProgress />
            <Gamification />
            <BackToTop />

            {/* Navigation (Always Visible) */}
            <Navbar />
            
            {/* Main Content */}
            <main className="relative z-10 bg-[#FFFFFF]">
              
              {/* Eager Loaded Hero for LCP */}
              <Hero />

              {/* Lazy Loaded Sections wrapped in Suspense */}
              <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-xs font-mono text-[#000000]/30">Carregando módulos...</div>}>
                <Projects />
                <Services />
                {/* <Reviews /> */}
                <About />    
                <Process />
                <Lab />
                <FAQ />
                {/* <Contact /> */}
              </Suspense>
            </main>
            
            {/* Footer */}
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
            
            {/* WhatsApp Floating Action Button */}
            <AnimatePresence>
              {showWhatsapp && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-8 right-8 z-40 flex items-center gap-4 pointer-events-none"
                >
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isWhatsappHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="pointer-events-auto bg-white text-[#000000] px-4 py-2 rounded-lg shadow-xl border border-[#000000]/5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hidden md:block"
                      >
                        Fale pelo WhatsApp
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Button Wrapper */}
                  <div 
                    className="pointer-events-auto"
                    onMouseEnter={() => setIsWhatsappHovered(true)}
                    onMouseLeave={() => setIsWhatsappHovered(false)}
                  >
                    <Magnetic strength={0.3}>
                      <a 
                        href="https://wa.me/5511999999999" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-14 h-14 bg-[#000000] text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 border border-white/10"
                        aria-label="Contato via WhatsApp"
                      >
                        <MessageCircle size={24} />
                      </a>
                    </Magnetic>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </PageTransitionProvider>
      </ScrollProvider>
    </GamificationProvider>
  );
};

export default App;
