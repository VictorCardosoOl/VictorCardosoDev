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
const Process  = lazy(() => import('./components/Process'));
const Projects = lazy(() => import('./components/Projects'));
const Lab      = lazy(() => import('./components/Lab'));
const About    = lazy(() => import('./components/About'));
const FAQ      = lazy(() => import('./components/FAQ'));
const Contact  = lazy(() => import('./components/Contact'));
const Footer   = lazy(() => import('./components/Footer'));
const Reviews  = lazy(() => import('./components/Reviews'));

/**
 * COMPONENTE: Preloader (GSAP) — v2
 * ----------------------------------
 * Timeline otimizada (~3s total).
 * Design premium: iniciais "VC" em serif grande, barra de progresso,
 * contador numérico e saída em cortina cinematográfica.
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const panelRef       = useRef<HTMLDivElement>(null);
  const initialsRef    = useRef<HTMLDivElement>(null);
  const labelRef       = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef     = useRef<HTMLSpanElement>(null);
  const lineTopRef     = useRef<HTMLDivElement>(null);
  const lineBotRef     = useRef<HTMLDivElement>(null);

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

      // Objeto proxy para o contador numérico
      const counter = { val: 0 };

      // 1. Linhas decorativas crescem da esquerda para direita
      tl.fromTo(
        [lineTopRef.current, lineBotRef.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08 }
      );

      // 2. Label superior aparece
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        '<+0.15'
      );

      // 3. Iniciais "VC" revelam de baixo com blur
      tl.fromTo(
        initialsRef.current,
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' },
        '<+0.1'
      );

      // 4. Barra de progresso + contador de 0 → 100 em paralelo
      tl.fromTo(
        progressBarRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
        '<+0.3'
      );
      tl.to(counter, {
        val: 100,
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.val).toString().padStart(3, '0');
          }
        }
      }, '<');

      // 5. Pausa mínima antes da saída
      tl.to({}, { duration: 0.2 });

      // 6. Cortina: sobe, revelando o hero atrás
      tl.to(panelRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.85,
        ease: 'power4.inOut'
      });
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999]">
      <div
        ref={panelRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ clipPath: 'inset(0% 0% 0% 0%)', backgroundColor: '#080808' }}
      >
        {/* Linha decorativa superior */}
        <div
          ref={lineTopRef}
          className="absolute top-0 left-0 w-full h-[1px] origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            transform: 'scaleX(0)'
          }}
        />

        {/* Conteúdo central */}
        <div className="relative flex flex-col items-center gap-6 select-none">
          {/* Label superior */}
          <span
            ref={labelRef}
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30"
            style={{ opacity: 0 }}
          >
            Victor Cardoso — Portfolio
          </span>

          {/* Iniciais grandes em serif */}
          <div
            ref={initialsRef}
            className="font-clash font-semibold text-white leading-none"
            style={{
              fontSize: 'clamp(5rem, 18vw, 12rem)',
              letterSpacing: '-0.03em',
              opacity: 0,
            }}
          >
            VC
          </div>

          {/* Barra de progresso e contador */}
          <div className="flex flex-col items-center gap-3 w-48 md:w-64">
            <div className="w-full h-[1px] bg-white/10 overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-white/70 origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                Carregando
              </span>
              <span
                ref={counterRef}
                className="font-mono text-[10px] text-white/40 tabular-nums"
              >
                000
              </span>
            </div>
          </div>
        </div>

        {/* Linha decorativa inferior */}
        <div
          ref={lineBotRef}
          className="absolute bottom-0 left-0 w-full h-[1px] origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            transform: 'scaleX(0)'
          }}
        />
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
