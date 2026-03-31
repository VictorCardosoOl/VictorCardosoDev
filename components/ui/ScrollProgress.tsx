import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Suaviza o movimento da barra para não parecer "jittery"
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9990] pointer-events-none mix-blend-difference">
      {/* Barra de Progresso Principal */}
      <motion.div
        className="h-[2px] bg-white origin-left"
        style={{ scaleX }}
      />
      
      {/* Indicador Opcional de Porcentagem (Estilo Editorial) */}
      {/* Descomente se quiser mostrar a % no canto */}
      {/* 
      <motion.div 
        className="absolute top-4 right-4 text-[10px] font-mono text-white font-bold"
        style={{ opacity: scrollYProgress }}
      >
        <span className="sr-only">Progresso de Leitura</span>
      </motion.div> 
      */}
    </div>
  );
};

export default ScrollProgress;