import React, { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from '../ScrollContext';
import Magnetic from './Magnetic';

const BackToTop: React.FC = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  // Monitora o scroll para mostrar/esconder o botão
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Mostrar apenas após passar do Hero (aprox 800px)
    if (latest > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-24 z-40 hidden md:block" // right-24 para não sobrepor o WhatsApp
        >
          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-petrol-base/10 bg-paper/80 backdrop-blur-sm text-petrol-base hover:bg-petrol-base hover:text-white transition-all shadow-sm hover:shadow-lg group"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </Magnetic>
          
          {/* Label Vertical Opcional */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-[9px] font-mono uppercase tracking-widest text-petrol-base/40 whitespace-nowrap -rotate-90 origin-bottom translate-y-8">
               Topo
             </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;