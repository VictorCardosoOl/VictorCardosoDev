
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// --- Tipos e Interfaces ---

export type Rank = 'Bronze' | 'Prata' | 'Ouro' | 'Hacker';

export interface Quest {
  id: string;
  label: string;
  xp: number;
  completed: boolean;
  link?: string;
}

export type SectionTime = Record<string, number>;

interface SessionData {
  totalTime: number;
  sectionTimes: SectionTime;
}

interface GamificationContextType {
  xp: number;
  level: number;
  rank: Rank;
  quests: Quest[];
  completeQuest: (id: string) => void;
  unlockAchievement: (label: string) => void; 
  notification: { message: string; visible: boolean; type?: Rank } | null;
  hideNotification: () => void;
  currentSection: string;
  // Controle do Modal "Manifesto"
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  // Easter Egg
  isHackerMode: boolean;
  // Acesso a dados brutos de sessão (sem re-render)
  getSessionData: () => SessionData;
}

const GamificationContext = createContext<GamificationContextType | null>(null);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within a GamificationProvider');
  return context;
};

// --- Dados Iniciais ---

const INITIAL_QUESTS: Quest[] = [
  { id: 'scroll_hero', label: 'Primeiros Passos', xp: 10, completed: false },
  { id: 'scroll_deep', label: 'Explorador Profundo', xp: 20, completed: false, link: '#services' },
  { id: 'click_project', label: 'Analisar um Projeto', xp: 25, completed: false, link: '#projects' },
  { id: 'time_spent', label: 'Leitura Atenta (> 1min)', xp: 15, completed: false },
  { id: 'click_github', label: 'Auditoria Técnica (GitHub)', xp: 20, completed: false, link: '#lab' },
  { id: 'click_contact', label: 'Interesse em Contato', xp: 30, completed: false, link: '#contact' },
  { id: 'konami_code', label: 'GOD MODE (Konami Code)', xp: 999, completed: false },
];

/**
 * Provider de Gamificação.
 * Gerencia o estado global de XP, Nível, Missões e Rastreamento de Sessão.
 * 
 * NOTA DE ARQUITETURA:
 * Utilizamos uma abordagem híbrida de State (para UI reativa) e Refs (para rastreamento de alta frequência).
 * Isso evita que o timer de sessão cause re-renderizações em toda a aplicação a cada segundo.
 */
export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  // --- STATE (Reativo - Atualiza a UI) ---
  const [quests, setQuests] = useState<Quest[]>(() => {
    if (typeof window === 'undefined') return INITIAL_QUESTS;
    const saved = localStorage.getItem('v_quests');
    return saved ? JSON.parse(saved) : INITIAL_QUESTS;
  });
  
  // --- REFS (Não Reativo - Alta Performance) ---
  // Armazena dados que mudam frequentemente (timer) mas não precisam atualizar a UI instantaneamente.
  const trackingRef = useRef({
    totalTime: 0,
    sectionTimes: {} as SectionTime
  });

  const [currentSection, setCurrentSection] = useState('hero');
  const [notification, setNotification] = useState<{ message: string; visible: boolean; type?: Rank } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHackerMode, setIsHackerMode] = useState(false);

  // Persistência local das missões
  useEffect(() => {
    localStorage.setItem('v_quests', JSON.stringify(quests));
  }, [quests]);

  /**
   * Listener do Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
   * Ativa o modo "Hacker" que muda o tema do site.
   */
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[cursor]) {
        cursor++;
        if (cursor === konamiCode.length) {
          activateHackerMode();
          cursor = 0;
        }
      } else {
        cursor = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activateHackerMode = () => {
    setIsHackerMode(true);
    document.body.classList.add('hacker-mode');
    completeQuest('konami_code');
    triggerNotification('GOD MODE ATIVADO', 'Hacker');
  };

  // Cálculo derivado de XP e Rank
  const xp = quests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
  const level = Math.floor(xp / 25) + 1;

  const getRank = (lvl: number): Rank => {
    if (isHackerMode) return 'Hacker';
    if (lvl >= 8) return 'Ouro';
    if (lvl >= 4) return 'Prata';
    return 'Bronze';
  };
  const rank = getRank(level);

  // --- Lógica de Negócio ---

  /**
   * Marca uma missão como completa e dispara notificação.
   * @param id ID único da missão
   */
  const completeQuest = (id: string) => {
    setQuests(prev => {
      const idx = prev.findIndex(q => q.id === id);
      if (idx === -1 || prev[idx].completed) return prev; // Já completada ou inexistente

      const newQuests = [...prev];
      newQuests[idx] = { ...newQuests[idx], completed: true };
      
      const newXp = newQuests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
      const newLevel = Math.floor(newXp / 25) + 1;
      const newRank = getRank(newLevel);

      triggerNotification(`Conquista: ${newQuests[idx].label}`, newRank);
      return newQuests;
    });
  };

  const unlockAchievement = (message: string) => {
    triggerNotification(message, rank);
  };

  const triggerNotification = (message: string, rankType: Rank) => {
    setNotification({ message, visible: true, type: rankType });
    setTimeout(() => {
        setNotification(prev => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const hideNotification = () => setNotification(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const getSessionData = () => trackingRef.current;

  // --- Timer Otimizado ---
  useEffect(() => {
    let intervalId: any;

    intervalId = setInterval(() => {
      // 1. Atualiza Refs (Sem re-render)
      trackingRef.current.totalTime += 1;
      trackingRef.current.sectionTimes[currentSection] = (trackingRef.current.sectionTimes[currentSection] || 0) + 1;

      // 2. Verificação Silenciosa
      // Só dispara atualização de estado (completeQuest) se a condição for atingida
      if (trackingRef.current.totalTime === 60) {
        completeQuest('time_spent');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentSection]); // Reinicia intervalo se a seção mudar para garantir a captura correta

  // --- Intersection Observer (Rastreamento de Seção) ---
  useEffect(() => {
    const sections = ['hero', 'projects', 'services', 'skills', 'about', 'education', 'lab', 'writing', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Dispara quando 30% da seção está visível
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <GamificationContext.Provider value={{
      xp,
      level,
      rank,
      quests,
      completeQuest,
      unlockAchievement,
      notification,
      hideNotification,
      currentSection,
      isModalOpen,
      openModal,
      closeModal,
      isHackerMode,
      getSessionData
    }}>
      {children}
    </GamificationContext.Provider>
  );
};
