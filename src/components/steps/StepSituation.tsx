'use client'

import { motion } from 'framer-motion'
import { useAppStore, SiteSituation } from '@/hooks/useAppStore'
import { useState } from 'react'

interface OptionProps {
  icon: string
  title: string
  description: string
  value: SiteSituation
  selected: boolean
  onClick: () => void
  delay: number
}

function Option({ icon, title, description, selected, onClick, delay }: OptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
        selected
          ? 'border-emerald-500 bg-emerald-500/10'
          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${selected ? 'text-emerald-400' : 'text-white'}`}>
            {title}
          </h3>
          <p className="text-zinc-500 text-sm">{description}</p>
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  )
}

export function StepSituation() {
  const { formData, setFormData, nextStep, prevStep } = useAppStore()
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  const isPJ = formData.demandType === 'pj'
  const entityName = isPJ ? 'sua empresa' : 'voce'

  const handleSelect = (situation: SiteSituation) => {
    setFormData({ situation })

    // Se tem site, mostra input de URL
    if (situation === 'new_site' || situation === 'improve_site') {
      setShowUrlInput(true)
    } else {
      setShowUrlInput(false)
      setCurrentUrl('')
      setFormData({ currentSiteUrl: '' })
    }
  }

  const handleContinue = () => {
    if (formData.situation) {
      // Se precisa de URL e tem URL preenchida, salva
      if (showUrlInput && currentUrl) {
        setFormData({ currentSiteUrl: currentUrl })
      }
      nextStep()
    }
  }

  const canContinue = formData.situation && (!showUrlInput || currentUrl.length > 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-5xl mb-6"
          >
            🌐
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Legal, <span className="text-emerald-400">{formData.nome}</span>!
          </h2>

          <p className="text-xl text-zinc-300">
            {isPJ ? 'A empresa' : 'Voce'} ja tem um site?
          </p>
        </motion.div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <Option
            icon="🆕"
            title="Nao tenho site ainda"
            description="Sera o primeiro site"
            value="no_site"
            selected={formData.situation === 'no_site'}
            onClick={() => handleSelect('no_site')}
            delay={0.3}
          />

          <Option
            icon="🔄"
            title="Tenho, mas quero um novo"
            description="Refazer do zero com design moderno"
            value="new_site"
            selected={formData.situation === 'new_site'}
            onClick={() => handleSelect('new_site')}
            delay={0.4}
          />

          <Option
            icon="✨"
            title="Tenho, mas precisa de melhorias"
            description="Ajustes, atualizacoes ou novas funcionalidades"
            value="improve_site"
            selected={formData.situation === 'improve_site'}
            onClick={() => handleSelect('improve_site')}
            delay={0.5}
          />
        </div>

        {/* Input de URL (condicional) */}
        {showUrlInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6"
          >
            <label className="block text-sm text-zinc-400 mb-2 text-center">
              Qual o endereco do site atual?
            </label>
            <input
              type="url"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder="https://seusite.com.br"
              className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all text-center"
            />
            <p className="text-xs text-zinc-600 mt-2 text-center">
              Mesmo que esteja fora do ar, pode compartilhar
            </p>
          </motion.div>
        )}

        {/* Botao continuar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: canContinue ? 1 : 0.3 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.button
            onClick={handleContinue}
            disabled={!canContinue}
            whileHover={canContinue ? { scale: 1.05 } : {}}
            whileTap={canContinue ? { scale: 0.95 } : {}}
            className={`px-10 py-4 rounded-full font-bold text-lg transition-all ${
              canContinue
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-3">
              Continuar
              <motion.span
                animate={canContinue ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Voltar */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={prevStep}
          className="mt-8 w-full text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Voltar
        </motion.button>
      </div>
    </motion.div>
  )
}
