'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/hooks/useAppStore'
import { useState, useEffect, useRef } from 'react'

export function StepCompanyName() {
  const { formData, setFormData, nextStep, prevStep } = useAppStore()
  const [empresa, setEmpresa] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Considera valido se tem pelo menos 2 caracteres ou "em definicao"
  const isValid = empresa.trim().length >= 2

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!isValid) return

    setFormData({ empresa: empresa.trim() })
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
  }, [isValid, empresa])

  const handleEmDefinicao = () => {
    setEmpresa('Em definicao')
    setFormData({ empresa: 'Em definicao' })
    setTimeout(() => nextStep(), 300)
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
          🏢
        </motion.div>

        {/* Pergunta */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Qual o nome da empresa?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 mb-8"
        >
          Vamos usar na proposta e no contrato
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
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Nome da empresa..."
              className="w-full text-center text-2xl sm:text-3xl font-bold bg-transparent border-b-2 border-zinc-700 focus:border-emerald-500 text-white placeholder-zinc-600 py-4 outline-none transition-colors"
              autoComplete="organization"
            />
          </div>

          {/* Link "em definicao" */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleEmDefinicao}
            className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            Ainda nao tem nome? Clique aqui →
          </motion.button>

          {/* Botao */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isValid ? 1 : 0.3 }}
            className="pt-4"
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
