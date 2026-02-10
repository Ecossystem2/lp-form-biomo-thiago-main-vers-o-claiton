'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/hooks/useAppStore'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { PortfolioModal } from '@/components/PortfolioModal'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
}

// Labels para exibicao
const projectTypeLabels = {
  simples: { title: 'Presenca Digital', icon: '🚀' },
  institucional: { title: 'Site Institucional', icon: '💼' },
  personalizado: { title: 'Solucao Personalizada', icon: '⚡' }
}

const situationLabels = {
  no_site: 'Primeiro site',
  new_site: 'Site novo (tem atual)',
  improve_site: 'Melhorias no site atual'
}

const budgetLabels = {
  yes: 'Dentro do orcamento',
  evaluate: 'Precisa avaliar',
  no: 'Acima do orcamento'
}

// Helper para obter window size no cliente
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial size
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateSize()

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export function StepSuccess() {
  const { formData, reset } = useAppStore()
  const windowSize = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(true)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [showRedirect, setShowRedirect] = useState(false)

  const projectInfo = formData.projectType ? projectTypeLabels[formData.projectType] : null

  useEffect(() => {
    // Para o confetti apos 5 segundos
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000)

    // Mostra mensagem de redirect apos 6 segundos
    const redirectMsgTimer = setTimeout(() => setShowRedirect(true), 6000)

    // Redireciona apos 10 segundos
    const redirectTimer = setTimeout(() => {
      window.location.href = '/sucesso'
    }, 10000)

    return () => {
      clearTimeout(confettiTimer)
      clearTimeout(redirectMsgTimer)
      clearTimeout(redirectTimer)
    }
  }, [])

  const handleNewRequest = () => {
    reset()
    window.location.reload()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#ffffff']}
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto w-full text-center"
      >
        {/* Success icon */}
        <motion.div variants={checkVariants} className="mb-8">
          <div className="relative inline-flex">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-emerald-500/30 animate-ping" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Perfeito, <span className="text-emerald-400">{formData.nome}</span>!
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Voce recebera uma mensagem no WhatsApp em ate 2 horas
          </p>
        </motion.div>

        {/* Summary card */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8 text-left"
        >
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
            Resumo do seu pedido
          </h3>

          <div className="space-y-4">
            {/* Contact info */}
            <div className="flex items-start gap-4 pb-4 border-b border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">👤</span>
              </div>
              <div>
                <p className="font-medium text-white">{formData.nome}</p>
                <p className="text-sm text-zinc-500">{formData.whatsapp}</p>
                <p className="text-sm text-zinc-500">{formData.email}</p>
                {formData.empresa && (
                  <p className="text-sm text-zinc-500">{formData.empresa}</p>
                )}
              </div>
            </div>

            {/* Project type */}
            {projectInfo && (
              <div className="flex items-start gap-4 pb-4 border-b border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{projectInfo.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{projectInfo.title}</p>
                  {formData.situation && (
                    <p className="text-sm text-zinc-500">{situationLabels[formData.situation]}</p>
                  )}
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-zinc-400">
                  {formData.demandType === 'pf' ? 'Pessoa Fisica' : 'Pessoa Juridica'}
                </span>
              </div>
              {formData.budgetFit && (
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-400">{budgetLabels[formData.budgetFit]}</span>
                </div>
              )}
              {formData.additional && (
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-400 line-clamp-2">{formData.additional}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
            Proximos passos
          </h3>
          <div className="space-y-3">
            {[
              { icon: '1️⃣', text: 'Analisamos suas necessidades' },
              { icon: '2️⃣', text: 'Preparamos uma proposta personalizada' },
              { icon: '3️⃣', text: 'Entramos em contato via WhatsApp' }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-left">
                <span className="text-xl">{step.icon}</span>
                <span className="text-zinc-400">{step.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 mb-8"
        >
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-zinc-400">
            &quot;Atendimento incrivel e site ficou melhor do que imaginei!&quot;
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            - Maria S., Clinica Estetica
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={() => setShowPortfolio(true)}
            className="block w-full py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all duration-300 text-center"
          >
            Ver nosso portfolio
          </button>

          <button
            onClick={handleNewRequest}
            className="block w-full py-3 px-6 text-zinc-500 hover:text-zinc-300 font-medium rounded-xl transition-all duration-300 text-center"
          >
            Fazer nova solicitacao
          </button>
        </motion.div>

        {/* Redirect notice */}
        {showRedirect && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-sm text-zinc-600"
          >
            Redirecionando em instantes...
          </motion.p>
        )}
      </motion.div>

      {/* Portfolio Modal */}
      <PortfolioModal isOpen={showPortfolio} onClose={() => setShowPortfolio(false)} />
    </motion.div>
  )
}
