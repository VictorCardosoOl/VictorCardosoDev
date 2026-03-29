
import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

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
const Projects = lazy(() => import('./components/Projects'));
const Lab = lazy(() => import('./components/Lab'));
const About = lazy(() => import('./components/About'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Reviews = lazy(() => import('./components/Reviews')); 

/**
 * COMPONENTE: Preloader
 * ---------------------
 * Uma tela de introdução narrativa que mascara o carregamento inicial dos assets.
 * Usa um array de palavras para criar uma micro-narrativa técnica ("INICIALIZANDO", etc).
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [textIndex, setTextIndex] = useState(0);
  const words = ["INICIALIZANDO", "ESTRATÉGIA", "DESIGN", "SISTEMA PRONTO"];

  useEffect(() => {
    // Garante que o scroll esteja travado no topo durante o loading
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev >= words.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
             document.body.style.overflow = ''; // Libera o scroll
             onComplete();
          }, 800); 
          return prev;
        }
        return prev + 1;
      });
    }, 600); 

    return () => {
        clearInterval(interval);
        document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#000000] flex items-center justify-center text-[#FFFFFF]"
    >
      <div className="flex flex-col items-center relative z-10">
         <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6 animate-pulse">
            sys.boot_sequence
         </span>
         
         <div className="h-20 flex items-center justify-center overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ y: 40, opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(5px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-center"
                >
                  {words[textIndex]}
                </motion.div>
             </AnimatePresence>
         </div>

         <div className="mt-12 flex justify-center items-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z M5 20 L30 35 L55 20 M30 35 L30 55"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
              />
            </svg>
         </div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  // Inicialização do Loading
  // NOTA: Removido verificação de sessionStorage para garantir que o preloader
  // apareça sempre para fins de demonstração/desenvolvimento.
  const [loading, setLoading] = useState(true);
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
    // sessionStorage.setItem('hasSeenIntro', 'true'); // Descomentar em produção
  };

  return (
    <GamificationProvider>
      <ScrollProvider>
        <PageTransitionProvider>
          <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-[#FFFFFF] selection:bg-[#000000] selection:text-white">
            
            {/* Preloader Phase */}
            <AnimatePresence mode="wait">
              {loading && <Preloader onComplete={handlePreloaderComplete} />}
            </AnimatePresence>
            
            {/* Global Visual Effects & Scroll Aware Tools */}
            <GrainBackground />
            <ScrollProgress />
            <Gamification />
            <BackToTop />

            {/* Navigation (Always Visible) */}
            <Navbar />
            
            {/* Main Content with Sticky Footer Logic */}
            <main className="relative z-10 bg-[#FFFFFF] mb-[90vh] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] rounded-b-[3rem] border-b border-black/10">
              
              {/* Eager Loaded Hero for LCP */}
              <Hero />

              {/* Lazy Loaded Sections wrapped in Suspense */}
              <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-xs font-mono text-[#000000]/30">Carregando módulos...</div>}>
                <Projects />
                <Services />
                <Reviews />
                <Lab />
                <About />    
                <FAQ />
                <Contact />
              </Suspense>
            </main>
            
            {/* Sticky Footer - Fullscreen Reveal Effect */}
            <div className="fixed bottom-0 left-0 w-full z-0 min-h-[90vh]">
               <Suspense fallback={null}>
                  <Footer />
               </Suspense>
            </div>
            
            {/* WhatsApp Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-40 flex items-center gap-4 pointer-events-none">
              
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
            </div>

          </div>
        </PageTransitionProvider>
      </ScrollProvider>
    </GamificationProvider>
  );
};

export default App;
