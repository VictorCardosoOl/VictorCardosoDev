
import React from 'react';
import { Play, Terminal } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion } from 'motion/react';

/**
 * COMPONENTE: Lab
 * ---------------
 * Apresenta experimentos de WebGL/Creative Coding.
 * 
 * PERFORMANCE UPDATE:
 * - Imagens agora são coloridas por padrão (sem grayscale).
 * - Removido overlay de scanlines (SVG pattern) que causava lag no scroll.
 * - Otimização de will-change para evitar repaints.
 */

interface Experiment {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
  colSpan?: string; 
}

const EXPERIMENTS: Experiment[] = [
    {
        id: 1,
        title: "Liquid Metal",
        category: "WebGL Shader",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io",
        colSpan: "md:col-span-1"
    },
    {
        id: 2,
        title: "Kinetics Type",
        category: "Interactive",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=800",
        link: "https://codepen.io",
        colSpan: "md:col-span-2"
    },
    {
        id: 3,
        title: "Raymarching",
        category: "Creative Coding",
        image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=800&h=800",
        link: "https://codepen.io",
        colSpan: "md:col-span-2"
    },
    {
        id: 4,
        title: "Generative Grid",
        category: "Algorithms",
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io",
        colSpan: "md:col-span-1" 
    },
    {
        id: 5,
        title: "Noise Fields",
        category: "Data Viz",
        image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io",
        colSpan: "md:col-span-3"
    }
];

const Lab: React.FC = () => {
  return (
    <section id="lab" className="py-4 md:py-8 relative z-20 overflow-hidden bg-white">
      
      <Reveal width="100%" variant="translate">
        <div 
          className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16"
        >
                
                {/* Header Style Minimalista */}
                <div className="flex justify-between items-end border-b border-slate-200 pb-4 mb-8">
                <Reveal>
                    <div className="flex flex-col"> 
                    <div className="flex items-center gap-2 mb-4">
                        <Terminal size={14} className="text-slate-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Arquivo.02 / R&D</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-slate-900">
                        Laboratório
                    </h2>
                    </div>
                </Reveal>
                <Reveal delay={100}>
                    <div className="hidden md:block text-right">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">Status: Online</span>
                        <span className="text-xs font-mono text-slate-500">Compilado: {new Date().toLocaleDateString()}</span>
                    </div>
                </Reveal>
                </div>

                {/* MOSAIC GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {EXPERIMENTS.map((exp, index) => (
                        <div 
                        key={exp.id} 
                        className={`relative group h-[300px] md:h-[350px] overflow-hidden rounded-sm bg-slate-50 border border-slate-200 ${exp.colSpan || 'md:col-span-1'}`}
                        >
                            <Reveal delay={index * 50} width="100%" className="h-full">
                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative overflow-hidden">
                                    
                                    {/* Image: FULL COLOR */}
                                    <div className="absolute inset-0 z-0">
                                        <motion.img 
                                            src={exp.image} 
                                            alt={exp.title} 
                                            loading="lazy"
                                            initial={{ scale: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                            className="w-full h-full object-cover transition-transform will-change-transform"
                                        />
                                    </div>

                                    {/* Hover Overlay - Escurece levemente para dar destaque ao texto */}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Content UI */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 glass-fade">
                                        {/* Top: ID & Icon */}
                                        <div className="flex justify-between items-start">
                                            <span className="text-xs font-mono px-2 py-1 rounded-sm text-white bg-slate-900/60 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                EXP_0{exp.id}
                                            </span>
                                            <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                                                <Play size={14} fill="currentColor" />
                                            </div>
                                        </div>

                                        {/* Bottom: Info */}
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {exp.category}
                                            </span>
                                            <h3 className="text-3xl font-serif font-light text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                                {exp.title}
                                            </h3>
                                        </div>
                                    </div>

                                </a>
                            </Reveal>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-mono text-slate-400 uppercase tracking-widest gap-4">
                  <span>Total: {EXPERIMENTS.length} unidades</span>
                  <span>Code Sandbox / WebGL / Canvas</span>
                </div>

        </div>
      </Reveal>
    </section>
  );
};

export default Lab;
