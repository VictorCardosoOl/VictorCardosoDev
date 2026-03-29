
import React, { useState } from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';
import StaggeredMenu from './ui/StaggeredMenu';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Scroll States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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

    if (latest > previous && latest > 150) {
      // Rolando para BAIXO & Passou do Header -> ESCONDER
      // Isso foca a atenção do usuário no conteúdo sendo lido.
      setIsHidden(true);
    } else {
      // Rolando para CIMA ou no Topo -> MOSTRAR
      // Isso sugere que o usuário quer navegar.
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
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        borderBottom: 'none',
        boxShadow: 'none'
    },
    scrolled: {
        y: 0,
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        borderBottom: 'none',
        boxShadow: 'none'
    },
    hidden: {
        y: "-100%",
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        borderBottom: 'none',
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
          className={`text-2xl font-serif font-bold tracking-tighter relative z-[9999] transition-colors duration-500 ${isMenuOpen ? 'text-[#FFFFFF]' : 'text-petrol-base'}`}
        >
            V<span className="text-petrol-electric">.</span>
        </a>

        {/* Hamburger Trigger - Refined Pill Shape */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative z-[9999] group flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border transition-all duration-500 backdrop-blur-md ${
             isMenuOpen 
             ? 'bg-white/10 border-white/20 text-[#FFFFFF] hover:bg-white/20' 
             : 'bg-petrol-base/5 border-petrol-base/5 text-petrol-base hover:bg-petrol-base hover:text-white hover:border-petrol-base'
          }`}
        >
          <span className="text-[9px] font-mono uppercase tracking-widest hidden md:inline-block opacity-70 group-hover:opacity-100 transition-opacity">
             {isMenuOpen ? 'Fechar' : 'Menu'}
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
             isMenuOpen 
             ? 'bg-[#FFFFFF] text-petrol-base' 
             : 'bg-white/50 text-petrol-base group-hover:bg-white/20 group-hover:text-white'
          }`}>
             {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
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
