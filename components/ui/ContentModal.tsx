
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenis } from '../ScrollContext';
import Lenis from 'lenis';
import Magnetic from './Magnetic';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  layoutId?: string;
  children: React.ReactNode;
}

const ContentModal: React.FC<ContentModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  category, 
  layoutId,
  children 
}) => {
  const mainLenis = useLenis();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const scopedLenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      setMounted(false);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      mainLenis?.stop();
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (modalContainerRef.current && modalContentRef.current) {
            const scopedLenis = new Lenis({
                wrapper: modalContainerRef.current,
                content: modalContentRef.current,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            scopedLenisRef.current = scopedLenis;

            function raf(time: number) {
                scopedLenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        scopedLenisRef.current?.destroy();
      };

    } else {
      mainLenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      mainLenis?.start();
      document.body.style.overflow = '';
      scopedLenisRef.current?.destroy();
    };
  }, [isOpen, mainLenis]);

  useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 200) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Saída mais rápida que o modal para "limpar" a tela logo
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-[#0B232E]/95 cursor-pointer"
            aria-hidden="true"
            style={{ willChange: "opacity" }}
          />

          {/* Modal Container */}
          <motion.div
            layoutId={layoutId ? `modal-container-${layoutId}` : undefined}
            initial={{ y: "100%" }}
            animate={{ 
                y: isMobile ? "0%" : "2%",
                transition: { type: "spring", damping: 30, stiffness: 300, mass: 1 } 
            }} 
            exit={{ 
                y: "100%",
                // PERFORMANCE FIX: 
                // Usando 'tween' (linear) com easeInOut para garantir saída sedosa sem cálculos de mola.
                // Isso evita o "travamento" no final da animação.
                transition: { duration: 0.4, ease: "easeInOut" } 
            }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={handleDragEnd}
            className={`
              fixed left-0 right-0 bottom-0 z-[9999] 
              w-full bg-[#F2F4F6] shadow-2xl overflow-hidden flex flex-col
              ${isMobile ? 'h-[100dvh] rounded-none' : 'h-[98vh] rounded-t-[2rem] max-w-[96vw] mx-auto'}
            `}
            style={{ willChange: "transform", transform: "translate3d(0,0,0)" }} 
          >
            {/* Header Flutuante */}
            <div className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex items-start justify-end pointer-events-none">
               <div className="pointer-events-auto">
                <Magnetic strength={0.3}>
                    <button 
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#0B232E] flex items-center justify-center transition-all duration-300 shadow-lg group"
                    >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </Magnetic>
               </div>
            </div>

            <div 
              ref={modalContainerRef}
              className="flex-grow h-full w-full overflow-y-auto relative bg-[#F2F4F6]"
              data-lenis-prevent 
            >
               <div ref={modalContentRef} className="will-change-transform">
                   {React.Children.map(children, child => {
                      if (React.isValidElement(child)) {
                          return React.cloneElement(child as any, { layoutId });
                      }
                      return child;
                   })}
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContentModal;
