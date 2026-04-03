# REFERENCES — Design System: shchebet.design
> Engenharia Reversa | Autor: Victor Cardoso | Data: 2026-04-02
> Fonte analisada: https://www.shchebet.design/

---

## 1. IDENTIDADE CROMÁTICA

O site utiliza um esquema de alto contraste com base **bicromatica (off-white + charcoal)**, típico de portfólios editoriais premium. A ausência de gradientes e o uso de superfícies sólidas reforçam a identidade minimalista.

### Paleta Completa

| Token           | HEX       | Uso Principal                                  |
|----------------|-----------|------------------------------------------------|
| `--bg-primary`  | `#FCFCFC` | Background das seções de texto/manifesto       |
| `--bg-dark`     | `#161719` | Hero section (metade escura), blocos de destaque |
| `--text-primary`| `#161719` | Texto sobre fundo claro                        |
| `--text-inverse`| `#FCFCFC` | Texto sobre fundo escuro                       |
| `--text-muted`  | `#747474` | Datas, labels secundárias, captions            |
| `--accent`      | `#FF008C` | Acento vibrante (hover states, seleções)       |

### CSS Variables

```css
:root {
  /* === CORES === */
  --color-bg-primary:    #fcfcfc;
  --color-bg-dark:       #161719;
  --color-text-primary:  #161719;
  --color-text-inverse:  #fcfcfc;
  --color-text-muted:    #747474;
  --color-accent:        #ff008c;

  /* Derivadas / Utilitárias */
  --color-surface:       #f0f0f0; /* Superfícies interativas / hover sobre fundo claro */
  --color-border:        rgba(22, 23, 25, 0.12); /* Bordas suaves */
}
```

**Decisão de Design:** A divisão 50/50 da Hero em dark/light cria um contraste dramático sem o uso de imagens ou gradientes. A cor de acento `#FF008C` aparece de forma esparsa, maximizando seu impacto.

---

## 2. ARQUITETURA TIPOGRÁFICA

Sistema editorial de alto impacto. Destaca-se pelo `letter-spacing` fortemente negativo (`-0.04em`), que dá compressão e peso às fontes grandes.

### Famílias Tipográficas

| Família          | Classificação | Uso                                         |
|-----------------|---------------|---------------------------------------------|
| **Inter**        | Sans-serif    | Interface geral: body, labels, UI           |
| **Inter Display**| Sans-serif    | Headings grandes (otimizada para large sizes)|
| **Kobzar KS**    | Serif         | Títulos estilizados especiais (ex: "WHAT TO EXPECT") |

### Escala Tipográfica

```css
/* === TIPOGRAFIA === */
:root {
  --font-sans:    'Inter', sans-serif;
  --font-display: 'Inter Display', sans-serif;
  --font-serif:   'Kobzar KS', serif;

  /* Escala de Tamanhos */
  --text-h1:      72px;   /* Hero principal                    */
  --text-h2:      96px;   /* Headings de seção (gigantes)      */
  --text-h3:      32px;   /* Subtítulos de bloco               */
  --text-body-lg: 24px;   /* Parágrafos em destaque / manifesto*/
  --text-body:    16px;   /* Corpo padrão                      */
  --text-caption: 13px;   /* Labels, datas, metadados          */

  /* Pesos */
  --weight-regular: 400;
  --weight-bold:    700;

  /* Letter-spacing (assinatura do sistema) */
  --tracking-tight: -0.04em; /* Usado em TODOS os headings grandes */
  --tracking-normal: 0em;

  /* Line-heights */
  --leading-none:   1;     /* H2 gigantes: 96px/96px         */
  --leading-tight:  1.1;   /* H1: 72px → ~79px               */
  --leading-body:   1.5;   /* Body padrão                    */
}
```

### Hierarquia com Computed Styles

```css
h1 {
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;            /* ~79px */
  letter-spacing: -0.04em;     /* -2.88px */
}

h2 {
  font-family: var(--font-display);
  font-size: 96px;
  font-weight: 700;
  line-height: 1;              /* 96px */
  letter-spacing: -0.04em;     /* -3.84px */
}

h3 {
  font-family: var(--font-sans);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;            /* ~44.8px */
  letter-spacing: -0.04em;     /* -1.28px */
}

.body-large {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;            /* 36px */
  letter-spacing: -0.04em;
}

body, p {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;            /* 24px */
  letter-spacing: 0;
}

.caption, .label {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.02em;     /* Ligeiramente expandido para legibilidade */
  text-transform: uppercase;
}
```

**Decisão de Design:** O `letter-spacing: -0.04em` nos headings é a **assinatura tipográfica** do sistema. Ele cria a sensação de texto editorial de revista de moda ou tech. Nunca aplicar em fontes abaixo de 20px.

---

## 3. SISTEMA DE ESPAÇAMENTO E GRID

### Escala de Espaçamento (Base 8px)

```css
:root {
  --space-1:   4px;   /* micro-gaps, separadores internos    */
  --space-2:   8px;   /* gaps entre ícone e label            */
  --space-3:   16px;  /* padding interno de componentes      */
  --space-4:   24px;  /* gap entre cards na lista            */
  --space-5:   32px;  /* padding lateral em mobile           */
  --space-6:   48px;  /* espaçamento entre grupos            */
  --space-7:   64px;  /* padding lateral em desktop          */
  --space-8:   96px;  /* espaçamento entre blocos de seção   */
  --space-9:  120px;  /* margin entre seções major           */
  --space-10: 200px;  /* respiro máximo entre blocos hero    */
}
```

### Grid e Container

```css
/* Container padrão */
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding-inline: var(--space-7); /* 64px */
}

/* Hero: Split-screen 50/50 */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* Grid de Projetos */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;   /* Lista única coluna com cards grandes */
  gap: var(--space-4);           /* 24px */
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding-inline: var(--space-5); /* 32px */
  }
  .hero {
    grid-template-columns: 1fr;
  }
}
```

**Decisão de Design:** O layout é intencionalmente simples — uma coluna com cards largos — para deixar as imagens dos projetos "respirarem". A hero divide a viewport ao meio criando tensão visual sem complexidade.

---

## 4. BIBLIOTECA DE COMPONENTES

### 4.1 — Navegação (Header)

```css
/* Nav lateral/topo — sticky, minimalista */
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-7);  /* 24px 64px */
  z-index: 100;
  /* Sem background (transparente sobre a hero bicolor) */
  background: transparent;
}

.nav-link {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: inherit;              /* Inverte automaticamente com o fundo */
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 0.5;
}
```

### 4.2 — Hero Section

```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.hero__dark {
  background-color: var(--color-bg-dark);
  display: flex;
  align-items: flex-end;
  padding: var(--space-7);
}

.hero__light {
  background-color: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-7);
}

.hero__title {
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
}
```

### 4.3 — Cards de Projeto

```css
.project-card {
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: 20px;                 /* --radius-lg */
  text-decoration: none;
  color: inherit;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-card:hover {
  transform: scale(1.015);            /* Zoom sutil no hover */
}

.project-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  border-radius: 20px;
}

.project-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: var(--space-3);         /* 16px */
}

.project-card__title {
  font-size: var(--text-h3);           /* 32px */
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-tight);
}

.project-card__date {
  font-size: var(--text-caption);
  color: var(--color-text-muted);
  text-transform: uppercase;
}
```

### 4.4 — Botões

```css
/* Botão padrão: Text-only com borda */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);    /* 16px 24px */
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid currentColor;
  border-radius: 2px;                         /* --radius-sm: quase quadrado */
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.btn:hover {
  background: var(--color-text-primary);
  color: var(--color-text-inverse);
}

/* Variação: sem borda (text-link button) */
.btn--ghost {
  border: none;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### 4.5 — Manifesto / Texto com Scroll-reveal

```css
/* Efeito: texto ganha cor/contraste conforme o scroll avança pela linha */
.manifesto-text {
  font-size: var(--text-body-lg);       /* 24px */
  font-weight: var(--weight-bold);
  line-height: var(--leading-body);
  color: var(--color-text-muted);      /* Começa apagado */
  transition: color 0.1s ease;
}

.manifesto-text.is-active {
  color: var(--color-text-primary);    /* Ativa com o scroll */
}
```

---

## 5. ESTÉTICA DE ASSETS E EFEITOS

### Border Radius

```css
:root {
  --radius-none: 0px;
  --radius-sm:   2px;    /* Botões, tags — quase reto, assertivo */
  --radius-lg:   20px;   /* Cards de projeto, imagens — suave/moderno */
}
```

### Sombras

O sistema **não utiliza box-shadow**. A profundidade é criada exclusivamente por contraste cromático e sobreposição de camadas.

```css
/* Confirmar: sem sombras no design */
--shadow-none: none;
```

### Animações e Transições

```css
:root {
  --ease-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* Ease out suave */
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
}

/* Padrão de entrada (page/section load) */
.animate-in {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--duration-slow) var(--ease-standard),
    transform var(--duration-slow) var(--ease-standard);
}

.animate-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Iconografia

Não foram identificados ícones standalone significativos. O design utiliza **setas tipográficas** (`→`, `↗`) e elementos de texto puro como UI controls, reforçando a identidade editorial minimalista.

---

## 6. DESIGN TOKENS — JSON SPEC COMPLETO

```json
{
  "designSystem": {
    "name": "shchebet.design — Reverse Engineered",
    "version": "1.0.0",
    "tokens": {
      "color": {
        "bgPrimary":    "#fcfcfc",
        "bgDark":       "#161719",
        "textPrimary":  "#161719",
        "textInverse":  "#fcfcfc",
        "textMuted":    "#747474",
        "accent":       "#ff008c",
        "border":       "rgba(22, 23, 25, 0.12)"
      },
      "typography": {
        "fontSans":    "Inter, sans-serif",
        "fontDisplay": "Inter Display, sans-serif",
        "fontSerif":   "Kobzar KS, serif",
        "scale": {
          "h1":      { "size": "72px",  "weight": 700, "lineHeight": 1.1,  "letterSpacing": "-0.04em" },
          "h2":      { "size": "96px",  "weight": 700, "lineHeight": 1,    "letterSpacing": "-0.04em" },
          "h3":      { "size": "32px",  "weight": 700, "lineHeight": 1.4,  "letterSpacing": "-0.04em" },
          "bodyLg":  { "size": "24px",  "weight": 700, "lineHeight": 1.5,  "letterSpacing": "-0.04em" },
          "body":    { "size": "16px",  "weight": 400, "lineHeight": 1.5,  "letterSpacing": "0" },
          "caption": { "size": "13px",  "weight": 400, "lineHeight": 1.4,  "letterSpacing": "0.08em" }
        }
      },
      "spacing": {
        "1": "4px",   "2": "8px",   "3": "16px",  "4": "24px",
        "5": "32px",  "6": "48px",  "7": "64px",  "8": "96px",
        "9": "120px", "10": "200px"
      },
      "borderRadius": {
        "sm":   "2px",
        "lg":   "20px"
      },
      "animation": {
        "easeStandard": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "durationFast": "150ms",
        "durationBase": "250ms",
        "durationSlow": "400ms"
      },
      "layout": {
        "containerMaxWidth": "1440px",
        "containerPaddingDesktop": "64px",
        "containerPaddingMobile": "32px",
        "heroGrid": "1fr 1fr"
      }
    }
  }
}
```

---

## 7. SÍNTESE — PRINCÍPIOS DE DESIGN IDENTIFICADOS

| Princípio              | Implementação                                                           |
|------------------------|-------------------------------------------------------------------------|
| **Minimalismo Radical** | Zero gradientes, zero sombras. Profundidade só por contraste de cor.   |
| **Tipografia como UI**  | Setas tipográficas substituem ícones. Texto **é** a interface.          |
| **Letter-spacing Editorial** | `-0.04em` em todos os headings confere identidade de marca forte. |
| **Contraste Dramático** | Hero 50/50 dark/light sem transição — corte limpo e assertivo.          |
| **Respiro Generoso**    | Seções com até 200px de margem. "Menos na tela = mais impacto."         |
| **Sem Ornamentos**      | Nenhum border-radius além de 20px (em cards). Botões são quase retos.  |
| **Motion com Propósito**| Animações apenas onde guiam a atenção (scroll-scrub no manifesto).      |

---

*Documento gerado por engenharia reversa via inspeção de DOM, computed styles e análise visual do site https://www.shchebet.design/*
