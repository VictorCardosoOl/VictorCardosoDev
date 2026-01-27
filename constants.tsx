
import { Monitor, Code, Layout, Database, Smartphone, Globe, Search, Rocket, Settings, MessageSquare, PenTool, CheckCircle, Users, BarChart } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Obras', href: '#projects' },
  { name: 'Expertise', href: '#services' },
  { name: 'Perfil', href: '#about' },
  { name: 'Lab', href: '#lab' },
  { name: 'Contato', href: '#contact' },
];

export const SERVICES = [
  {
    title: 'Engenharia de Software',
    description: 'Desenvolvimento de aplicações web robustas e escaláveis. Transformo processos manuais e planilhas em software de gestão eficiente, com foco total em estabilidade e segurança.',
    icon: Database,
    techStack: ['React / Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'AWS'],
    tags: ['SaaS', 'Automação', 'Gestão']
  },
  {
    title: 'Análise de Sistemas',
    description: 'Mapeamento de regras de negócio complexas e integração sistêmica. Atuo na tradução de necessidades corporativas em requisitos técnicos precisos.',
    icon: Layout,
    techStack: ['UML', 'SQL', 'Business Intelligence', 'Process Mapping'],
    tags: ['Análise', 'Arquitetura', 'Dados']
  },
  {
    title: 'Treinamento & Suporte',
    description: 'Capacitação de equipes e stakeholders. Criação de documentação técnica (KB) e gestão de conhecimento para garantir a sustentabilidade do software.',
    icon: Users,
    techStack: ['Onboarding', 'Documentação Técnica', 'Gestão de Crise', 'SLA Management'],
    tags: ['Educação', 'Suporte N3', 'Liderança']
  }
];

export const PROCESS_STEPS = [
  {
    title: 'Imersão',
    description: 'Entendimento profundo das regras de negócio e dores operacionais.',
    icon: Search
  },
  {
    title: 'Estratégia',
    description: 'Definição de KPIs, SLAs e arquitetura da solução.',
    icon: BarChart
  },
  {
    title: 'Execução',
    description: 'Desenvolvimento e parametrização com foco em fidelidade contratual.',
    icon: Code
  },
  {
    title: 'Sustentação',
    description: 'Treinamento, monitoramento de performance e suporte contínuo.',
    icon: CheckCircle
  }
];

// Mantenho os projetos fictícios por enquanto, pois o CV foca em experiência corporativa.
// Você pode substituir isso por projetos reais do GitHub posteriormente.
export const PROJECTS = [
  {
    title: 'Lumina Architecture',
    category: 'SaaS / Plataforma',
    year: '2024',
    description: 'Sistema completo de gestão de ativos digitais para arquitetos, incluindo renderização na nuvem e vitrine de projetos.',
    tags: ['Next.js 14', 'AWS S3', 'Stripe Connect', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'O cliente enfrentava alta latência ao carregar portfólios 4K para leads internacionais.',
      solution: 'Reescrevi a arquitetura usando Next.js com Image Optimization na borda (Edge).',
      result: 'Tempo de carregamento (LCP) reduzido de 4.2s para 0.8s.'
    }
  },
  {
    title: 'Apex Finance Dashboard',
    category: 'Fintech / Dashboard',
    year: '2023',
    description: 'Painel de controle financeiro em tempo real para traders institucionais.',
    tags: ['WebSockets', 'D3.js', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A versão anterior sofria com "stale data" e travamentos.',
      solution: 'Implementei WebSockets para streaming de dados em tempo real.',
      result: 'Capacidade de processar 5x mais dados sem lag.'
    }
  },
  {
    title: 'Velvet E-commerce',
    category: 'Headless Commerce',
    year: '2023',
    description: 'Loja conceito para marca de luxo, focada em animações fluídas.',
    tags: ['Shopify Headless', 'Framer Motion', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A marca desejava uma experiência de "app nativo" na web.',
      solution: 'Desenvolvi um frontend Headless usando Next.js.',
      result: 'Aumento de 25% no ticket médio.'
    }
  }
];

export const SKILLS = [
  {
    title: 'Engenharia de Software',
    description: 'Análise estrutural de código e integração sistêmica. Foco em fidelidade contratual e regras de negócio.',
    icon: Monitor,
    items: ['Análise de Código', 'Integração Sistêmica', 'SQL / Banco de Dados', 'Web Development', 'Hardware & Redes']
  },
  {
    title: 'Gestão & Liderança',
    description: 'Coordenação de equipes multidisciplinares e gestão de KPIs para otimização de processos.',
    icon: Users,
    techStack: [],
    items: ['Gestão de Equipes', 'PDIs & Feedbacks', 'Análise de Performance', 'Mapeamento de Processos', 'Gestão de Crises']
  },
  {
    title: 'Suporte & Treinamento',
    description: 'Educação corporativa e suporte técnico especializado (N1/N2/N3) para grandes contas.',
    icon: MessageSquare,
    items: ['Educação Corporativa', 'Documentação Técnica (KB)', 'Suporte Remoto', 'Customer Success', 'Gestão de SLA']
  }
];

export const EDUCATION = [
  {
    period: 'Jan 2022 - Dez 2026',
    degree: 'Ciência da Computação (Bacharelado)',
    institution: 'Universidade Anhembi Morumbi',
    description: 'Foco em Engenharia de Software, Ciência de Dados e Algoritmos.'
  }
];

export const WORK_EXPERIENCE = [
  {
    company: "Wise System",
    role: "Supervisor de Operações",
    period: "Out 2025 - Presente", // Mantendo datas do CV
    location: "São Paulo, Brasil",
    description: [
      "Liderança de Equipes Multidisciplinares: Coordenação e desenvolvimento de talentos (Feedbacks, PDIs).",
      "Interface Estratégica: Elo tático entre diretoria e operação, traduzindo metas em planos de ação.",
      "Gestão de Performance: Monitoramento de KPIs/SLAs e otimização de fluxos para redução de custos."
    ]
  },
  {
    company: "Wise System",
    role: "Analista de Suporte N2",
    period: "Abr 2025 - Out 2025",
    location: "São Paulo, Brasil",
    description: [
      "Treinamento Corporativo: Capacitação técnica de clientes e stakeholders internos.",
      "Gestão do Conhecimento: Transferência eficaz de best practices e criação de KB."
    ]
  },
  {
    company: "Wise System",
    role: "Analista de Suporte N1",
    period: "Out 2024 - Abr 2025",
    location: "São Paulo, Brasil",
    description: [
      "Análise de Código e Integração: Revisão estrutural para inserção de regras de negócio.",
      "Implementação Sistêmica: Tradução de requisitos de clientes em soluções funcionais.",
      "Suporte Técnico Especializado: Atuação nos ecossistemas SIGO WEB e W3."
    ]
  },
  {
    company: "Wise System",
    role: "Estagiário",
    period: "Jul 2024 - Set 2024",
    location: "São Paulo, Brasil",
    description: [
      "Configuração e instalação do software SIGO W3.",
      "Resolução de problemas relacionados a erros de software, banco de dados e servidores.",
      "Gerenciamento de filas de atendimento e backlog."
    ]
  },
  {
    company: "InHouse Contact Center",
    role: "Back Office",
    period: "Fev 2022 - Jan 2024",
    location: "São Paulo, Brasil",
    description: [
      "Gestão administrativa e suporte operacional."
    ]
  },
  {
    company: "Alta Performance Gestão",
    role: "Auxiliar Contábil",
    period: "Set 2019 - Mar 2020",
    location: "São Paulo, Brasil",
    description: [
      "Auxílio nas rotinas contábeis e gestão empresarial."
    ]
  }
];

export const WRITING = [
  {
    title: "A importância da Documentação Técnica",
    category: "Processos",
    link: "#",
    date: "12 Mar, 2024",
    readTime: "5 min"
  },
  {
    title: "KPIs vs SLAs: Otimizando o Suporte",
    category: "Gestão",
    link: "#",
    date: "28 Fev, 2024",
    readTime: "7 min"
  },
  {
    title: "SQL para Análise de Negócios",
    category: "Dados",
    link: "#",
    date: "15 Jan, 2024",
    readTime: "4 min"
  }
];

export const CONTACT_INFO = {
  email: 'victorcardcunha@gmail.com',
  phone: '+55 (11) 97744-0146',
  location: 'São Paulo, SP - Brasil',
  whatsapp: 'https://wa.me/5511977440146',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/victorccunha' },
    { name: 'GitHub', url: '#' },
    { name: 'Instagram', url: '#' },
  ]
};
