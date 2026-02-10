'use client'

import { create } from 'zustand'

// Tipos do formulário
export type DemandType = 'pf' | 'pj' | null
export type SiteSituation = 'no_site' | 'new_site' | 'improve_site' | null
export type ProjectType = 'simples' | 'institucional' | 'personalizado' | null
export type BudgetFit = 'yes' | 'evaluate' | 'no' | null
export type UrgencyType = 'urgent' | 'normal' | 'flexible' | null

// Lista de funcionalidades disponíveis
export const AVAILABLE_FEATURES = [
  {
    id: 'whatsapp',
    label: 'Botao WhatsApp direto',
    icon: '💬',
    explanation: 'Um botão flutuante que fica sempre visível na tela, permitindo que visitantes entrem em contato direto com você pelo WhatsApp. É a forma mais rápida de capturar leads quentes e fechar vendas.',
    benefits: [
      'Cliente entra em contato em 1 segundo, sem preencher formulário',
      'Conversas ficam salvas no seu WhatsApp para follow-up',
      'Funciona 24/7, mesmo quando você está offline',
      'Aumenta em até 40% a taxa de conversão vs formulários tradicionais'
    ]
  },
  {
    id: 'forms',
    label: 'Formulario de orcamento',
    icon: '📝',
    explanation: 'Formulários personalizados que capturam exatamente as informações que você precisa. Cada envio gera notificação imediata por email e pode integrar com seu CRM.',
    benefits: [
      'Leads organizados com todas as informações necessárias',
      'Notificação em tempo real quando alguém preenche',
      'Filtro de spam automático (só leads reais chegam)',
      'Integração com Google Sheets, email e WhatsApp'
    ]
  },
  {
    id: 'testimonials',
    label: 'Depoimentos de clientes',
    icon: '⭐',
    explanation: 'Seção dedicada para exibir avaliações e feedback de clientes satisfeitos. Inclui fotos, nomes, estrelas e depoimentos em texto. Fundamental para construir confiança e credibilidade.',
    benefits: [
      '90% dos consumidores leem avaliações antes de comprar',
      'Depoimentos aumentam conversão em até 34%',
      'Reduz objeções e dúvidas do cliente',
      'Melhora ranqueamento no Google (sinais de autoridade)'
    ]
  },
  {
    id: 'gallery',
    label: 'Galeria de fotos/portfolio',
    icon: '🖼️',
    explanation: 'Galerias profissionais de imagens com lightbox, zoom e navegação intuitiva. Ideal para mostrar seus produtos, projetos ou serviços com qualidade.',
    benefits: [
      'Imagem vende: 65% das pessoas são visuais',
      'Carregamento ultra-rápido (imagens otimizadas)',
      'Responsivo: funciona perfeito em celular',
      'Organização por categorias/projetos'
    ]
  },
  {
    id: 'maps',
    label: 'Mapa de localizacao',
    icon: '📍',
    explanation: 'Mapa interativo do Google Maps incorporado no site, mostrando sua localização exata. Clientes podem abrir rotas direto no celular deles.',
    benefits: [
      'Cliente não precisa sair do seu site para procurar endereço',
      'Botão "Como chegar" abre Google Maps com rota',
      'Aumenta visitas presenciais em negócios locais',
      'Melhora SEO local (Google entende onde você está)'
    ]
  },
  {
    id: 'blog',
    label: 'Blog pra atrair clientes',
    icon: '📰',
    explanation: 'Área de blog profissional para publicar artigos, dicas e conteúdo relevante. Cada post é uma porta de entrada para novos visitantes via Google.',
    benefits: [
      'Tráfego orgânico gratuito e contínuo do Google',
      'Posiciona você como autoridade no assunto',
      'Cada artigo é um "vendedor 24/7" trabalhando pra você',
      'Conteúdo gera confiança e educa o cliente'
    ]
  },
  {
    id: 'scheduling',
    label: 'Agendamento online',
    icon: '📅',
    explanation: 'Calendário integrado onde clientes escolhem data/hora disponível e agendam serviços. Você recebe notificação e o sistema envia lembretes automáticos.',
    benefits: [
      'Agenda preenchida sem você atender telefone',
      'Reduz "no-show" com lembretes automáticos',
      'Cliente agenda a qualquer hora (até 3h da manhã)',
      'Sincroniza com Google Calendar'
    ]
  },
  {
    id: 'ecommerce',
    label: 'Loja virtual/carrinho',
    icon: '🛒',
    explanation: 'E-commerce completo com catálogo de produtos, carrinho de compras, checkout e integração com meios de pagamento (Mercado Pago, PagSeguro, etc).',
    benefits: [
      'Venda enquanto dorme (loja nunca fecha)',
      'Cliente compra sem falar com ninguém',
      'Controle de estoque automático',
      'Relatórios de vendas e produtos mais vendidos'
    ]
  },
  {
    id: 'videos',
    label: 'Videos do YouTube/Vimeo',
    icon: '🎬',
    explanation: 'Integração com YouTube e Vimeo para exibir vídeos institucionais, tutoriais ou depoimentos. Vídeos aumentam o tempo no site e conversão.',
    benefits: [
      'Vídeos convertem 80% mais que texto',
      'Aumenta tempo no site (bom para SEO)',
      'Explica serviços complexos de forma simples',
      'Humaniza sua marca'
    ]
  },
  {
    id: 'chat',
    label: 'Chat ao vivo',
    icon: '💭',
    explanation: 'Widget de chat que permite conversar com visitantes em tempo real. Integra com ferramentas como Tawk.to, Zendesk ou Intercom.',
    benefits: [
      'Tire dúvidas na hora e feche vendas imediatas',
      'Cliente não precisa sair do site',
      'Reduz abandono de carrinho',
      'Histórico de conversas salvo'
    ]
  },
] as const

export interface FormData {
  // Dados pessoais
  nome: string
  email: string
  whatsapp: string
  demandType: DemandType
  empresa: string

  // Situação atual
  situation: SiteSituation
  currentSiteUrl: string

  // Projeto
  projectType: ProjectType
  urgency: UrgencyType
  desiredFeatures: string[]

  // Qualificação
  budgetFit: BudgetFit

  // Detalhes adicionais
  hasLogo: boolean | null
  logoFile: string | null       // Base64
  logoFileName: string | null
  brandColors: string[]         // Array de hex colors
  referenceSites: string[]      // URLs de referência
  additional: string

  // Legacy
  objective: string
}

// Chat message type
export interface ChatMessage {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}

// Steps do funil
export enum Step {
  INTRO = 0,
  NAME = 1,
  EMAIL = 2,
  WHATSAPP = 3,
  DEMAND_TYPE = 4,
  COMPANY_NAME = 5,  // condicional (só se PJ)
  SITUATION = 6,
  PROJECT_TYPE = 7,
  INVESTMENT = 8,    // prova social + preço
  BUDGET = 9,        // qualificação de budget
  ADDITIONAL = 10,
  SUCCESS = 11
}

interface AppState {
  // Navegação
  currentStep: Step

  // Dados do formulário
  formData: FormData

  // Loading states
  isSubmitting: boolean
  isComplete: boolean

  // Actions de navegação
  setStep: (step: Step) => void
  nextStep: () => void
  prevStep: () => void

  // Actions de dados
  setFormData: (data: Partial<FormData>) => void

  // Actions de estado
  setSubmitting: (value: boolean) => void
  setComplete: (value: boolean) => void
  reset: () => void

  // Helpers
  getNextStep: () => Step
  getPrevStep: () => Step
  shouldSkipCompanyName: () => boolean
}

const initialFormData: FormData = {
  // Dados pessoais
  nome: '',
  email: '',
  whatsapp: '',
  demandType: null,
  empresa: '',

  // Situação atual
  situation: null,
  currentSiteUrl: '',

  // Projeto
  projectType: null,
  urgency: null,
  desiredFeatures: [],

  // Qualificação
  budgetFit: null,

  // Detalhes adicionais
  hasLogo: null,
  logoFile: null,
  logoFileName: null,
  brandColors: [],
  referenceSites: [],
  additional: '',

  // Legacy
  objective: ''
}

const initialState = {
  currentStep: Step.INTRO,
  formData: initialFormData,
  isSubmitting: false,
  isComplete: false
}

export const useAppStore = create<AppState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  // Navegação inteligente - pula COMPANY_NAME se for PF
  nextStep: () => {
    const state = get()
    const nextStep = state.getNextStep()
    set({ currentStep: nextStep })
  },

  prevStep: () => {
    const state = get()
    const prevStep = state.getPrevStep()
    set({ currentStep: prevStep })
  },

  // Calcula próximo step considerando condicionais
  getNextStep: () => {
    const state = get()
    const current = state.currentStep

    // Se está em DEMAND_TYPE e é PF, pula COMPANY_NAME
    if (current === Step.DEMAND_TYPE && state.formData.demandType === 'pf') {
      return Step.SITUATION
    }

    // Caso normal: próximo step
    return Math.min(current + 1, Step.SUCCESS) as Step
  },

  // Calcula step anterior considerando condicionais
  getPrevStep: () => {
    const state = get()
    const current = state.currentStep

    // Se está em SITUATION e é PF, volta para DEMAND_TYPE (pula COMPANY_NAME)
    if (current === Step.SITUATION && state.formData.demandType === 'pf') {
      return Step.DEMAND_TYPE
    }

    // Caso normal: step anterior
    return Math.max(current - 1, Step.INTRO) as Step
  },

  // Verifica se deve pular o step de nome da empresa
  shouldSkipCompanyName: () => {
    const state = get()
    return state.formData.demandType === 'pf'
  },

  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  setSubmitting: (value) => set({ isSubmitting: value }),
  setComplete: (value) => set({ isComplete: value }),

  reset: () => set(initialState)
}))
