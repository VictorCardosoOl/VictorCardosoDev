
import React from 'react';
import { Play, Terminal } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';

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
    <section id="lab" className="py-12 bg-paper relative z-20">
      
      <Reveal width="100%" variant="translate">
        <div 
          className="w-full bg-petrol-base text-paper py-24 relative overflow-hidden rounded-t-[2rem] md:rounded-[3rem]"
        >
            <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
                
                {/* Header Control Panel Style */}
                <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-12">
                <Reveal>
                    <div className="flex flex-col"> 
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal size={14} className="text-petrol-electric" />
                        <span className="text-micro text-white/40">Arquivo.02 / R&D</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
                        Laboratório
                    </h2>
                    </div>
                </Reveal>
                <Reveal delay={100}>
                    <div className="hidden md:block text-right">
                        <span className="text-micro text-petrol-electric block">STATUS: ONLINE</span>
                        <span className="text-[10px] font-mono text-white/40">Compilado: {new Date().toLocaleDateString()}</span>
                    </div>
                </Reveal>
                </div>

                {/* MOSAIC GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border border-white/10 p-1">
                    {EXPERIMENTS.map((exp, index) => (
                        <div 
                        key={exp.id} 
                        className={`relative group h-[300px] md:h-[350px] overflow-hidden bg-petrol-mid ${exp.colSpan || 'md:col-span-1'}`}
                        >
                            <Reveal delay={index * 50} width="100%" className="h-full">
                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative overflow-hidden">
                                    
                                    {/* Image: FULL COLOR (Sem Grayscale) */}
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
                                        {/* Removido o overlay de scanlines para melhorar performance de scroll */}
                                    </div>

                                    {/* Hover Overlay - Escurece levemente para dar destaque ao texto */}
                                    <div className="absolute inset-0 bg-petrol-base/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Content UI */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                        {/* Top: ID & Icon */}
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-mono border border-white/20 px-1.5 py-0.5 rounded text-white bg-black/20 backdrop-blur-sm">
                                                EXP_0{exp.id}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-white text-petrol-base flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                                <Play size={12} fill="currentColor" />
                                            </div>
                                        </div>

                                        {/* Bottom: Info */}
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-petrol-electric mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                                {exp.category}
                                            </span>
                                            <h3 className="text-2xl font-serif text-white">
                                                {exp.title}
                                            </h3>
                                        </div>
                                    </div>

                                </a>
                            </Reveal>
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center text-[9px] font-mono text-white/30 uppercase tracking-widest">
                <span>Total: {EXPERIMENTS.length} unidades</span>
                <span>Code Sandbox / WebGL / Canvas</span>
                </div>

            </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Lab;
