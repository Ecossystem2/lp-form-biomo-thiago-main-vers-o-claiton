'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, PartyPopper } from 'lucide-react'

type CelebrationType = 'sparkle' | 'confetti' | 'checkmark'

interface CelebrationEffectProps {
  type: CelebrationType
  message?: string
  duration?: number
  onComplete?: () => void
}

// Gera partículas determinísticas baseadas no índice
function generateParticle(index: number) {
  // Usando uma seed baseada no índice para gerar valores pseudo-aleatórios consistentes
  const seed = index * 9301 + 49297
  const random1 = ((seed % 233280) / 233280)
  const random2 = (((seed * 2) % 233280) / 233280)
  const random3 = (((seed * 3) % 233280) / 233280)
  const random4 = (((seed * 4) % 233280) / 233280)

  const colors = ['#10b981', '#6ee7b7', '#fbbf24', '#f472b6', '#60a5fa']

  return {
    id: index,
    x: random1 * 100,
    delay: random2 * 0.5,
    duration: 1 + random3 * 1,
    color: colors[Math.floor(random4 * 5)],
    rotateDir: random1 > 0.5 ? 1 : -1
  }
}

// Componente de partículas para confetti
function ConfettiParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => generateParticle(i)),
    []
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${p.x}%`,
            top: '-10px',
            backgroundColor: p.color
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            opacity: [1, 1, 0],
            rotate: 360 * p.rotateDir
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn'
          }}
        />
      ))}
    </div>
  )
}

// Componente de sparkles
function SparkleEffect() {
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
    delay: i * 0.05
  }))

  return (
    <div className="relative w-20 h-20">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <Sparkles size={28} className="text-white" />
        </div>
      </motion.div>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-2 h-2 rounded-full bg-emerald-400"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -4,
            marginTop: -4
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos(s.angle * Math.PI / 180) * 50,
            y: Math.sin(s.angle * Math.PI / 180) * 50
          }}
          transition={{
            duration: 0.6,
            delay: s.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}

// Componente de checkmark
function CheckmarkEffect() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 10, stiffness: 200 }}
      className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center"
    >
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Check size={40} className="text-white" strokeWidth={3} />
      </motion.div>
    </motion.div>
  )
}

export function CelebrationEffect({ type, message, duration = 2000, onComplete }: CelebrationEffectProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay escuro - pointer-events-none para não bloquear interações */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-none"
          />

          {/* Conteúdo centralizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
          >
            {type === 'sparkle' && <SparkleEffect />}
            {type === 'checkmark' && <CheckmarkEffect />}
            {type === 'confetti' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
              >
                <PartyPopper size={36} className="text-white" />
              </motion.div>
            )}

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg font-semibold text-white text-center"
              >
                {message}
              </motion.p>
            )}
          </motion.div>

          {/* Confetti particles */}
          {type === 'confetti' && <ConfettiParticles />}
        </>
      )}
    </AnimatePresence>
  )
}

// Hook para disparar celebrações
export function useCelebration() {
  const [celebration, setCelebration] = useState<{
    type: CelebrationType
    message?: string
  } | null>(null)

  const celebrate = (type: CelebrationType, message?: string) => {
    setCelebration({ type, message })
  }

  const clearCelebration = () => {
    setCelebration(null)
  }

  return { celebration, celebrate, clearCelebration }
}
