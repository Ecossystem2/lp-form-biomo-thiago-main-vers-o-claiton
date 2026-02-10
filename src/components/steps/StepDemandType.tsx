'use client'

import { motion } from 'framer-motion'
import { useAppStore, DemandType } from '@/hooks/useAppStore'

interface OptionProps {
  icon: string
  title: string
  description: string
  value: DemandType
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
      className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
        selected
          ? 'border-emerald-500 bg-emerald-500/10'
          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${selected ? 'text-emerald-400' : 'text-white'}`}>
            {title}
          </h3>
          <p className="text-zinc-400 mt-1">{description}</p>
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
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

export function StepDemandType() {
  const { formData, setFormData, nextStep, prevStep } = useAppStore()

  const handleSelect = (type: DemandType) => {
    setFormData({ demandType: type })
  }

  const handleContinue = () => {
    if (formData.demandType) {
      nextStep()
    }
  }

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
            🏢
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            E pra voce ou pra empresa, <span className="text-emerald-400">{formData.nome}</span>?
          </h2>

          <p className="text-zinc-400">
            Isso nos ajuda a personalizar a proposta
          </p>
        </motion.div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          <Option
            icon="👤"
            title="Pra mim (Pessoa Fisica)"
            description="Portfolio pessoal, projeto proprio, freelancer..."
            value="pf"
            selected={formData.demandType === 'pf'}
            onClick={() => handleSelect('pf')}
            delay={0.3}
          />

          <Option
            icon="🏢"
            title="Pra minha empresa"
            description="Site institucional, e-commerce, landing page..."
            value="pj"
            selected={formData.demandType === 'pj'}
            onClick={() => handleSelect('pj')}
            delay={0.4}
          />
        </div>

        {/* Botao continuar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: formData.demandType ? 1 : 0.3 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.button
            onClick={handleContinue}
            disabled={!formData.demandType}
            whileHover={formData.demandType ? { scale: 1.05 } : {}}
            whileTap={formData.demandType ? { scale: 0.95 } : {}}
            className={`px-10 py-4 rounded-full font-bold text-lg transition-all ${
              formData.demandType
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-3">
              Continuar
              <motion.span
                animate={formData.demandType ? { x: [0, 5, 0] } : {}}
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
          transition={{ delay: 0.6 }}
          onClick={prevStep}
          className="mt-8 w-full text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Voltar
        </motion.button>
      </div>
    </motion.div>
  )
}
