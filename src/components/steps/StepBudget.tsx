'use client'

import { motion } from 'framer-motion'
import { useAppStore, BudgetFit } from '@/hooks/useAppStore'
import { sendGTMEvent } from '@/components/GTMScript'

interface OptionProps {
  icon: string
  title: string
  description: string
  value: BudgetFit
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
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <h3 className={`text-base font-bold ${selected ? 'text-emerald-400' : 'text-white'}`}>
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

export function StepBudget() {
  const { formData, setFormData, nextStep, prevStep } = useAppStore()

  const handleSelect = (budget: BudgetFit) => {
    setFormData({ budgetFit: budget })

    // Dispara evento GTM para segmentacao
    sendGTMEvent('budget_qualification', {
      budget_fit: budget,
      project_type: formData.projectType,
      demand_type: formData.demandType
    })
  }

  const handleContinue = () => {
    if (formData.budgetFit) {
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
            💰
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Sobre esse investimento...
          </h2>

          <p className="text-zinc-400">
            Isso nos ajuda a entender como podemos te ajudar melhor
          </p>
        </motion.div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          <Option
            icon="✅"
            title="Esta dentro do esperado!"
            description="Quero avancar e receber uma proposta"
            value="yes"
            selected={formData.budgetFit === 'yes'}
            onClick={() => handleSelect('yes')}
            delay={0.3}
          />

          <Option
            icon="🤔"
            title="Preciso avaliar melhor"
            description="Nao esta fora da realidade, mas quero pensar"
            value="evaluate"
            selected={formData.budgetFit === 'evaluate'}
            onClick={() => handleSelect('evaluate')}
            delay={0.4}
          />

          <Option
            icon="💬"
            title="Esta acima do orcamento"
            description="Mas podemos conversar sobre opcoes"
            value="no"
            selected={formData.budgetFit === 'no'}
            onClick={() => handleSelect('no')}
            delay={0.5}
          />
        </div>

        {/* Mensagem de reassurance */}
        {formData.budgetFit === 'no' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30"
          >
            <p className="text-blue-300 text-sm text-center">
              Sem problemas! Vamos conversar sobre alternativas que cabem no seu bolso.
            </p>
          </motion.div>
        )}

        {formData.budgetFit === 'evaluate' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
          >
            <p className="text-amber-300 text-sm text-center">
              Entendemos! Vamos enviar todos os detalhes pra voce analisar com calma.
            </p>
          </motion.div>
        )}

        {/* Botao continuar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: formData.budgetFit ? 1 : 0.3 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.button
            onClick={handleContinue}
            disabled={!formData.budgetFit}
            whileHover={formData.budgetFit ? { scale: 1.05 } : {}}
            whileTap={formData.budgetFit ? { scale: 0.95 } : {}}
            className={`px-10 py-4 rounded-full font-bold text-lg transition-all ${
              formData.budgetFit
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-3">
              Continuar
              <motion.span
                animate={formData.budgetFit ? { x: [0, 5, 0] } : {}}
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
