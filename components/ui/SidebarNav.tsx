import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../../constants';
import { motion } from 'framer-motion';

const links = [
  { name: 'Início', href: '#hero' },
  ...NAV_LINKS
];

const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [showLabel, setShowLabel] = useState<boolean>(true);

  useEffect(() => {
    setShowLabel(true);
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      // Ajuste o offset para detectar a seção um pouco antes do meio da tela
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (const link of links) {
        const element = document.querySelector(link.href);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = link.href;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div 
      className="fixed left-6 top-1/2 -translate-y-1/2 z-[9990] hidden md:flex flex-col gap-6 mix-blend-difference text-white"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      {links.map((link, index) => {
        const isActive = activeSection === link.href;
        const isLabelVisible = isActive && showLabel;
        const num = String(index + 1).padStart(2, '0');
        
        return (
          <a
            key={link.href}
            href={link.href}
            className={`flex items-center text-[11px] tracking-[0.2em] transition-all duration-500 ${
              isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'
            }`}
          >
            <span className="font-mono">{num}</span>
            <motion.div
              initial={false}
              animate={{
                width: isLabelVisible ? 'auto' : 0,
                opacity: isLabelVisible ? 1 : 0,
                marginLeft: isLabelVisible ? '1rem' : '0rem'
              }}
              className="overflow-hidden whitespace-nowrap font-sans font-bold uppercase"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {link.name}
            </motion.div>
          </a>
        );
      })}
    </div>
  );
};

export default SidebarNav;
