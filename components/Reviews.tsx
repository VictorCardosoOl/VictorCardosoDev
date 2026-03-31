import React from 'react';
import { Reveal } from './ui/Reveal';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const REVIEWS = [
  {
    name: "Carlos Mendes",
    role: "Diretor Comercial",
    date: "há 2 semanas",
    content: "O Victor tem um diferencial raro: ele entende de contratos e contabilidade. Isso facilitou muito a criação do nosso painel financeiro, pois ele já sabia as regras de negócio antes mesmo de codar.",
    avatar: "CM",
    rating: 5
  },
  {
    name: "Ana Sophia",
    role: "Product Owner",
    date: "há 1 mês",
    content: "Excelente soft skill. Muito comunicativo e empático com as dores do usuário. O background administrativo dele trouxe uma visão analítica que salvou o projeto de vários erros lógicos.",
    avatar: "AS",
    rating: 5
  },
  {
    name: "Grupo Inova",
    role: "Empresa Parceira",
    date: "há 3 meses",
    content: "Profissional resolutivo. Precisávamos de alguém que entendesse de abertura de empresas para automatizar um fluxo e o Victor matou no peito. Design impecável.",
    avatar: "GI",
    rating: 5
  }
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.769 -21.864 51.959 -21.864 51.129 C -21.864 50.299 -21.734 49.489 -21.484 48.729 L -21.484 45.639 L -25.464 45.639 C -26.284 47.269 -26.754 49.129 -26.754 51.129 C -26.754 53.129 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" />
      <path fill="#EA4335" d="M -14.754 43.749 C -12.984 43.749 -11.404 44.369 -10.154 45.569 L -6.744 42.159 C -8.804 40.239 -11.514 39.009 -14.754 39.009 C -19.444 39.009 -23.494 41.709 -25.464 45.639 L -21.484 48.729 C -20.534 45.879 -17.884 43.749 -14.754 43.749 Z" />
    </g>
  </svg>
);

const Reviews: React.FC = () => {
  return (
    <section className="py-24 bg-paper relative z-10 border-t border-petrol-base/5 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <Reveal>
                <div className="flex items-center gap-2 mb-2">
                    <GoogleIcon />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/60">Avaliações Verificadas</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-petrol-base">O que dizem os parceiros</h2>
            </Reveal>
            
            <Reveal delay={100}>
                <div className="flex items-center gap-4 text-petrol-base">
                    <div className="flex flex-col items-end">
                        <div className="flex text-[#F4B400]">
                            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <span className="text-xs font-mono text-petrol-base/50 mt-1">5.0 de 5 estrelas</span>
                    </div>
                </div>
            </Reveal>
        </div>

        {/* Grid of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
                <Reveal key={i} delay={i * 100} width="100%" className="h-full">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-petrol-base/5 shadow-sm h-full flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-petrol-base/10 text-petrol-base flex items-center justify-center font-bold text-sm">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-petrol-base">{review.name}</h4>
                                        <span className="text-[10px] uppercase tracking-wide text-petrol-base/40 block">{review.role}</span>
                                    </div>
                                </div>
                                <Quote size={20} className="text-petrol-base/10 group-hover:text-petrol-base/20 transition-colors" />
                            </div>

                            <div className="flex text-[#F4B400] mb-3 gap-0.5">
                                {[1,2,3,4,5].map(star => <Star key={star} size={12} fill="currentColor" />)}
                            </div>

                            <p className="text-sm text-petrol-ink/80 leading-relaxed font-light italic">
                                "{review.content}"
                            </p>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-petrol-base/5 flex justify-between items-center">
                            <span className="text-[9px] font-mono text-petrol-base/30">{review.date}</span>
                            <div className="w-4 h-4 opacity-50 grayscale group-hover:grayscale-0 transition-all">
                                <GoogleIcon />
                            </div>
                        </div>
                    </motion.div>
                </Reveal>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
