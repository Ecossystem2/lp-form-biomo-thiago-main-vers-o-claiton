'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useAppStore, AVAILABLE_FEATURES } from '@/hooks/useAppStore'
import { QuizLayout } from './QuizLayout'
import { QuizCard } from './QuizCard'
import { QuizInput } from './QuizInput'
import { QuizOptions } from './QuizOptions'
import { CelebrationEffect, useCelebration } from '../chat/CelebrationEffect'
import { ProjectTypeCards } from '../chat/ProjectTypeCard'
import { ChatUpload } from '../chat/ChatUpload'
import { ChatColorPicker } from '../chat/ChatColorPicker'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Loader2, ExternalLink } from 'lucide-react'
import { LoadingState } from '../ui/LoadingState'
import { MicroFeedback, STEP_FEEDBACK } from '../ui/TypingIndicator'
import { useAutoSave } from '@/hooks/useAutoSave'
import { GlowButton } from '@/components/ui/GlowButton'

type QuizStep =
  | 'intro'
  | 'name'
  | 'email'
  | 'whatsapp'
  | 'demand_type'
  | 'company_name'
  | 'situation'
  | 'current_site_url'
  | 'project_type'
  | 'urgency'
  | 'features'
  | 'budget_fit'
  | 'has_logo'
  | 'logo_upload'
  | 'brand_colors'
  | 'has_references'
  | 'reference_sites'
  | 'additional_notes'
  | 'lgpd'
  | 'submitting'
  | 'success'

// Ordem das etapas para navegação
const STEP_ORDER: QuizStep[] = [
  'intro', 'name', 'email', 'whatsapp', 'demand_type', 'company_name',
  'situation', 'current_site_url', 'project_type', 'urgency', 'features',
  'budget_fit', 'has_logo', 'logo_upload', 'brand_colors', 'has_references',
  'reference_sites', 'additional_notes', 'lgpd', 'submitting', 'success'
]

// Etapas que podem ser puladas (condicionais)
const SKIPPABLE_STEPS: QuizStep[] = ['current_site_url', 'logo_upload', 'brand_colors', 'reference_sites']

// Função para obter etapa anterior válida
function getPreviousStep(currentStep: QuizStep, formData: Record<string, unknown>): QuizStep | null {
  const currentIndex = STEP_ORDER.indexOf(currentStep)
  if (currentIndex <= 1) return null // Não volta do intro ou name

  // Encontrar etapa anterior que não foi pulada
  for (let i = currentIndex - 1; i >= 0; i--) {
    const step = STEP_ORDER[i]

    // Pular etapas condicionais que não foram preenchidas
    if (step === 'current_site_url' && formData.situation !== 'has_site') continue
    if (step === 'logo_upload' && formData.hasLogo !== 'yes') continue
    if (step === 'brand_colors' && !formData.logoUrl) continue
    if (step === 'reference_sites' && formData.hasReferences !== 'yes') continue

    return step
  }

  return null
}

interface StepConfig {
  icon?: string
  question: string | ((nome: string) => string)
  subtitle?: string | ((nome: string) => string)
}

// Função para obter o primeiro nome
function getFirstName(fullName: string): string {
  return fullName.split(' ')[0] || fullName
}

const STEP_CONFIG: Record<QuizStep, StepConfig> = {
  intro: {
    question: 'Vamos criar o site que vai transformar seu negocio?',
    subtitle: 'Em 2 minutos, descubra a solucao perfeita pra voce'
  },
  name: {
    question: 'Antes de comecar... como posso te chamar?',
    subtitle: 'Vou personalizar tudo pra voce'
  },
  email: {
    question: (nome) => `${getFirstName(nome)}, qual seu melhor e-mail?`,
    subtitle: 'Vou enviar sua proposta exclusiva por la'
  },
  whatsapp: {
    question: (nome) => `E seu WhatsApp, ${getFirstName(nome)}?`,
    subtitle: 'Pra gente conversar de forma rapida e direta'
  },
  demand_type: {
    question: 'O projeto e pra voce ou pra sua empresa?'
  },
  company_name: {
    question: 'Qual o nome do seu negocio?',
    subtitle: 'Quero conhecer melhor sua marca'
  },
  situation: {
    question: 'Qual dessas situacoes mais te representa?'
  },
  current_site_url: {
    question: 'Me passa o link do seu site atual',
    subtitle: 'Vou analisar e sugerir melhorias'
  },
  project_type: {
    question: (nome) => `${getFirstName(nome)}, qual solucao combina com seu momento?`,
    subtitle: 'Cada uma foi pensada pra um objetivo diferente'
  },
  urgency: {
    question: 'Pra quando voce precisa do site pronto?'
  },
  features: {
    question: 'O que nao pode faltar no seu site?',
    subtitle: 'Marque tudo que faz sentido pro seu negocio'
  },
  budget_fit: {
    question: 'Esse investimento funciona pra voce?'
  },
  has_logo: {
    question: (nome) => `${getFirstName(nome)}, voce ja tem uma logo?`,
    subtitle: 'Se nao tiver, a gente pode ajudar!'
  },
  logo_upload: {
    question: 'Perfeito! Envia ela aqui',
    subtitle: 'PNG, JPG ou SVG - qualquer um serve'
  },
  brand_colors: {
    question: 'Quais cores representam sua marca?',
    subtitle: 'Vamos manter a identidade visual'
  },
  has_references: {
    question: 'Tem algum site que voce admira?',
    subtitle: 'Referencias ajudam MUITO no resultado final'
  },
  reference_sites: {
    question: 'Compartilha os links aqui',
    subtitle: 'Pode ser ate 3 sites que voce curte'
  },
  additional_notes: {
    question: 'Quer me contar mais alguma coisa?',
    subtitle: 'Detalhes, ideias, sonhos... tudo vale!'
  },
  lgpd: {
    question: (nome) => `Quase la, ${getFirstName(nome)}!`,
    subtitle: 'So precisamos da sua autorizacao pra finalizar'
  },
  submitting: {
    question: 'Preparando sua proposta...',
    subtitle: 'Isso leva apenas alguns segundos'
  },
  success: {
    question: (nome) => `Pronto, ${getFirstName(nome)}!`,
    subtitle: 'Sua proposta personalizada esta a caminho'
  }
}

export function QuizFunnel() {
  const {
    formData,
    setFormData,
    setSubmitting,
    setComplete
  } = useAppStore()

  const [currentStep, setCurrentStep] = useState<QuizStep>('name')
  const [lgpdAccepted, setLgpdAccepted] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [microFeedback, setMicroFeedback] = useState<{ message: string; emoji: string } | null>(null)

  const { celebration, celebrate, clearCelebration } = useCelebration()

  // Mostrar micro-feedback ao completar etapa
  const showMicroFeedback = useCallback((step: string) => {
    const feedback = STEP_FEEDBACK[step]
    if (feedback) {
      setMicroFeedback(feedback)
      setTimeout(() => setMicroFeedback(null), 600)
    }
  }, [])

  // Ref para valores de formulario (evitar stale closures)
  const formValuesRef = useRef({
    nome: '',
    email: '',
    whatsapp: '',
    projectType: ''
  })

  // Auto-save do progresso
  const handleRestore = useCallback((savedStep: string, savedData: Record<string, unknown>) => {
    // Restaurar dados do formulário
    if (savedData) {
      setFormData(savedData as Partial<typeof formData>)

      // Atualizar ref também
      if (savedData.nome) formValuesRef.current.nome = savedData.nome as string
      if (savedData.email) formValuesRef.current.email = savedData.email as string
      if (savedData.whatsapp) formValuesRef.current.whatsapp = savedData.whatsapp as string
      if (savedData.projectType) formValuesRef.current.projectType = savedData.projectType as string

      // Restaurar features selecionadas
      if (savedData.features && Array.isArray(savedData.features)) {
        setSelectedFeatures(savedData.features as string[])
      }
    }

    // Restaurar step (exceto se já concluiu)
    if (savedStep && savedStep !== 'success' && savedStep !== 'submitting') {
      setCurrentStep(savedStep as QuizStep)
    }
  }, [setFormData])

  const { clearProgress } = useAutoSave(
    currentStep,
    { ...formData, features: selectedFeatures },
    handleRestore
  )

  // Limpar progresso ao concluir com sucesso
  useEffect(() => {
    if (currentStep === 'success') {
      clearProgress()
    }
  }, [currentStep, clearProgress])

  const goToStep = useCallback((step: QuizStep) => {
    // Mostrar micro-feedback para a etapa atual antes de mudar
    // (exceto para etapas de sistema como submitting/success)
    if (currentStep !== 'name' && currentStep !== 'submitting' && currentStep !== 'success') {
      showMicroFeedback(currentStep)
    }
    setCurrentStep(step)
  }, [currentStep, showMicroFeedback])

  // Voltar para etapa anterior
  const goBack = useCallback(() => {
    const previousStep = getPreviousStep(currentStep, formData as unknown as Record<string, unknown>)
    if (previousStep) {
      setCurrentStep(previousStep)
    }
  }, [currentStep, formData])

  // Verificar se pode voltar
  const canGoBack = currentStep !== 'name' && currentStep !== 'submitting' && currentStep !== 'success'

  // Email validation
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // Phone validation
  const validatePhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '')
    return numbers.length >= 10
  }

  // Handlers
  const handleIntroStart = () => {
    goToStep('name')
  }

  const handleNameSubmit = (value: string) => {
    formValuesRef.current.nome = value
    setFormData({ nome: value })
    goToStep('email')
  }

  const handleEmailSubmit = (value: string) => {
    formValuesRef.current.email = value
    setFormData({ email: value })
    goToStep('whatsapp')
  }

  const handleWhatsAppSubmit = (value: string) => {
    formValuesRef.current.whatsapp = value
    setFormData({ whatsapp: value })
    celebrate('sparkle', 'Dados salvos!')
    setTimeout(() => goToStep('demand_type'), 1200)
  }

  const handleDemandType = (id: string) => {
    setFormData({ demandType: id as 'pf' | 'pj' })
    if (id === 'pj') {
      goToStep('company_name')
    } else {
      goToStep('situation')
    }
  }

  const handleCompanyName = (value: string) => {
    setFormData({ empresa: value })
    goToStep('situation')
  }

  const handleSituation = (id: string) => {
    setFormData({ situation: id as 'no_site' | 'new_site' | 'improve_site' })
    if (id === 'no_site') {
      goToStep('project_type')
    } else {
      goToStep('current_site_url')
    }
  }

  const handleCurrentSiteUrl = (value: string) => {
    setFormData({ currentSiteUrl: value })
    goToStep('project_type')
  }

  const handleProjectType = (id: string) => {
    formValuesRef.current.projectType = id
    setFormData({ projectType: id as 'simples' | 'institucional' | 'personalizado' })
    celebrate('checkmark', 'Otima escolha!')
    setTimeout(() => goToStep('urgency'), 1500)
  }

  const handleUrgency = (id: string) => {
    setFormData({ urgency: id as 'urgent' | 'normal' | 'flexible' })
    goToStep('features')
  }

  const handleFeatureSelect = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const handleFeaturesConfirm = () => {
    if (selectedFeatures.length > 0) {
      setFormData({ desiredFeatures: selectedFeatures })
      goToStep('budget_fit')
    }
  }

  const handleBudgetFit = (id: string) => {
    setFormData({ budgetFit: id as 'yes' | 'evaluate' | 'no' })
    goToStep('has_logo')
  }

  const handleHasLogo = (id: string) => {
    setFormData({ hasLogo: id === 'yes' })
    if (id === 'yes') {
      goToStep('logo_upload')
    } else {
      goToStep('has_references')
    }
  }

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      setFormData({
        logoFile: reader.result as string,
        logoFileName: file.name
      })
      goToStep('brand_colors')
    }
    reader.readAsDataURL(file)
  }

  const handleColors = (colors: string[]) => {
    setFormData({ brandColors: colors })
    goToStep('has_references')
  }

  const handleHasReferences = (id: string) => {
    if (id === 'yes') {
      goToStep('reference_sites')
    } else {
      goToStep('additional_notes')
    }
  }

  const handleReferenceSite = (value: string) => {
    const currentRefs = formData.referenceSites || []
    if (currentRefs.length < 3) {
      setFormData({ referenceSites: [...currentRefs, value] })
    }
    if (currentRefs.length >= 2) {
      goToStep('additional_notes')
    }
  }

  const handleAdditionalNotes = (value: string) => {
    setFormData({ additional: value })
    goToStep('lgpd')
  }

  const handleLgpdSubmit = async () => {
    if (!lgpdAccepted) return

    goToStep('submitting')
    setSubmitting(true)

    try {
      // Submit to API
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to submit')

      // Send WhatsApp notification
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          projectType: formData.projectType
        })
      })

      // GTM event
      if (typeof window !== 'undefined' && (window as typeof window & { dataLayer?: unknown[] }).dataLayer) {
        const projectValues: Record<string, number> = {
          simples: 997,
          institucional: 2497,
          personalizado: 5000
        }
          ; (window as typeof window & { dataLayer?: unknown[] }).dataLayer?.push({
            event: 'generate_lead',
            value: projectValues[formData.projectType || 'simples']
          })
      }

      celebrate('confetti', 'Enviado com sucesso!')
      goToStep('success')
      setComplete(true)
    } catch {
      goToStep('lgpd')
    } finally {
      setSubmitting(false)
    }
  }

  // Keyboard handler for features confirm
  useEffect(() => {
    if (currentStep === 'features') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && selectedFeatures.length > 0) {
          handleFeaturesConfirm()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentStep, selectedFeatures])

  const rawConfig = STEP_CONFIG[currentStep]

  // Processar templates de mensagem com nome do usuário
  const config = {
    icon: rawConfig.icon,
    question: typeof rawConfig.question === 'function'
      ? rawConfig.question(formData.nome || '')
      : rawConfig.question,
    subtitle: typeof rawConfig.subtitle === 'function'
      ? rawConfig.subtitle(formData.nome || '')
      : rawConfig.subtitle
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <div className="space-y-4">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleIntroStart}
              className="group flex items-center justify-center gap-3 w-full max-w-xs mx-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105"
            >
              <span>Bora criar meu site</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-white/40 text-xs"
            >
              147+ sites criados este ano
            </motion.p>
          </div>
        )

      case 'name':
        return (
          <QuizInput
            type="text"
            placeholder="Seu primeiro nome..."
            onSubmit={handleNameSubmit}
          />
        )

      case 'email':
        return (
          <QuizInput
            type="email"
            placeholder="seu@email.com"
            onSubmit={handleEmailSubmit}
            validation={validateEmail}
            errorMessage="Digite um e-mail valido"
          />
        )

      case 'whatsapp':
        return (
          <QuizInput
            type="tel"
            placeholder="(00) 00000-0000"
            onSubmit={handleWhatsAppSubmit}
            mask="phone"
            validation={validatePhone}
            errorMessage="Digite um numero valido"
          />
        )

      case 'demand_type':
        return (
          <QuizOptions
            options={[
              { id: 'pf', label: 'Pra mim (pessoa fisica)', icon: '👤', description: 'Portfolio, blog, projeto pessoal' },
              { id: 'pj', label: 'Pra minha empresa', icon: '🏢', description: 'Site institucional, loja, servicos' }
            ]}
            selected={formData.demandType || null}
            onSelect={handleDemandType}
          />
        )

      case 'company_name':
        return (
          <QuizInput
            type="text"
            placeholder="Ex: Biomo, Padaria do Ze..."
            onSubmit={handleCompanyName}
          />
        )

      case 'situation':
        return (
          <QuizOptions
            options={[
              { id: 'no_site', label: 'Ainda nao tenho site', icon: '🆕', description: 'Quero comecar do zero' },
              { id: 'new_site', label: 'Tenho, mas da vergonha', icon: '😅', description: 'Preciso de um site profissional' },
              { id: 'improve_site', label: 'Tenho, mas nao traz resultados', icon: '📉', description: 'Quero mais clientes e vendas' }
            ]}
            selected={formData.situation || null}
            onSelect={handleSituation}
          />
        )

      case 'current_site_url':
        return (
          <QuizInput
            type="url"
            placeholder="www.seusite.com.br"
            onSubmit={handleCurrentSiteUrl}
          />
        )

      case 'project_type':
        return (
          <ProjectTypeCards
            selectedId={formData.projectType || null}
            onSelect={handleProjectType}
          />
        )

      case 'urgency':
        return (
          <QuizOptions
            options={[
              { id: 'urgent', label: 'Urgente!', description: 'Preciso em ate 2 semanas', icon: '🔥' },
              { id: 'normal', label: 'Proximos 30-60 dias', description: 'Tenho tempo pra planejar', icon: '📅' },
              { id: 'flexible', label: 'Estou pesquisando', description: 'Sem pressa por enquanto', icon: '🤔' }
            ]}
            selected={formData.urgency || null}
            onSelect={handleUrgency}
          />
        )

      case 'features':
        return (
          <div className="space-y-6">
            <QuizOptions
              options={AVAILABLE_FEATURES.map(f => ({
                id: f.id,
                label: f.label,
                icon: f.icon,
                explanation: f.explanation,
                benefits: [...f.benefits]
              }))}
              selected={selectedFeatures}
              onSelect={handleFeatureSelect}
              multiSelect
              columns={2}
            />
            {selectedFeatures.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleFeaturesConfirm}
                className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
              >
                <span>Continuar</span>
                <ArrowRight size={18} />
              </motion.button>
            )}
          </div>
        )

      case 'budget_fit':
        const projectPrices: Record<string, string> = {
          simples: 'R$ 997',
          institucional: 'R$ 2.497',
          ecommerce: 'R$ 4.999',
          personalizado: 'R$ 5.000'
        }
        return (
          <div className="space-y-4">
            <div className="text-center mb-6 space-y-2">
              <p className="text-white/70">
                O investimento comeca em <span className="text-emerald-400 font-bold text-lg">{projectPrices[formValuesRef.current.projectType || 'simples']}</span>
              </p>
              <p className="text-white/40 text-xs">
                Parcelamos em ate 12x no cartao
              </p>
            </div>
            <QuizOptions
              options={[
                { id: 'yes', label: 'Perfeito, vamos la!', icon: '✅', description: 'Quero comecar o projeto' },
                { id: 'evaluate', label: 'Preciso avaliar melhor', icon: '🤔', description: 'Me envia a proposta detalhada' },
                { id: 'no', label: 'Esta acima do meu orcamento', icon: '💬', description: 'Mas quero conversar sobre opcoes' }
              ]}
              selected={formData.budgetFit || null}
              onSelect={handleBudgetFit}
            />
          </div>
        )

      case 'has_logo':
        return (
          <QuizOptions
            options={[
              { id: 'yes', label: 'Sim, ja tenho!', icon: '✅', description: 'Vou enviar no proximo passo' },
              { id: 'no', label: 'Ainda nao tenho', icon: '🎨', description: 'Preciso criar uma' }
            ]}
            selected={null}
            onSelect={handleHasLogo}
          />
        )

      case 'logo_upload':
        return (
          <ChatUpload
            onUpload={handleLogoUpload}
            onSkip={() => goToStep('has_references')}
          />
        )

      case 'brand_colors':
        return (
          <ChatColorPicker
            onSelect={handleColors}
            onSkip={() => goToStep('has_references')}
          />
        )

      case 'has_references':
        return (
          <QuizOptions
            options={[
              { id: 'yes', label: 'Sim, tenho alguns!', icon: '🔗', description: 'Vou compartilhar os links' },
              { id: 'no', label: 'Nao tenho em mente', icon: '🤷', description: 'Confio no trabalho de voces' }
            ]}
            selected={null}
            onSelect={handleHasReferences}
          />
        )

      case 'reference_sites':
        return (
          <div className="space-y-4">
            {formData.referenceSites && formData.referenceSites.length > 0 && (
              <div className="space-y-2">
                {formData.referenceSites.map((site, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                    <Check size={16} className="text-emerald-500" />
                    <span>{site}</span>
                  </div>
                ))}
              </div>
            )}
            <QuizInput
              type="url"
              placeholder="www.exemplo.com"
              onSubmit={handleReferenceSite}
            />
            <button
              onClick={() => goToStep('additional_notes')}
              className="text-white/50 hover:text-white/70 text-sm transition-colors"
            >
              Nao tenho referencias →
            </button>
          </div>
        )

      case 'additional_notes':
        return (
          <div className="space-y-4">
            <QuizInput
              type="textarea"
              value={(formData.additional as string) || ''}
              onChange={(val) => setFormData({ additional: val })}
              placeholder="Conte seus sonhos pro site... O que voce imagina? Alguma funcionalidade especifica? Detalhe que faz diferenca?"
              onSubmit={() => goToStep('lgpd')}
            />
            <div className="flex flex-col items-center pt-2">
              <button
                onClick={() => goToStep('lgpd')}
                className="text-white/50 hover:text-white/70 text-sm transition-colors py-2"
                type="button"
              >
                Prefiro contar depois →
              </button>
            </div>
          </div>
        )

      case 'lgpd':
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <p className="text-white/50 text-xs text-center">
              🔒 Seus dados estao protegidos e nunca serao compartilhados
            </p>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className={`
                w-6 h-6 mt-0.5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all
                ${lgpdAccepted
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-white/30 group-hover:border-white/50'
                }
              `}>
                {lgpdAccepted && <Check size={14} className="text-white" />}
              </div>
              <input
                type="checkbox"
                checked={lgpdAccepted}
                onChange={(e) => setLgpdAccepted(e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm text-white/70">
                Li e aceito os{' '}
                <a href="/termos" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                  termos de uso
                </a>{' '}
                e{' '}
                <a href="/privacidade" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                  politica de privacidade
                </a>
              </span>
            </label>

            <GlowButton
              onClick={handleLgpdSubmit}
              disabled={!lgpdAccepted}
              fullWidth
            >
              Receber minha proposta
            </GlowButton>
          </div>
        )

      case 'submitting':
        return (
          <div className="flex flex-col items-center gap-6 py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 size={40} className="text-emerald-500" />
              </motion.div>
            </motion.div>
            <div className="text-center space-y-2">
              <LoadingState text="Enviando sua solicitacao" size="lg" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-white/40 text-sm"
              >
                Isso leva apenas alguns segundos
              </motion.p>
            </div>
          </div>
        )

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-white/80">
                Recebemos tudo! Voce esta a um passo de ter o site que vai{' '}
                <span className="text-emerald-400 font-semibold">transformar seu negocio</span>.
              </p>
              <p className="text-white/60 text-sm">
                Em instantes, voce recebera uma mensagem no WhatsApp{' '}
                <span className="text-emerald-400">{formValuesRef.current.whatsapp}</span>
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              <p className="text-white/50 text-xs uppercase tracking-wide">O que vai acontecer agora:</p>
              <div className="space-y-1 text-sm text-white/70">
                <p>✅ Proposta personalizada no seu e-mail</p>
                <p>✅ Contato pelo WhatsApp em ate 2h</p>
                <p>✅ Reuniao pra alinhar todos os detalhes</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-4">
              <p className="text-white/40 text-xs">
                Enquanto aguarda, que tal conferir alguns projetos?
              </p>
              <a
                href="https://biomo.com.br/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl text-white font-medium transition-all duration-300"
              >
                <span>Ver Portfolio</span>
                <ExternalLink size={16} className="text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <p className="text-white/30 text-[10px]">
              Obrigado pela confianca, {getFirstName(formValuesRef.current.nome)}! 💚
            </p>
          </div>
        )

      default:
        return null
    }
  }

  // Calcular tempo estimado restante
  const getTimeEstimate = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    const remainingSteps = STEP_ORDER.length - currentIndex - 1
    if (remainingSteps <= 0) return undefined
    if (remainingSteps <= 3) return '~30 segundos'
    if (remainingSteps <= 6) return '~1 minuto'
    if (remainingSteps <= 10) return '~2 minutos'
    return '~3 minutos'
  }, [currentStep])

  // Handler global de teclado (Esc para voltar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && canGoBack) {
        goBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canGoBack, goBack])

  return (
    <QuizLayout currentStep={currentStep} formData={formData}>
      <QuizCard
        stepKey={currentStep}
        icon={config.icon}
        question={config.question}
        subtitle={config.subtitle}
        onBack={goBack}
        canGoBack={canGoBack}
        timeEstimate={getTimeEstimate()}
        showSecurityBadge={['email', 'whatsapp', 'lgpd'].includes(currentStep)}
        showTestimonial={['budget_fit', 'urgency'].includes(currentStep)}
        showKeyboardHints={currentStep !== 'success'}
        size={['project_type', 'features'].includes(currentStep) ? 'large' : 'default'}
      >
        {renderStepContent()}
      </QuizCard>

      {/* Micro Feedback */}
      <AnimatePresence>
        {microFeedback && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
            <MicroFeedback message={microFeedback.message} emoji={microFeedback.emoji} />
          </div>
        )}
      </AnimatePresence>

      {/* Celebration Effect */}
      {celebration && (
        <CelebrationEffect
          type={celebration.type}
          message={celebration.message}
          onComplete={clearCelebration}
        />
      )}
    </QuizLayout>
  )
}
