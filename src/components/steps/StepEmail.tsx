'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/hooks/useAppStore'
import { useState, useEffect, useRef } from 'react'

export function StepEmail() {
  const { formData, setFormData, nextStep, prevStep } = useAppStore()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email e obrigatorio'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalido'
    return ''
  }

  const isValid = !validateEmail(email)

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    setTouched(true)

    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }

    setFormData({ email: email.trim().toLowerCase() })
    nextStep()
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isValid) {
        handleSubmit()
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [isValid, email])

  const handleChange = (value: string) => {
    setEmail(value)
    if (touched) {
      setError(validateEmail(value))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-xl mx-auto w-full text-center">
        {/* Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-5xl mb-6"
        >
          📧
        </motion.div>

        {/* Saudacao personalizada */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
        >
          Obrigado, <span className="text-emerald-400">{formData.nome}</span>!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 mb-8 text-lg"
        >
          Qual e o seu melhor email?
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-zinc-500 mb-6 text-sm"
        >
          Vamos enviar a proposta personalizada por la
        </motion.p>

        {/* Input */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={() => {
                setTouched(true)
                setError(validateEmail(email))
              }}
              placeholder="seu@email.com"
              className={`w-full text-center text-2xl sm:text-3xl font-medium bg-transparent border-b-2 py-4 outline-none transition-colors ${
                error && touched
                  ? 'border-red-500 text-red-400 placeholder-red-400/50'
                  : 'border-zinc-700 focus:border-emerald-500 text-white placeholder-zinc-600'
              }`}
              autoComplete="email"
            />

            {error && touched && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}
          </div>

          {/* Botao */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isValid ? 1 : 0.3 }}
            className="pt-8"
          >
            <motion.button
              type="submit"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.05 } : {}}
              whileTap={isValid ? { scale: 0.95 } : {}}
              className={`px-10 py-4 rounded-full font-bold text-lg transition-all ${
                isValid
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-3">
                Continuar
                <motion.span
                  animate={isValid ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            {isValid && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-zinc-600 flex items-center justify-center gap-2"
              >
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">Enter ↵</kbd>
              </motion.p>
            )}
          </motion.div>
        </motion.form>

        {/* Voltar */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={prevStep}
          className="mt-8 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Voltar
        </motion.button>
      </div>
    </motion.div>
  )
}
