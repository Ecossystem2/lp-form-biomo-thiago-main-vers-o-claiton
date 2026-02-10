'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useAppStore } from '@/hooks/useAppStore'
import { useEffect, useState } from 'react'
import { FeatureChips } from '@/components/ui/FeatureChips'

// Contador animado
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { duration })
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v))
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [count, rounded, value, duration])

  return <span>{displayValue}</span>
}

// Informacoes de preco por tipo de projeto
const projectPrices = {
  simples: {
    price: 'R$ 997',
    priceValue: 997,
    description: 'Site landing page',
    includes: ['Design moderno', 'Mobile responsivo', 'Hospedagem 1 ano', 'Suporte 30 dias']
  },
  institucional: {
    price: 'R$ 2.497',
    priceValue: 2497,
    description: 'Site institucional completo',
    includes: ['Ate 10 paginas', 'SEO avancado', 'Hospedagem 1 ano', 'Suporte 60 dias']
  },
  personalizado: {
    price: 'Sob consulta',
    priceValue: 5000,
    description: 'Solucao customizada',
    includes: ['Projeto sob medida', 'Integracoes', 'E-commerce', 'Suporte dedicado']
  }
}

export function StepInvestment() {
  const { formData, setFormData, nextStep, prevStep } = useAppStore()
  const [showContent, setShowContent] = useState(false)

  const projectInfo = formData.projectType ? projectPrices[formData.projectType] : projectPrices.simples

  useEffect(() => {
    // Delay para criar expectativa
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleFeaturesChange = (features: string[]) => {
    setFormData({ desiredFeatures: features })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="max-w-xl mx-auto w-full">
        {/* Prova Social - Aparece primeiro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-5xl mb-4"
          >
            🎯
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Voce esta no lugar certo, <span className="text-emerald-400">{formData.nome}</span>!
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-8 mb-8"
        >
          {[
            { value: 147, suffix: '+', label: 'Sites entregues' },
            { value: 98, suffix: '%', label: 'Satisfacao' },
            { value: 4.9, suffix: '★', label: 'Avaliacao' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-white">
                {typeof stat.value === 'number' && stat.value > 10 ? (
                  <AnimatedCounter value={stat.value} duration={1.5} />
                ) : (
                  stat.value
                )}
                <span className="text-emerald-400">{stat.suffix}</span>
              </div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Quais funcionalidades voce precisa?
              </h3>
              <p className="text-sm text-zinc-500">
                Selecione todas que se aplicam (opcional)
              </p>
            </div>

            <FeatureChips
              selected={formData.desiredFeatures}
              onChange={handleFeaturesChange}
            />
          </motion.div>
        )}

        {/* Card de Investimento */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8"
          >
            <div className="text-center mb-6">
              <p className="text-zinc-400 text-sm mb-2">Para o que voce precisa:</p>
              <p className="text-zinc-300 font-medium">{projectInfo.description}</p>
            </div>

            {/* Preco */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="text-center mb-6"
            >
              <p className="text-sm text-zinc-500 mb-1">Investimento estimado</p>
              <p className="text-4xl sm:text-5xl font-bold text-emerald-400">
                {projectInfo.price}
              </p>
              {formData.projectType !== 'personalizado' && (
                <p className="text-sm text-zinc-500 mt-2">
                  ou ate 12x no cartao
                </p>
              )}
            </motion.div>

            {/* O que inclui */}
            <div className="space-y-2">
              {projectInfo.includes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Features selecionadas */}
            {formData.desiredFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-zinc-800"
              >
                <p className="text-xs text-zinc-500 mb-2">
                  + Funcionalidades selecionadas:
                </p>
                <p className="text-sm text-emerald-400">
                  {formData.desiredFeatures.length} {formData.desiredFeatures.length === 1 ? 'item' : 'itens'}
                </p>
              </motion.div>
            )}

            {/* Nota */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-xs text-zinc-600 text-center mt-6"
            >
              * Valor final depende da complexidade do projeto
            </motion.p>
          </motion.div>
        )}

        {/* Botao continuar */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <motion.button
              onClick={nextStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-bold text-lg bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30 transition-all"
            >
              <span className="flex items-center gap-3">
                Continuar
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Voltar */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          onClick={prevStep}
          className="mt-8 w-full text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Voltar
        </motion.button>
      </div>
    </motion.div>
  )
}
