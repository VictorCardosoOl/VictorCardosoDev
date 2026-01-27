import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight, Send, Check, AlertTriangle, Mail, Phone, Loader2 } from 'lucide-react';
import Button from './ui/Button';
import { Reveal } from './ui/Reveal';
import Magnetic from './ui/Magnetic';
import { useGamification } from './GamificationContext';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Access Gamification Data
  const { rank, level, quests, getSessionData } = useGamification();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const domainRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(formState.email)) {
        newErrors.email = 'Formato de email inválido';
        isValid = false;
      } else if (!domainRegex.test(formState.email)) {
        newErrors.email = 'Domínio de email inválido';
        isValid = false;
      }
    }

    if (!formState.message.trim()) {
      newErrors.message = 'A mensagem não pode estar vazia';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setStatus('loading');
    
    // Simulate complex backend processing delay
    try {
      // Get fresh data from ref without re-rendering the component every second
      const { totalTime, sectionTimes } = getSessionData();

      // Prepare rich payload
      const sortedSections = Object.entries(sectionTimes).sort(([, a], [, b]) => (b as number) - (a as number));
      const mostViewed = sortedSections[0] ? sortedSections[0][0] : 'N/A';

      const gamificationPayload = {
        rank: rank,
        level: level,
        sessionDurationSeconds: totalTime,
        formattedDuration: `${Math.floor(Number(totalTime) / 60)}m ${Number(totalTime) % 60}s`,
        mostViewedSection: mostViewed,
        sectionBreakdown: sectionTimes,
        completedQuests: quests.filter(q => q.completed).map(q => q.label)
      };

      console.group("🚀 Sending Lead to Backend...");
      console.log("User Data:", formState);
      console.log("Contextual Data (Gamification):", gamificationPayload);
      console.groupEnd();
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setStatus('success');
      setFormState({ name: '', email: '', company: '', message: '' });
      setErrors({});
      
      // Reset status after success message is shown
      setTimeout(() => setStatus('idle'), 6000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const InputGroup = ({ id, label, type = "text", placeholder, value, required = false }: any) => {
    const hasError = !!errors[id];
    
    return (
      <div className="relative group pb-6">
        <label 
          htmlFor={id} 
          className={`block text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${
            hasError ? 'text-red-600' : focusedField === id ? 'text-petrol-base' : 'text-petrol-base/40'
          }`}
        >
          {label} {required && '*'}
        </label>
        <div className="relative">
          <input 
            type={type} 
            id={id}
            value={value}
            onChange={(e) => {
              setFormState({...formState, [id]: e.target.value});
              if (hasError) {
                 setErrors(prev => {
                    const newErrs = {...prev};
                    delete newErrs[id];
                    return newErrs;
                 });
              }
            }}
            onFocus={() => setFocusedField(id)}
            onBlur={() => setFocusedField(null)}
            className={`w-full bg-transparent border-b-2 py-3 px-2 text-base placeholder-petrol-base/20 focus:outline-none transition-all duration-300 rounded-t-md ${
              hasError 
                ? 'border-red-600 bg-red-100 text-red-900 placeholder-red-300' 
                : 'border-petrol-base/10 text-petrol-base hover:bg-white focus:border-petrol-base'
            }`}
            placeholder={placeholder}
            disabled={status === 'loading'}
            style={{ fontSize: '16px' }} 
          />
          
          {/* Animated Error Border Override */}
          {!hasError && (
             <div 
               className={`absolute bottom-[-2px] left-0 h-[2px] bg-petrol-base transition-all duration-500 ease-out z-10 ${
                 focusedField === id ? 'w-full' : 'w-0'
               }`}
             />
          )}
        </div>
        
        {hasError && (
          <div className="absolute -bottom-0 left-0 flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-top-1 bg-red-100 px-2 py-1 rounded-br-md rounded-bl-md w-full">
             <AlertTriangle size={12} className="text-red-600 fill-red-100" strokeWidth={2.5} /> 
             <span className="text-[10px] font-bold uppercase tracking-wide text-red-600">
               {errors[id]}
             </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-16 md:py-20 bg-paper relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/40 skew-x-12 translate-x-32 z-0 hidden lg:block" />

      <div className="container relative z-10 mx-auto px-5 md:px-12 xl:px-20 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <Reveal width="100%" variant="translate">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-petrol-base tracking-tight leading-[0.95] md:leading-[0.9] mb-6 md:mb-8">
                Vamos criar <br /> <span className="text-petrol-base/30 italic">algo único.</span>
              </h2>
            </Reveal>

            <div className="space-y-6 md:space-y-8">
              <Reveal delay={100} variant="blur">
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                  <div className="group">
                     <span className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-2">
                       <Mail size={12} /> Email
                     </span>
                     <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg md:text-xl font-medium text-petrol-base hover:text-petrol-mid transition-colors">
                       {CONTACT_INFO.email}
                     </a>
                  </div>
                  <div>
                     <span className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-2">
                       <Phone size={12} /> Telefone
                     </span>
                     <p className="text-lg md:text-xl font-medium text-petrol-base">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={200} variant="translate">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 py-6 md:py-8 border-t border-petrol-base/10 border-b border-petrol-base/10">
                  <div>
                    <span className="block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-2 md:mb-3">O Estúdio</span>
                    <h4 className="text-base font-serif font-bold text-petrol-base mb-1">Estúdio Formosa</h4>
                    <p className="text-xs md:text-sm text-petrol-ink leading-relaxed font-light">
                      Vila Formosa, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                  <div>
                    <span className="block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-2 md:mb-3">Escritório</span>
                    <h4 className="text-base font-serif font-bold text-petrol-base mb-1">Escritório do Tatuapé</h4>
                    <p className="text-xs md:text-sm text-petrol-ink leading-relaxed font-light">
                      Tatuapé, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} variant="translate">
                 <div className="flex gap-4 md:gap-6 pt-2">
                    {CONTACT_INFO.socials.map((social, idx) => (
                      <Magnetic key={idx} strength={0.2}>
                        <a 
                          href={social.url}
                          className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-petrol-base/50 hover:text-petrol-base transition-colors flex items-center gap-1 group py-2"
                        >
                          {social.name}
                          <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </Magnetic>
                    ))}
                 </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6">
            <Reveal delay={200} width="100%" variant="scale">
              <div className="glass-panel p-6 md:p-10 rounded-[2rem] relative overflow-hidden bg-white/50 border border-white/20 min-h-[500px] flex flex-col justify-center">
                 {status === 'success' && (
                    <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500 p-8">
                       <div className="w-20 h-20 bg-green-50 text-green-700 rounded-full flex items-center justify-center mb-6 shadow-lg border border-green-100">
                         <Check size={40} />
                       </div>
                       <h3 className="text-3xl font-serif text-petrol-base mb-3">Recebido!</h3>
                       <p className="text-petrol-ink text-base max-w-xs mx-auto mb-8">
                         Sua mensagem foi enviada para o meu sistema pessoal. Responderei em até 24h.
                       </p>
                       <button 
                         onClick={() => setStatus('idle')} 
                         className="px-6 py-3 bg-paper text-petrol-base rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors"
                       >
                         Enviar outra
                       </button>
                    </div>
                 )}

                 <form onSubmit={handleSubmit} noValidate className={`space-y-6 md:space-y-8 relative z-10 transition-opacity duration-300 ${status === 'success' ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                       <InputGroup id="name" label="Nome" placeholder="Seu nome" value={formState.name} required />
                       <InputGroup id="email" label="Email" type="email" placeholder="email@exemplo.com" value={formState.email} required />
                    </div>

                    <InputGroup id="company" label="Empresa (Opcional)" placeholder="Nome da organização" value={formState.company} />

                    <div className="relative group pb-6">
                      <label 
                        htmlFor="message" 
                        className={`block text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${
                          errors.message ? 'text-red-600' : focusedField === 'message' ? 'text-petrol-base' : 'text-petrol-base/40'
                        }`}
                      >
                        Mensagem *
                      </label>
                      <div className="relative">
                        <textarea 
                          id="message"
                          rows={3}
                          value={formState.message}
                          onChange={(e) => {
                             setFormState({...formState, message: e.target.value});
                             if (errors.message) setErrors(prev => { const n = {...prev}; delete n.message; return n; });
                          }}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-transparent border-b-2 py-3 px-2 text-base placeholder-petrol-base/20 focus:outline-none transition-all duration-300 resize-none rounded-t-md ${
                             errors.message 
                             ? 'border-red-600 bg-red-100 text-red-900 placeholder-red-300' 
                             : 'border-petrol-base/10 text-petrol-base hover:bg-white focus:border-petrol-base'
                          }`}
                          placeholder="Fale um pouco sobre seu projeto..."
                          disabled={status === 'loading'}
                          style={{ fontSize: '16px' }} 
                        />
                        {!errors.message && (
                            <div className={`absolute bottom-[-2px] left-0 h-[2px] bg-petrol-base transition-all duration-500 ease-out z-10 ${focusedField === 'message' ? 'w-full' : 'w-0'}`} />
                        )}
                      </div>
                      
                      {errors.message && (
                        <div className="absolute -bottom-0 left-0 flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-top-1 bg-red-100 px-2 py-1 rounded-br-md rounded-bl-md w-full">
                           <AlertTriangle size={12} className="text-red-600 fill-red-100" strokeWidth={2.5} /> 
                           <span className="text-[10px] font-bold uppercase tracking-wide text-red-600">
                             {errors.message}
                           </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 md:pt-4 flex justify-end">
                       <Magnetic strength={0.4}>
                          <Button 
                            type="submit" 
                            variant="primary" 
                            size="md" 
                            className="w-full md:w-auto justify-center bg-petrol-base text-white hover:bg-petrol-mid shadow-lg"
                            disabled={status === 'loading'}
                          >
                            {status === 'loading' ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" /> Enviando
                                </span>
                            ) : 'Enviar Agora'}
                            {status !== 'loading' && <Send size={14} className="ml-2" />}
                          </Button>
                       </Magnetic>
                    </div>
                 </form>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;