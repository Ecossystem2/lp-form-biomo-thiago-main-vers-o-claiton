'use client'

import { useState, useRef, useEffect, KeyboardEvent, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, AlertTriangle } from 'lucide-react'
import { GlowButton } from '@/components/ui/GlowButton'

interface QuizInputProps {
  type?: 'text' | 'email' | 'tel' | 'url' | 'textarea'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit: (value: string) => void
  validation?: (value: string) => boolean
  errorMessage?: string
  mask?: 'phone'
  autoFocus?: boolean
  disabled?: boolean
  label?: string
}

// Domínios populares para sugestão
const POPULAR_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'uol.com.br',
  'terra.com.br',
  'bol.com.br'
]

// Correções de typos comuns
const DOMAIN_TYPOS: Record<string, string> = {
  // Gmail
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmali.com': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmailc.om': 'gmail.com',
  'gmaill.com': 'gmail.com',
  // Hotmail
  'hotmal.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'hotamil.com': 'hotmail.com',
  'homail.com': 'hotmail.com',
  'htmail.com': 'hotmail.com',
  // Outlook
  'outloock.com': 'outlook.com',
  'outlok.com': 'outlook.com',
  'outlook.con': 'outlook.com',
  'outllook.com': 'outlook.com',
  // Yahoo
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'yaoo.com': 'yahoo.com',
  // UOL
  'uol.com': 'uol.com.br',
  'uol.con.br': 'uol.com.br',
  // Terra
  'terra.com': 'terra.com.br',
  'tera.com.br': 'terra.com.br'
}

// Validações robustas
const validators = {
  email: (value: string) => {
    // Email com domínio de pelo menos 2 caracteres
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return regex.test(value) && value.length <= 254
  },
  phone: (value: string) => {
    const numbers = value.replace(/\D/g, '')
    // 10 ou 11 dígitos, não pode ser todos iguais
    if (numbers.length < 10 || numbers.length > 11) return false
    // Rejeitar números repetidos (11111111111)
    if (new Set(numbers).size === 1) return false
    // DDD válido (11-99)
    const ddd = parseInt(numbers.slice(0, 2))
    if (ddd < 11 || ddd > 99) return false
    return true
  },
  url: (value: string) => {
    try {
      const url = new URL(value.startsWith('http') ? value : `https://${value}`)
      return url.hostname.includes('.')
    } catch {
      return false
    }
  }
}

// Mensagens de erro específicas
const errorMessages = {
  email: 'Email invalido - use formato: seu@email.com',
  phone: 'Telefone invalido - use (XX) XXXXX-XXXX',
  url: 'URL invalida - use formato: www.site.com',
  default: 'Por favor, preencha este campo corretamente'
}

export function QuizInput({
  type = 'text',
  placeholder = 'Digite aqui...',
  value: controlledValue,
  onChange,
  onSubmit,
  validation,
  errorMessage,
  mask,
  autoFocus = true,
  disabled = false,
  label
}: QuizInputProps) {
  const [internalValue, setInternalValue] = useState('')
  const [error, setError] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [shake, setShake] = useState(false)
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const setValue = (newValue: string) => {
    if (onChange) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  // Detectar typo e gerar sugestões de email
  const detectTypoAndSuggestions = useCallback((emailValue: string) => {
    if (type !== 'email') {
      setEmailSuggestions([])
      setTypoSuggestion(null)
      return
    }

    const atIndex = emailValue.indexOf('@')
    if (atIndex === -1) {
      setEmailSuggestions([])
      setTypoSuggestion(null)
      return
    }

    const localPart = emailValue.slice(0, atIndex)
    const domainPart = emailValue.slice(atIndex + 1).toLowerCase()

    // Verificar typo no domínio
    if (domainPart && DOMAIN_TYPOS[domainPart]) {
      setTypoSuggestion(`${localPart}@${DOMAIN_TYPOS[domainPart]}`)
    } else {
      setTypoSuggestion(null)
    }

    // Gerar sugestões de domínio
    if (domainPart.length === 0) {
      // Mostrar todos os domínios populares
      setEmailSuggestions(POPULAR_DOMAINS.slice(0, 5).map(d => `${localPart}@${d}`))
    } else if (domainPart.length < 3 && !domainPart.includes('.')) {
      // Filtrar domínios que começam com o que foi digitado
      const filtered = POPULAR_DOMAINS
        .filter(d => d.startsWith(domainPart))
        .slice(0, 4)
        .map(d => `${localPart}@${d}`)
      setEmailSuggestions(filtered)
    } else {
      setEmailSuggestions([])
    }

    setSelectedSuggestionIndex(-1)
  }, [type])

  // Aplicar sugestão de email
  const applySuggestion = useCallback((suggestion: string) => {
    setValue(suggestion)
    setEmailSuggestions([])
    setSelectedSuggestionIndex(-1)
    inputRef.current?.focus()
  }, [])

  // Aplicar correção de typo
  const applyTypoCorrection = useCallback(() => {
    if (typoSuggestion) {
      setValue(typoSuggestion)
      setTypoSuggestion(null)
      inputRef.current?.focus()
    }
  }, [typoSuggestion])

  // Atualizar sugestões quando o valor muda
  useEffect(() => {
    detectTypoAndSuggestions(value)
  }, [value, detectTypoAndSuggestions])

  // Determinar mensagem de erro apropriada
  const currentErrorMessage = useMemo(() => {
    if (errorMessage) return errorMessage
    if (type === 'email') return errorMessages.email
    if (type === 'tel' || mask === 'phone') return errorMessages.phone
    if (type === 'url') return errorMessages.url
    return errorMessages.default
  }, [errorMessage, type, mask])

  // Validação em tempo real para feedback visual
  useEffect(() => {
    if (!value.trim()) {
      setIsValid(false)
      return
    }

    let valid = true

    // Usar validação customizada se fornecida
    if (validation) {
      valid = validation(value)
    } else {
      // Validações automáticas por tipo
      if (type === 'email') {
        valid = validators.email(value)
      } else if (type === 'tel' || mask === 'phone') {
        valid = validators.phone(value)
      } else if (type === 'url') {
        valid = validators.url(value)
      }
    }

    setIsValid(valid)
    if (valid) setError(false)
  }, [value, type, mask, validation])

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [autoFocus])

  // Phone mask (XX) XXXXX-XXXX
  const formatPhone = (input: string): string => {
    const numbers = input.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value
    if (mask === 'phone') {
      newValue = formatPhone(newValue)
    }
    setValue(newValue)
    setError(false)
  }

  const handleSubmit = () => {
    if (disabled || !value.trim()) return

    // Usar validação customizada ou automática
    let valid = true
    if (validation) {
      valid = validation(value)
    } else if (type === 'email') {
      valid = validators.email(value)
    } else if (type === 'tel' || mask === 'phone') {
      valid = validators.phone(value)
    } else if (type === 'url') {
      valid = validators.url(value)
    }

    if (!valid) {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    onSubmit(value.trim())
    if (!controlledValue) {
      setInternalValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Navegar sugestões com setas
    if (emailSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedSuggestionIndex(prev =>
          prev < emailSuggestions.length - 1 ? prev + 1 : 0
        )
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedSuggestionIndex(prev =>
          prev > 0 ? prev - 1 : emailSuggestions.length - 1
        )
        return
      }
      if (e.key === 'Tab' && selectedSuggestionIndex >= 0) {
        e.preventDefault()
        applySuggestion(emailSuggestions[selectedSuggestionIndex])
        return
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // Se tem sugestão selecionada, aplicar
      if (selectedSuggestionIndex >= 0 && emailSuggestions[selectedSuggestionIndex]) {
        applySuggestion(emailSuggestions[selectedSuggestionIndex])
        return
      }
      handleSubmit()
    }

    // Fechar sugestões com Escape
    if (e.key === 'Escape') {
      setEmailSuggestions([])
      setSelectedSuggestionIndex(-1)
    }
  }

  const isTextarea = type === 'textarea'
  const inputId = useMemo(() => `quiz-input-${Math.random().toString(36).slice(2, 9)}`, [])

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Label acessível */}
      {label && (
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
      )}

      {/* Input container com shake animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          x: shake ? [-8, 8, -8, 8, 0] : 0
        }}
        transition={{
          duration: shake ? 0.4 : 0.2,
          delay: shake ? 0 : 0.1
        }}
        className="relative"
      >
        {isTextarea ? (
          <textarea
            id={inputId}
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={3}
            aria-invalid={error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`
              w-full bg-transparent border-0 border-b-2 outline-none resize-none
              text-base sm:text-xl md:text-2xl text-white placeholder:text-white/30
              py-3 pr-10 transition-all duration-200
              ${isFocused ? 'border-emerald-500' : 'border-white/20'}
              ${error ? 'border-red-500' : ''}
              ${isValid && value.trim() ? 'border-emerald-500' : ''}
            `}
          />
        ) : (
          <input
            id={inputId}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type === 'tel' ? 'text' : type}
            inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : type === 'url' ? 'url' : 'text'}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`
              w-full bg-transparent border-0 border-b-2 outline-none
              text-base sm:text-xl md:text-2xl text-white placeholder:text-white/30
              py-3 pr-10 transition-all duration-200
              ${isFocused ? 'border-emerald-500' : 'border-white/20'}
              ${error ? 'border-red-500' : ''}
              ${isValid && value.trim() ? 'border-emerald-500' : ''}
            `}
          />
        )}

        {/* Indicador de sucesso/erro */}
        <AnimatePresence mode="wait">
          {isValid && value.trim() && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
            >
              <Check size={18} className="text-emerald-500" />
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"
            >
              <AlertCircle size={18} className="text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Focus glow effect */}
        {isFocused && !error && (
          <motion.div
            layoutId="input-glow"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Email suggestions dropdown */}
        <AnimatePresence>
          {emailSuggestions.length > 0 && isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 top-full mt-2 bg-neutral-900/95 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl"
            >
              {emailSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => applySuggestion(suggestion)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  className={`
                    w-full px-4 py-3 text-left text-sm transition-colors
                    flex items-center gap-2
                    ${index === selectedSuggestionIndex
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-white/70 hover:bg-white/5'
                    }
                  `}
                >
                  <span className="text-white/40">@</span>
                  <span>{suggestion.split('@')[1]}</span>
                  {index === selectedSuggestionIndex && (
                    <span className="ml-auto text-[10px] text-white/30">
                      Tab ou Enter
                    </span>
                  )}
                </button>
              ))}
              <div className="px-4 py-2 border-t border-white/5 text-[10px] text-white/30">
                Use ↑↓ para navegar
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Typo suggestion */}
      <AnimatePresence>
        {typoSuggestion && !error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-3 flex items-center gap-2"
          >
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-amber-400/80 text-sm">Voce quis dizer</span>
            <button
              type="button"
              onClick={applyTypoCorrection}
              className="text-emerald-400 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              {typoSuggestion}
            </button>
            <span className="text-white/30 text-sm">?</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${inputId}-error`}
            role="alert"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="text-red-400 text-sm mt-2 flex items-center gap-2"
          >
            <AlertCircle size={14} />
            {currentErrorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit Action */}
      <div className="mt-8 w-full flex flex-col items-center gap-4">
        <GlowButton
          onClick={handleSubmit}
          disabled={!value.trim()}
          fullWidth
          className="max-w-[200px]"
        >
          Confirmar
        </GlowButton>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/30 text-xs flex items-center gap-1.5"
        >
          <span>ou pressione</span>
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 font-mono">Enter</kbd>
        </motion.p>
      </div>
    </div>
  )
}
