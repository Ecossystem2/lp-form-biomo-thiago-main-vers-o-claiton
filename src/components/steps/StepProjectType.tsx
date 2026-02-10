'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, ProjectType, UrgencyType } from '@/hooks/useAppStore'

interface OptionProps {
  icon: string
  title: string
  description: string
  selected: boolean
  onClick: () => void
  delay: number
  compact?: boolean
}

function Option({ icon, title, description, selected, onClick, delay, compact }: OptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full ${compact ? 'p-4' : 'p-5'} rounded-xl border-2 text-left transition-all ${
        selected
          ? 'border-emerald-500 bg-emerald-500/10'
          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'
      }`}
    >
      <div className="flex items-start gap-4">
        <span className={compact ? 'text-2xl' : 'text-3xl'}>{icon}</span>
        <div className="flex-1">
          <h3 className={`${compact ? 'text-base' : 'text-lg'} font-bold ${selected ? 'text-emerald-400' : 'text-white'}`}>
            {title}
          </h3>
          <p className="text-zinc-500 text-sm mt-1">{description}</p>
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
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

export function StepProjectType() {
  const { formData, setFormData, nextStep, prevStep } = useAppStore()

  const handleSelectType = (type: ProjectType) => {
    setFormData({ projectType: type })
  }

  const handleSelectUrgency = (urgency: UrgencyType) => {
    setFormData({ urgency })
  }

  const handleContinue = () => {
    if (formData.projectType && formData.urgency) {
      nextStep()
    }
  }

  const canContinue = formData.projectType && formData.urgency

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
            🎯
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            O que melhor descreve o que voce precisa?
          </h2>

          <p className="text-zinc-400">
            Trabalhamos de diferentes formas dependendo da necessidade
          </p>
        </motion.div>

        {/* Project Type Options */}
        <div className="space-y-3 mb-6">
          <Option
            icon="🚀"
            title="Presenca digital profissional"
            description="Site rapido, moderno e funcional. Entrega agil para comecar a ter resultados logo."
            selected={formData.projectType === 'simples'}
            onClick={() => handleSelectType('simples')}
            delay={0.3}
          />

          <Option
            icon="💼"
            title="Site institucional completo"
            description="Design exclusivo, SEO avancado e varias paginas. Ideal para empresas consolidadas."
            selected={formData.projectType === 'institucional'}
            onClick={() => handleSelectType('institucional')}
            delay={0.4}
          />

          <Option
            icon="⚡"
            title="Solucao personalizada"
            description="E-commerce, integracoes, sistemas ou funcionalidades especificas."
            selected={formData.projectType === 'personalizado'}
            onClick={() => handleSelectType('personalizado')}
            delay={0.5}
          />
        </div>

        {/* Urgency Section - Appears after selecting project type */}
        <AnimatePresence>
          {formData.projectType && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-sm text-zinc-500">E qual o prazo ideal?</span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              {/* Urgency Options */}
              <div className="space-y-2">
                <Option
                  icon="⚡"
                  title="Tenho pressa!"
                  description="Preciso do site pronto em ate 2 semanas"
                  selected={formData.urgency === 'urgent'}
                  onClick={() => handleSelectUrgency('urgent')}
                  delay={0}
                  compact
                />

                <Option
                  icon="📅"
                  title="Prazo normal"
                  description="Entre 30-60 dias esta otimo pra mim"
                  selected={formData.urgency === 'normal'}
                  onClick={() => handleSelectUrgency('normal')}
                  delay={0.1}
                  compact
                />

                <Option
                  icon="🧘"
                  title="Sem pressa"
                  description="Pode levar o tempo que precisar para ficar perfeito"
                  selected={formData.urgency === 'flexible'}
                  onClick={() => handleSelectUrgency('flexible')}
                  delay={0.2}
                  compact
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
