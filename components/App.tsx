
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import GrainBackground from './GrainBackground';
import Gamification from './Gamification';
import ScrollProgress from './ui/ScrollProgress';
import BackToTop from './ui/BackToTop';
import { ScrollProvider } from './ScrollContext';
import { GamificationProvider } from './GamificationContext'; 
import { PageTransitionProvider } from './ui/PageTransition';
import { MessageCircle } from 'lucide-react';
import Magnetic from './ui/Magnetic';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy Loaded Components
const Services = lazy(() => import('./Services'));
const Projects = lazy(() => import('./Projects'));
const Lab = lazy(() => import('./Lab'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));
const Reviews = lazy(() => import('./Reviews'));

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [textIndex, setTextIndex] = useState(0);
  const words = ["INICIALIZANDO", "ESTRATÉGIA", "DESIGN", "SISTEMA PRONTO"];

  useEffect(() => {
    // Force top scroll on mount
    window.scrollTo(0, 0);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev >= words.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#0B232E] flex items-center justify-center text-[#F2F4F6]"
    >
      <div className="flex flex-col items-center">
         <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6 animate-pulse">
            sys.boot_sequence
         </span>
         
         <div className="h-20 flex items-center justify-center overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-serif font-light tracking-tight text-center"
                >
                  {words[textIndex]}
                </motion.div>
             </AnimatePresence>
         </div>

         <div className="mt-8 w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 h-full bg-white"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 2.4, ease: "easeInOut" }}
            />
         </div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <GamificationProvider>
      <ScrollProvider>
        <PageTransitionProvider>
          <div className="flex flex-col min-h-screen relative bg-paper selection:bg-petrol-base selection:text-white">
            
            <AnimatePresence mode="wait">
              {loading && <Preloader onComplete={handlePreloaderComplete} />}
            </AnimatePresence>
            
            <GrainBackground />
            <ScrollProgress />
            <Gamification />
            <BackToTop />
            <Navbar />
            
            {/* 
                LAYOUT ARCHITECTURE FIX:
                Main Content: Z-Index 10, Background Paper. It slides OVER the footer.
                Footer: Z-Index 0, Fixed at bottom.
                Spacer: Ensures user can scroll enough to reveal the footer.
            */}
            <main className="relative z-10 bg-paper shadow-2xl rounded-b-[2.5rem] md:rounded-b-[3.5rem] border-b border-doc overflow-hidden">
              <Hero />
              
              <Suspense fallback={<div className="h-32 flex items-center justify-center text-xs font-mono opacity-30">Carregando...</div>}>
                <Projects />
                <Services />
                <Reviews />
                <Lab />
                <About />    
                <Contact />
              </Suspense>
            </main>

            {/* SPACER: Allow scroll to go beyond main content to reveal fixed footer */}
            <div className="relative z-0 h-[100vh] w-full pointer-events-none" aria-hidden="true" />
            
            {/* STICKY FOOTER */}
            <div className="fixed bottom-0 left-0 w-full h-[100vh] z-0 flex flex-col justify-end">
               <Suspense fallback={null}>
                  <Footer />
               </Suspense>
            </div>
            
            {/* WhatsApp FAB */}
            <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 pointer-events-none mix-blend-normal">
              <AnimatePresence>
                {isWhatsappHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    className="pointer-events-auto bg-white text-petrol-base px-4 py-2 rounded-lg shadow-xl border border-petrol-base/5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hidden md:block"
                  >
                    Fale pelo WhatsApp
                  </motion.div>
                )}
              </AnimatePresence>

              <div 
                className="pointer-events-auto"
                onMouseEnter={() => setIsWhatsappHovered(true)}
                onMouseLeave={() => setIsWhatsappHovered(false)}
              >
                <Magnetic strength={0.3}>
                  <a 
                    href="https://wa.me/5511977440146" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 bg-petrol-base text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 border border-white/10"
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
