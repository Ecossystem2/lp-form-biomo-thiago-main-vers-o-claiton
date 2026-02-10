'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useAppStore } from '@/hooks/useAppStore'
import { useEffect, useState, useCallback } from 'react'
import { sendGTMEvent } from '@/components/GTMScript'
import { MacBookCarousel } from '@/components/MacBookCarousel'

// Typing effect hook
function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayText('')
    setIsComplete(false)
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayText, isComplete }
}

// Contador animado
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
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

export function StepIntro() {
  const nextStep = useAppStore((state) => state.nextStep)
  const [stage, setStage] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const messages = [
    "Oi! 👋",
    "Eu sou a Bia, da Biomo.",
    "Vou te ajudar a criar o site perfeito pro seu negócio.",
    "Leva menos de 2 minutos.",
    "Bora começar?"
  ]

  const { displayText, isComplete } = useTypewriter(messages[stage], 40)

  useEffect(() => {
    if (isComplete && stage < messages.length - 1) {
      const timer = setTimeout(() => setStage(s => s + 1), 800)
      return () => clearTimeout(timer)
    }
    if (isComplete && stage === messages.length - 1) {
      setTimeout(() => setShowButton(true), 500)
    }
  }, [isComplete, stage, messages.length])

  const handleStartFlow = useCallback(() => {
    sendGTMEvent('funnel_start', { step: 'intro' })
    nextStep()
  }, [nextStep])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && showButton) {
        handleStartFlow()
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [showButton, handleStartFlow])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8"
    >
      {/* Layout responsivo: chat + macbook lado a lado em desktop */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Chat container */}
        <div className="max-w-xl w-full">
        {/* Avatar + Messages */}
        <div className="flex items-start gap-4 mb-8">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-shrink-0"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30">
              🚀
            </div>
          </motion.div>

          {/* Message bubbles */}
          <div className="flex-1 space-y-3">
            {Array.from({ length: stage + 1 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                <div className={`px-5 py-3 rounded-2xl rounded-tl-md ${
                  i === stage
                    ? 'bg-zinc-800 text-white'
                    : 'bg-zinc-900/50 text-zinc-400'
                }`}>
                  <p className="text-lg sm:text-xl font-medium">
                    {i === stage ? displayText : messages[i]}
                    {i === stage && !isComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-0.5 h-5 bg-emerald-500 ml-1 align-middle"
                      />
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats - aparecem depois */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-8 mb-8"
          >
            {[
              { value: 147, suffix: '+', label: 'Sites criados' },
              { value: 98, suffix: '%', label: 'Satisfação' },
              { value: 4.9, suffix: '★', label: 'Avaliação' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
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
        )}

        {/* CTA Button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              onClick={handleStartFlow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xl rounded-full overflow-hidden shadow-xl shadow-emerald-500/30 transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Vamos la!
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-zinc-600 flex items-center gap-2"
            >
              <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">Enter ↵</kbd>
              <span>para continuar</span>
            </motion.p>
          </motion.div>
        )}

        {/* Typing indicator while loading */}
        {!showButton && stage === messages.length - 1 && isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <div className="flex gap-1 px-4 py-2 bg-zinc-800 rounded-full">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        </div>

        {/* MacBook Carousel - aparece após stage 1 */}
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block w-full max-w-2xl"
          >
            <MacBookCarousel />
          </motion.div>
        )}
      </div>

      {/* Floating elements - client only */}
      <FloatingElements />
    </motion.div>
  )
}

// Gerar particulas de forma deterministica
const FLOATING_PARTICLES = Array.from({ length: 15 }).map((_, i) => {
  const seed = i * 9301 + 49297
  const r1 = ((seed % 233280) / 233280)
  const r2 = (((seed * 2) % 233280) / 233280)
  const r3 = (((seed * 3) % 233280) / 233280)
  return {
    x: r1 * 100,
    y: r2 * 100,
    delay: r3 * 5
  }
})

// Componente separado para elementos flutuantes (client-only)
function FloatingElements() {
  // Usar 'use client' e verificar typeof window para SSR
  if (typeof window === 'undefined') return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {FLOATING_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-500/20 rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: p.delay
          }}
        />
      ))}
    </div>
  )
}
