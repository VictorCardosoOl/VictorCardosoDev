
import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

/**
 * Contexto para expor a instância do Lenis globalmente.
 * Permite que outros componentes controlem o scroll (ex: pausar em modais, scroll to anchor).
 */
const ScrollContext = createContext<Lenis | null>(null);

/**
 * Hook para acessar a instância do Lenis.
 * @returns {Lenis | null} A instância atual do Lenis ou null se não inicializado.
 */
export const useLenis = () => useContext(ScrollContext);

// Exportado como useScroll para compatibilidade, mas prefira useLenis para clareza.
export const useScroll = () => useContext(ScrollContext);

/**
 * Provider que envolve a aplicação para gerenciar o "Smooth Scroll".
 * Utiliza a biblioteca Lenis para interceptar o scroll nativo e aplicar física de inércia.
 */
export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Configuração "Heavy Luxury / Cinematic"
    // O objetivo é criar uma sensação de massa e inércia ("peso"), similar a rolar uma página de revista premium.
    const lenisInstance = new Lenis({
      duration: 1.5, // Duração da inércia (em segundos). Valores mais altos = parada mais lenta.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out: Arrancada rápida, desaceleração suave.
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true, // Habilita suavização para roda do mouse
      wheelMultiplier: 0.9, // Reduz a sensibilidade para aumentar a sensação de peso
      touchMultiplier: 1.5, // Aumenta sensibilidade no touch para não ficar "arrastado" demais
    });

    setLenis(lenisInstance);

    let rafId: number;

    /**
     * Loop de Animação (Request Animation Frame).
     * O Lenis precisa ser atualizado a cada frame do navegador para calcular a nova posição.
     * @param time Timestamp atual fornecido pelo requestAnimationFrame
     */
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup: Remove o loop e destrói a instância ao desmontar
    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={lenis}>
      {children}
    </ScrollContext.Provider>
  );
};
