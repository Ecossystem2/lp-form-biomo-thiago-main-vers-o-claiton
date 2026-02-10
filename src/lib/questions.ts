import { ProjectType } from '@/hooks/useAppStore'

export interface QuestionOption {
  label: string
  value: string
  description?: string
  icon?: string
}

export interface Question {
  id: string
  question: string
  subtitle?: string
  type: 'single' | 'multiple' | 'text' | 'range'
  options?: QuestionOption[]
  placeholder?: string
  min?: number
  max?: number
}

// Informacoes sobre os tipos de projeto
export const projectTypeInfo = {
  simples: {
    title: 'Presenca Digital',
    subtitle: 'Site rapido e moderno',
    description: 'Ideal para quem precisa de uma presenca online profissional com entrega agil.',
    icon: '🚀',
    features: ['1 a 3 paginas', 'Design moderno', 'Formulario de contato', 'Responsivo'],
    price: 'A partir de R$ 997'
  },
  institucional: {
    title: 'Site Institucional',
    subtitle: 'Credibilidade e autoridade',
    description: 'Para empresas que precisam transmitir profissionalismo e conquistar a confianca do cliente.',
    icon: '💼',
    features: ['Multiplas paginas', 'SEO avancado', 'Design exclusivo', 'Painel admin'],
    price: 'A partir de R$ 2.497'
  },
  personalizado: {
    title: 'Solucao Personalizada',
    subtitle: 'Projeto sob medida',
    description: 'Projetos complexos com funcionalidades especificas, integracoes e sistemas personalizados.',
    icon: '⚡',
    features: ['Funcionalidades custom', 'Integracoes', 'Sistema completo', 'Suporte dedicado'],
    price: 'Sob consulta'
  }
}

// Legacy: manter para compatibilidade (alias)
export const siteTypeInfo = projectTypeInfo

// Funcoes helper (mantidas para compatibilidade)
export const getTotalQuestions = (projectType: ProjectType): number => {
  return 0 // Nao usamos mais perguntas dinamicas
}

export const getQuestion = (projectType: ProjectType, index: number): Question | null => {
  return null // Nao usamos mais perguntas dinamicas
}
