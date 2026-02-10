'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAppStore, AVAILABLE_FEATURES } from '@/hooks/useAppStore'
import { ChatLayout } from './ChatLayout'
import { ChatContainer } from './ChatContainer'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { BotMessage } from './BotMessage'
import { UserMessage } from './UserMessage'
import { ChatInput } from './ChatInput'
import { QuickReplyButtons } from './QuickReplyButtons'
import { ChatUpload } from './ChatUpload'
import { ChatColorPicker } from './ChatColorPicker'
import { CelebrationEffect, useCelebration } from './CelebrationEffect'
import { ProjectTypeCards } from './ProjectTypeCard'
import { motion } from 'framer-motion'

// Chat step types
type ChatStep =
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

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}

export function ChatFunnel() {
  const {
    formData,
    setFormData,
    setStep,
    setSubmitting,
    setComplete
  } = useAppStore()

  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [chatStep, setChatStep] = useState<ChatStep>('intro')
  const [inputType, setInputType] = useState<'text' | 'email' | 'tel' | 'url' | 'textarea' | 'quickreply' | 'upload' | 'colors' | 'projectcards' | 'none'>('none')
  const [quickReplyOptions, setQuickReplyOptions] = useState<{ id: string; label: string; description?: string; icon?: string }[]>([])
  const [quickReplyMultiSelect, setQuickReplyMultiSelect] = useState(false)
  const [lgpdAccepted, setLgpdAccepted] = useState(false)

  // Celebration hook
  const { celebration, celebrate, clearCelebration } = useCelebration()

  const messageIdRef = useRef(0)
  const hasInitialized = useRef(false)

  // Ref to store form values immediately (before React state updates)
  const formValuesRef = useRef({
    nome: '',
    email: '',
    whatsapp: '',
    projectType: ''
  })

  const generateId = () => {
    messageIdRef.current += 1
    return `msg-${messageIdRef.current}`
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Add bot message with typing animation
  const addBotMessage = useCallback(async (content: string, typingDuration?: number) => {
    const duration = typingDuration ?? Math.min(400 + content.length * 12, 1000)

    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, duration))
    setIsTyping(false)

    const newMessage: Message = {
      id: generateId(),
      type: 'bot',
      content,
      timestamp: getCurrentTime()
    }

    setMessages(prev => [...prev, newMessage])
    await new Promise(resolve => setTimeout(resolve, 100))
  }, [])

  // Add user message
  const addUserMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: generateId(),
      type: 'user',
      content,
      timestamp: getCurrentTime(),
      status: 'read'
    }

    setMessages(prev => [...prev, newMessage])
  }, [])

  // Handle step transitions
  const goToStep = useCallback(async (step: ChatStep) => {
    setChatStep(step)
    setInputType('none')

    await new Promise(resolve => setTimeout(resolve, 300))

    switch (step) {
      case 'intro':
        await addBotMessage('Ola! Sou o assistente da Biomo Sites.', 800)
        await addBotMessage('Vou te ajudar a encontrar a solucao perfeita para seu projeto web.', 600)
        await addBotMessage('Para comecar, qual e o seu nome?', 500)
        setInputType('text')
        break

      case 'name':
        setInputType('text')
        break

      case 'email':
        await addBotMessage(`Prazer, ${formValuesRef.current.nome}!`, 600)
        await addBotMessage('Qual e o seu melhor e-mail?', 500)
        setInputType('email')
        break

      case 'whatsapp':
        await addBotMessage('Perfeito! E qual o WhatsApp para contato?', 500)
        setInputType('tel')
        break

      case 'demand_type':
        await addBotMessage('O site sera para...', 600)
        setQuickReplyOptions([
          { id: 'pf', label: 'Uso pessoal (PF)', icon: '👤' },
          { id: 'pj', label: 'Empresa (PJ)', icon: '🏢' }
        ])
        setQuickReplyMultiSelect(false)
        setInputType('quickreply')
        break

      case 'company_name':
        await addBotMessage('Qual o nome da empresa?', 500)
        setInputType('text')
        break

      case 'situation':
        await addBotMessage('Sobre seu site atual...', 600)
        setQuickReplyOptions([
          { id: 'no_site', label: 'Nao tenho site ainda', icon: '🆕' },
          { id: 'new_site', label: 'Tenho, mas quero um novo', icon: '🔄' },
          { id: 'improve_site', label: 'Quero melhorar o atual', icon: '✨' }
        ])
        setQuickReplyMultiSelect(false)
        setInputType('quickreply')
        break

      case 'current_site_url':
        await addBotMessage('Qual o endereco do site atual?', 500)
        setInputType('url')
        break

      case 'project_type':
        await addBotMessage('Qual tipo de projeto voce precisa?', 600)
        // Usar cards visuais ao invés de quick reply
        setInputType('projectcards')
        break

      case 'urgency':
        await addBotMessage('E qual e a urgencia do projeto?', 500)
        setQuickReplyOptions([
          { id: 'urgent', label: 'Tenho pressa!', description: '2 semanas', icon: '⚡' },
          { id: 'normal', label: 'Prazo normal', description: '30-60 dias', icon: '📅' },
          { id: 'flexible', label: 'Sem pressa', description: 'Flexivel', icon: '🧘' }
        ])
        setQuickReplyMultiSelect(false)
        setInputType('quickreply')
        break

      case 'features':
        const projectLabels: Record<string, string> = {
          simples: 'Presenca Digital',
          institucional: 'Site Institucional',
          personalizado: 'Solucao Personalizada'
        }
        const projectPrices: Record<string, string> = {
          simples: 'R$ 997',
          institucional: 'R$ 2.497',
          personalizado: 'R$ 5.000'
        }

        await addBotMessage(`Otimo! Para um ${projectLabels[formValuesRef.current.projectType || 'simples']}, o investimento e a partir de ${projectPrices[formValuesRef.current.projectType || 'simples']}.`, 700)
        await addBotMessage('Quais funcionalidades voce precisa? (selecione quantas quiser)', 500)

        setQuickReplyOptions(AVAILABLE_FEATURES.map(f => ({
          id: f.id,
          label: f.label,
          icon: f.icon
        })))
        setQuickReplyMultiSelect(true)
        setInputType('quickreply')
        break

      case 'budget_fit':
        await addBotMessage('Esse investimento esta dentro do seu orcamento?', 600)
        setQuickReplyOptions([
          { id: 'yes', label: 'Sim, esta otimo!', icon: '✅' },
          { id: 'evaluate', label: 'Preciso avaliar', icon: '🤔' },
          { id: 'no', label: 'Esta acima do esperado', icon: '💸' }
        ])
        setQuickReplyMultiSelect(false)
        setInputType('quickreply')
        break

      case 'has_logo':
        await addBotMessage('Voce ja tem a logo da empresa?', 500)
        setQuickReplyOptions([
          { id: 'yes', label: 'Sim, tenho!', icon: '✅' },
          { id: 'no', label: 'Ainda nao tenho', icon: '❌' }
        ])
        setQuickReplyMultiSelect(false)
        setInputType('quickreply')
        break

      case 'logo_upload':
        await addBotMessage('Otimo! Pode enviar a logo aqui.', 400)
        setInputType('upload')
        break

      case 'brand_colors':
        await addBotMessage('Quais sao as cores principais da sua marca?', 500)
        setInputType('colors')
        break

      case 'has_references':
        await addBotMessage('Tem algum site que voce gosta como referencia?', 500)
        setQuickReplyOptions([
          { id: 'yes', label: 'Sim, alguns!', icon: '🔗' },
          { id: 'no', label: 'Nao tenho referencias', icon: '❌' }
        ])
        setQuickReplyMultiSelect(false)
        setInputType('quickreply')
        break

      case 'reference_sites':
        await addBotMessage('Compartilhe os links dos sites de referencia (um por vez):', 500)
        setInputType('url')
        break

      case 'additional_notes':
        await addBotMessage('Mais alguma informacao importante sobre o projeto?', 600)
        setInputType('textarea')
        break

      case 'lgpd':
        await addBotMessage('Perfeito! Para finalizar, preciso que aceite os termos de uso e politica de privacidade.', 400)
        setInputType('none')
        // LGPD will be handled specially
        break

      case 'submitting':
        setInputType('none')
        await addBotMessage('Enviando suas informacoes...', 500)
        await handleSubmit()
        break

      case 'success':
        setInputType('none')
        // Celebrar o sucesso com confetti
        celebrate('confetti', 'Enviado com sucesso!')
        await addBotMessage(`Tudo certo, ${formValuesRef.current.nome}!`, 800)
        await addBotMessage('Recebi todas as informacoes do seu projeto.', 500)
        await addBotMessage(`Em breve entraremos em contato pelo WhatsApp ${formValuesRef.current.whatsapp}.`, 600)
        await addBotMessage('Obrigado pela preferencia!', 500)
        setComplete(true)
        break
    }
  }, [addBotMessage, celebrate])

  // Handle form submission
  const handleSubmit = async () => {
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
        ;(window as typeof window & { dataLayer?: unknown[] }).dataLayer?.push({
          event: 'generate_lead',
          value: projectValues[formData.projectType || 'simples']
        })
      }

      goToStep('success')
    } catch {
      await addBotMessage('Ops! Ocorreu um erro ao enviar. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  // Handle user input
  const handleInput = useCallback(async (value: string) => {
    addUserMessage(value)

    switch (chatStep) {
      case 'intro':
      case 'name':
        formValuesRef.current.nome = value
        setFormData({ nome: value })
        goToStep('email')
        break

      case 'email':
        formValuesRef.current.email = value
        setFormData({ email: value })
        goToStep('whatsapp')
        break

      case 'whatsapp':
        formValuesRef.current.whatsapp = value
        setFormData({ whatsapp: value })
        // Celebrar conclusao dos dados pessoais
        celebrate('sparkle', 'Dados salvos!')
        setTimeout(() => {
          goToStep('demand_type')
        }, 1200)
        break

      case 'company_name':
        setFormData({ empresa: value })
        goToStep('situation')
        break

      case 'current_site_url':
        setFormData({ currentSiteUrl: value })
        goToStep('project_type')
        break

      case 'reference_sites':
        const currentRefs = formData.referenceSites || []
        if (currentRefs.length < 3) {
          setFormData({ referenceSites: [...currentRefs, value] })
          if (currentRefs.length < 2) {
            await addBotMessage('Mais algum?', 400)
          } else {
            goToStep('additional_notes')
          }
        } else {
          goToStep('additional_notes')
        }
        break

      case 'additional_notes':
        setFormData({ additional: value })
        goToStep('lgpd')
        break
    }
  }, [chatStep, addUserMessage, setFormData, goToStep, formData.referenceSites, addBotMessage, celebrate])

  // Handle quick reply selection
  const handleQuickReply = useCallback(async (selected: string | string[]) => {
    const selectedArray = Array.isArray(selected) ? selected : [selected]

    // Add user message with selection
    if (Array.isArray(selected)) {
      const labels = selectedArray.map(id =>
        quickReplyOptions.find(o => o.id === id)?.label || id
      ).join(', ')
      addUserMessage(labels)
    } else {
      const option = quickReplyOptions.find(o => o.id === selected)
      addUserMessage(option?.label || selected)
    }

    switch (chatStep) {
      case 'demand_type':
        setFormData({ demandType: selectedArray[0] as 'pf' | 'pj' })
        if (selectedArray[0] === 'pj') {
          goToStep('company_name')
        } else {
          goToStep('situation')
        }
        break

      case 'situation':
        setFormData({ situation: selectedArray[0] as 'no_site' | 'new_site' | 'improve_site' })
        if (selectedArray[0] === 'no_site') {
          goToStep('project_type')
        } else {
          goToStep('current_site_url')
        }
        break

      case 'project_type':
        formValuesRef.current.projectType = selectedArray[0]
        setFormData({ projectType: selectedArray[0] as 'simples' | 'institucional' | 'personalizado' })
        goToStep('urgency')
        break

      case 'urgency':
        setFormData({ urgency: selectedArray[0] as 'urgent' | 'normal' | 'flexible' })
        goToStep('features')
        break

      case 'features':
        setFormData({ desiredFeatures: selectedArray })
        await addBotMessage('Perfeito! Ja tenho uma boa ideia do que voce precisa.', 500)
        goToStep('budget_fit')
        break

      case 'budget_fit':
        setFormData({ budgetFit: selectedArray[0] as 'yes' | 'evaluate' | 'no' })
        goToStep('has_logo')
        break

      case 'has_logo':
        setFormData({ hasLogo: selectedArray[0] === 'yes' })
        if (selectedArray[0] === 'yes') {
          goToStep('logo_upload')
        } else {
          goToStep('has_references')
        }
        break

      case 'has_references':
        if (selectedArray[0] === 'yes') {
          goToStep('reference_sites')
        } else {
          goToStep('additional_notes')
        }
        break
    }
  }, [chatStep, addUserMessage, setFormData, goToStep, quickReplyOptions, addBotMessage])

  // Handle file upload
  const handleUpload = useCallback(async (file: File) => {
    // Convert to base64
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result as string
      setFormData({
        logoFile: base64,
        logoFileName: file.name
      })
      addUserMessage(`📎 ${file.name}`)

      // After upload, go to colors
      goToStep('brand_colors')
    }
    reader.readAsDataURL(file)
  }, [setFormData, addUserMessage, goToStep])

  // Handle color selection
  const handleColors = useCallback((colors: string[]) => {
    setFormData({ brandColors: colors })
    addUserMessage(`🎨 ${colors.join(', ')}`)
    goToStep('has_references')
  }, [setFormData, addUserMessage, goToStep])

  // Handle LGPD acceptance
  const handleLgpdSubmit = useCallback(() => {
    if (lgpdAccepted) {
      addUserMessage('Aceito os termos de uso')
      goToStep('submitting')
    }
  }, [lgpdAccepted, addUserMessage, goToStep])

  // Skip upload and go to next step
  const handleSkipUpload = useCallback(() => {
    goToStep('has_references')
  }, [goToStep])

  // Skip colors
  const handleSkipColors = useCallback(() => {
    goToStep('has_references')
  }, [goToStep])

  // Skip references
  const handleSkipReferences = useCallback(() => {
    goToStep('additional_notes')
  }, [goToStep])

  // Handle project type card selection
  const handleProjectTypeSelect = useCallback((projectType: string) => {
    const labels: Record<string, string> = {
      simples: 'Presenca Digital',
      institucional: 'Site Institucional',
      personalizado: 'Solucao Personalizada'
    }
    addUserMessage(labels[projectType] || projectType)
    formValuesRef.current.projectType = projectType
    setFormData({ projectType: projectType as 'simples' | 'institucional' | 'personalizado' })

    // Celebrar a escolha do tipo de projeto
    celebrate('checkmark', 'Otima escolha!')

    // Ir para o proximo passo apos a celebracao
    setTimeout(() => {
      goToStep('urgency')
    }, 1500)
  }, [addUserMessage, setFormData, goToStep, celebrate])

  // Initialize chat
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      goToStep('intro')
    }
  }, [goToStep])

  // Email validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Phone validation
  const validatePhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '')
    return numbers.length >= 10
  }

  // URL validation
  const validateUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return true // Allow non-URLs as well
    }
  }

  return (
    <ChatLayout currentStep={chatStep} formData={formData}>
      <ChatContainer>
        <ChatHeader
          name="Biomo Sites"
          status="Online"
          avatar="/logo-biomo-mini.svg"
        />

        <ChatMessages>
          {messages.map(msg =>
            msg.type === 'bot' ? (
              <BotMessage key={msg.id} timestamp={msg.timestamp}>
                {msg.content}
              </BotMessage>
            ) : (
              <UserMessage key={msg.id} timestamp={msg.timestamp} status={msg.status}>
                {msg.content}
              </UserMessage>
            )
          )}
          {isTyping && <BotMessage typing />}
        </ChatMessages>

        {/* Input area */}
        {inputType === 'text' && (
          <ChatInput
            type="text"
            placeholder={chatStep === 'company_name' ? 'Nome da empresa...' : 'Digite seu nome...'}
            onSubmit={handleInput}
          />
        )}

        {inputType === 'email' && (
          <ChatInput
            type="email"
            placeholder="Digite seu e-mail..."
            onSubmit={handleInput}
            validation={validateEmail}
            errorMessage="Digite um e-mail válido"
          />
        )}

        {inputType === 'tel' && (
          <ChatInput
            type="tel"
            placeholder="(00) 00000-0000"
            onSubmit={handleInput}
            mask="phone"
            validation={validatePhone}
            errorMessage="Digite um número válido"
          />
        )}

        {inputType === 'url' && (
          <ChatInput
            type="url"
            placeholder="www.exemplo.com.br"
            onSubmit={handleInput}
            validation={validateUrl}
          />
        )}

        {inputType === 'textarea' && (
          <ChatInput
            type="textarea"
            placeholder="Digite suas observações..."
            onSubmit={handleInput}
          />
        )}

        {inputType === 'quickreply' && (
          <QuickReplyButtons
            options={quickReplyOptions}
            onSelect={handleQuickReply}
            multiSelect={quickReplyMultiSelect}
          />
        )}

        {inputType === 'upload' && (
          <ChatUpload
            onUpload={handleUpload}
            onSkip={handleSkipUpload}
          />
        )}

        {inputType === 'colors' && (
          <ChatColorPicker
            onSelect={handleColors}
            onSkip={handleSkipColors}
          />
        )}

        {inputType === 'projectcards' && (
          <ProjectTypeCards
            selectedId={formData.projectType || null}
            onSelect={handleProjectTypeSelect}
          />
        )}

        {/* LGPD section */}
        {chatStep === 'lgpd' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-4 space-y-4 border-t border-white/10"
          >
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className={`
                w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                ${lgpdAccepted
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-white/30 group-hover:border-white/50'
                }
              `}>
                {lgpdAccepted && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
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
                  política de privacidade
                </a>
              </span>
            </label>

            <button
              onClick={handleLgpdSubmit}
              disabled={!lgpdAccepted}
              className={`
                w-full py-3 rounded-xl font-medium text-sm transition-all duration-200
                ${lgpdAccepted
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/25'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
                }
              `}
            >
              Enviar solicitação
            </button>
          </motion.div>
        )}
      </ChatContainer>

      {/* Celebration Effect */}
      {celebration && (
        <CelebrationEffect
          type={celebration.type}
          message={celebration.message}
          onComplete={clearCelebration}
        />
      )}
    </ChatLayout>
  )
}
