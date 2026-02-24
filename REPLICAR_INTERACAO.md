# Prompt Mestre para Replicação de Interação (High-Fidelity)

Este documento contém o prompt exato e os trechos de código necessários para replicar a interação "Project Reveal" do portfólio. Esta interação consiste em uma transição de elementos compartilhados (`layoutId`) combinada com um modal que possui scroll suave isolado (Lenis) e animações de física (Spring).

---

## O Prompt para a IA

**Copie e cole o texto abaixo:**

---

**Contexto:** Estou desenvolvendo um portfólio React de alta fidelidade e preciso replicar uma interação específica de "Master-Detail" que já existe na seção de Projetos.
**Objetivo:** Criar um novo componente de Lista/Grid (ex: para Artigos, Serviços ou Galeria) onde o clique em um item expande um Modal de tela cheia com transição contínua.

**Requisitos Técnicos Estritos:**

1.  **Tecnologias:**
    *   React 18+
    *   Framer Motion (para `layoutId`, `AnimatePresence`, `useScroll`, `useSpring`).
    *   Lenis (para scroll suave isolado dentro do modal).
    *   Tailwind CSS.

2.  **Comportamento do Card (Lista):**
    *   Deve usar `useScroll` relativo ao container do card para animar propriedades conforme o item entra na viewport.
    *   **Animação de Scroll:** Aplicar `useSpring` no progresso do scroll.
    *   **Transformações:**
        *   `clipPath`: De `inset(15% 10% 15% 10% round 4px)` para `inset(0% ...)` (efeito de expansão).
        *   `scale`: De `0.95` para `1.05`.
        *   `y` (Parallax da imagem interna): De `-30%` para `30%`.
    *   **Interação:** Hover deve revelar um botão (seta) com `scale` e `opacity`.
    *   **Shared Element:** A imagem deve ter `layoutId="image-{id}"` e o título `layoutId="title-{id}"`.

3.  **Comportamento do Modal (Container):**
    *   Deve usar `createPortal` para renderizar no `document.body`.
    *   **Entrada:** Animação tipo `spring` (`damping: 30, stiffness: 300`) vindo de baixo (`y: 100%` -> `0%` ou `2%`).
    *   **Saída:** Animação tipo `tween` (`ease: "easeInOut", duration: 0.4`) para evitar "travamentos" no final.
    *   **Scroll:** Deve instanciar um novo `Lenis` **apenas para o container do modal** (`wrapper` e `content`), travando o scroll da página principal.
    *   **Mobile:** Deve suportar gesto de arrastar para fechar (`drag="y"`).

4.  **Conteúdo do Modal (Detail):**
    *   Hero Section deve conter a imagem com o mesmo `layoutId="image-{id}"` para fechar a transição mágica.
    *   Título com o mesmo `layoutId="title-{id}"`.
    *   Conteúdo subsequente deve usar animação de entrada escalonada (Reveal).

**Por favor, implemente seguindo EXATAMENTE os padrões de código abaixo:**

---

## Trechos de Código Fonte (Source of Truth)

### 1. O Card (Com Física de Scroll e ClipPath)

```tsx
// Padrão para o Card da Lista
const CardItem = ({ item, onClick }) => {
  const containerRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  
  // 1. Detectar Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"]
  });

  // 2. Suavizar Física
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20, stiffness: 100, mass: 0.5
  });
  
  // 3. Transformações Visuais
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(15% 10% 15% 10% round 4px)", "inset(0% 0% 0% 0% round 0px)"]
  );
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  const yParallax = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-30%", "30%"]);

  return (
    <div ref={containerRef} onClick={onClick} className="group cursor-pointer py-12">
      {/* Wrapper com ClipPath Animado */}
      <motion.div style={{ clipPath: isMobile ? undefined : clipPath }} className="relative aspect-video overflow-hidden">
        
        {/* Imagem com Parallax e LayoutId */}
        <motion.div className="w-full h-full relative overflow-hidden">
           <motion.img 
              layoutId={`image-${item.id}`}
              src={item.image} 
              style={{ scale: 1.35, y: yParallax }} 
              className="w-full h-full object-cover"
           />
        </motion.div>

        {/* Botão Hover */}
        <div className="absolute center-absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
           <ArrowUpRight />
        </div>
      </motion.div>

      {/* Título com LayoutId */}
      <motion.h3 layoutId={`title-${item.id}`} className="text-4xl font-serif mt-6">
         {item.title}
      </motion.h3>
    </div>
  );
};
```

### 2. O Modal (Com Lenis Isolado e Portal)

```tsx
// Padrão para o Modal Wrapper
const ContentModal = ({ isOpen, onClose, children, layoutId }) => {
  const modalContainerRef = useRef(null);
  const modalContentRef = useRef(null);
  const scopedLenisRef = useRef(null);

  // Lógica de Scroll Isolado (Lenis)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Trava body
      
      // Inicia Lenis apenas no Modal após mount
      setTimeout(() => {
        if (modalContainerRef.current && modalContentRef.current) {
            const scopedLenis = new Lenis({
                wrapper: modalContainerRef.current,
                content: modalContentRef.current,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease Out Quart
                orientation: 'vertical',
                touchMultiplier: 2,
            });
            scopedLenisRef.current = scopedLenis;
            
            function raf(time) {
                scopedLenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
      }, 300); // Delay para permitir animação de entrada
    } else {
      document.body.style.overflow = '';
      scopedLenisRef.current?.destroy();
    }
    return () => {
       document.body.style.overflow = '';
       scopedLenisRef.current?.destroy();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div onClick={onClose} className="fixed inset-0 bg-black/90 z-[9998]" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
          
          <motion.div
            layoutId={layoutId ? `modal-container-${layoutId}` : undefined}
            initial={{ y: "100%" }}
            animate={{ y: "2%", transition: { type: "spring", damping: 30, stiffness: 300 } }}
            exit={{ y: "100%", transition: { duration: 0.4, ease: "easeInOut" } }} // Tween na saída
            className="fixed inset-0 z-[9999] bg-[#F2F4F6] rounded-t-[2rem] h-[98vh]"
          >
            {/* Container de Scroll para o Lenis */}
            <div ref={modalContainerRef} className="h-full w-full overflow-y-auto">
               <div ref={modalContentRef}>
                  {children}
               </div>
            </div>
            
            {/* Botão Fechar Flutuante */}
            <button onClick={onClose} className="absolute top-8 right-8 z-50">
               <X />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
```
