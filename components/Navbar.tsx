
import React, { useState } from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';
import StaggeredMenu from './ui/StaggeredMenu';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Scroll States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY < window.innerHeight * 0.8;
    }
    return true;
  });

  // Hook do Framer Motion para ler a posição Y do scroll
  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  // Scroll Aware Logic
  // useMotionValueEvent reage a mudanças no valor do scroll em tempo real
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // 1. Detecta se rolou além do topo (Gatilho para efeito Glass/Blur)
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // 2. Detecta a Direção do Scroll (Lógica de Esconder/Mostrar)
    // Se o menu estiver aberto, não mexemos na visibilidade.
    if (isMenuOpen) return;

    const heroThreshold = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 500;

    if (latest < heroThreshold) {
      // Oculta na seção home
      setIsHidden(true);
    } else if (latest > previous) {
      // Rolando para BAIXO -> ESCONDER
      setIsHidden(true);
    } else {
      // Rolando para CIMA (e fora da home) -> MOSTRAR
      setIsHidden(false);
    }
  });

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    transitionTo(href);
  };

  const menuItems = NAV_LINKS.map(link => ({ label: link.name, link: link.href }));
  const socialItems = CONTACT_INFO.socials.map(social => ({ label: social.name, link: social.url }));

  // --- Visual States (Variants) ---
  // Define os estilos para cada estado da Navbar
  const navVariants = {
    top: {
        y: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(0px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0)',
        boxShadow: 'none'
    },
    scrolled: {
        y: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(0px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0)',
        boxShadow: 'none'
    },
    hidden: {
        y: "-100%",
        backgroundColor: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(0px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0)',
        boxShadow: 'none'
    }
  };

  // Determina a variante atual com base na prioridade dos estados
  const getCurrentVariant = () => {
    if (isMenuOpen) return "top"; // Menu aberto tem prioridade visual
    if (isHidden) return "hidden";
    if (isScrolled) return "scrolled";
    return "top";
  };

  return (
    <>
      <motion.header
        initial="top"
        animate={getCurrentVariant()}
        variants={navVariants}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[9995] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center"
      >
        {/* Logo - Elegant & Minimal */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className={`text-xl font-clash font-semibold tracking-tight relative z-[9999] transition-colors duration-500 ${isMenuOpen ? 'text-[#FFFFFF]' : 'text-petrol-base'}`}
        >
            V<span className="text-petrol-electric">.</span>
        </a>

        {/* Hamburger Trigger - Refined Pill Shape */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative z-[9999] group flex items-center gap-4 pl-6 pr-3 py-2.5 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-xl ${
             isMenuOpen 
             ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
             : 'bg-black/5 border-black/5 text-black hover:bg-black hover:text-white hover:border-black'
          }`}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] hidden md:inline-block opacity-60 group-hover:opacity-100 transition-opacity">
             {isMenuOpen ? 'Fechar' : 'Menu'}
          </span>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
             isMenuOpen 
             ? 'bg-white text-black rotate-90' 
             : 'bg-black/10 text-black group-hover:bg-white/20 group-hover:text-white'
          }`}>
             {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </div>
        </button>
      </motion.header>

      <StaggeredMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={menuItems} 
        socialItems={socialItems} 
        onNavClick={handleNavClick} 
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
