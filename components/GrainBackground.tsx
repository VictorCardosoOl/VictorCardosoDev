import React from 'react';

/**
 * COMPONENTE: GrainBackground
 * ---------------------------
 * OBJETIVO:
 * Adicionar textura e profundidade visual ao site ("Look & Feel" de filme analógico/editorial).
 * 
 * MUDANÇAS DE PERFORMANCE (Refatoração):
 * - Anteriormente usava filtro SVG <feTurbulence>, que causa alto uso de CPU/GPU em telas grandes.
 * - Agora utiliza uma imagem Base64 PNG de ruído monocromático (64x64px ou 128x128px) repetida.
 * - Isso remove o cálculo vetorial por pixel do navegador.
 * 
 * INTERAÇÃO VISUAL:
 * - A textura não é estática. Ela "dança" usando uma animação CSS 'steps()'.
 * - Isso simula o grão de filme real (noise floor) que muda a cada frame.
 */

const GrainBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full overflow-hidden">
      
      {/* 1. Base Color Layer */}
      <div className="absolute inset-0 bg-paper"></div>

      {/* 2. Optimized Noise Layer (PNG Base64) 
           - opacity-5: Sutil o suficiente para textura, sem atrapalhar leitura.
           - mix-blend-multiply: Integra o ruído às cores de fundo.
      */}
      <div 
        className="absolute inset-[-200%] top-[-200%] w-[400%] h-[400%] opacity-[0.05] mix-blend-multiply animate-noise"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAA5OTkAAABMTExERERmZmYzMzMyMjJ4VX6iAAAACHRSTlMAM8xr/gAAAAlwSFlzAAALEwAACxMBAJqcGAAAAWRJREFUOMuVlDtuhDYQhW9QJkJtlzgVqLxAFmClQXaVnjvglmtwnwOYm7WJc1T56f4zGu8L2/hH4wF+8z0e7zLg6/WfPv14/3f78fd+2x/7w7Xf9qfr4/35+Pz+6/P7r/X5/vD8ej8fD9Xg8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HA/Hw/FwPBwPx8PxcDwcD8fD8XA8HA/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HA/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcD8fD8XA8HI/Hw/FwPBwPx8PxcDwcj/8BvV8j83d06X8AAAAASUVORK5CYII=")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      ></div>
      
      {/* 3. Atmospheric Glows (Volumetric Lighting)
           - Adicionam "vida" ao fundo cinza plano.
           - Cores do tema: Petrol Dark (#064E5E) e Muted Grey/Silver (#78909C).
           - Animação "pulse" lenta para parecer que o ambiente está respirando.
      */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#064E5E] rounded-full blur-[120px] md:blur-[180px] opacity-[0.06] animate-pulse" style={{ animationDuration: '8s' }} /> 
      
      {/* Replaced Vibrant Teal with Muted Blue Grey */}
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] bg-[#78909C] rounded-full blur-[120px] md:blur-[180px] opacity-[0.04] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />

      {/* Styles for Noise Animation defined inline for portability */}
      <style>{`
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
        .animate-noise {
          animation: noise 2s steps(4) infinite;
        }
      `}</style>
    </div>
  );
};

export default GrainBackground;