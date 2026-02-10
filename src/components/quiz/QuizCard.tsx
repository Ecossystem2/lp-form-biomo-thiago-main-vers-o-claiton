'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { SecurityBadge, ContextualTestimonial } from '../ui/ContextualTestimonial'

interface QuizCardProps {
  icon?: string | ReactNode
  question: string
  subtitle?: string
  children: ReactNode
  stepKey: string
  onBack?: () => void
  canGoBack?: boolean
  timeEstimate?: string
  showSecurityBadge?: boolean
  showTestimonial?: boolean
  showKeyboardHints?: boolean
  size?: 'default' | 'large'
}

export function QuizCard({
  icon,
  question,
  subtitle,
  children,
  stepKey,
  onBack,
  canGoBack = false,
  timeEstimate,
  showSecurityBadge = false,
  showTestimonial = false,
  showKeyboardHints = true,
  size = 'default'
}: QuizCardProps) {
  const sizeClasses = {
    default: 'max-w-xl',
    large: 'max-w-2xl'
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={`w-full ${sizeClasses[size]} mx-auto`}
      >
        <div className="relative p-6 sm:p-8 rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] overflow-hidden">
          {/* Top Glow Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

          {/* Gradient glow effect - interno */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Header com botão voltar e tempo estimado */}
          {(canGoBack || timeEstimate) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mb-4 -mt-2"
            >
              {canGoBack && onBack ? (
                <button
                  onClick={onBack}
                  className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-sm group"
                  aria-label="Voltar para etapa anterior"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                  <span>Voltar</span>
                </button>
              ) : (
                <div />
              )}

              {timeEstimate && (
                <span className="text-white/30 text-xs">
                  {timeEstimate}
                </span>
              )}
            </motion.div>
          )}

          {/* Icon */}
          {icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className={`flex justify-center ${size === 'large' ? 'mb-3' : 'mb-6'}`}
            >
              {typeof icon === 'string' ? (
                <span className={size === 'large' ? 'text-3xl md:text-4xl' : 'text-5xl md:text-6xl'}>{icon}</span>
              ) : (
                icon
              )}
            </motion.div>
          )}

          {/* Question */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`font-semibold text-white text-center ${size === 'large' ? 'text-xl md:text-2xl mb-1' : 'text-2xl md:text-3xl mb-2'}`}
          >
            {question}
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={`text-white/50 text-center ${size === 'large' ? 'text-sm mb-3' : 'mb-6'}`}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Content (input, options, etc) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={size === 'large' ? 'mt-2' : 'mt-6'}
          >
            {children}
          </motion.div>

          {/* Security Badge */}
          {showSecurityBadge && (
            <SecurityBadge variant="minimal" className="mt-6" />
          )}

          {/* Contextual Testimonial */}
          {showTestimonial && (
            <ContextualTestimonial step={stepKey} className="mt-6" />
          )}

          {/* Keyboard shortcuts hint - hidden on large cards */}
          {size !== 'large' && showKeyboardHints && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 pt-4 border-t border-white/5"
            >
              <div className="flex items-center justify-center gap-4 text-[10px] text-white/20">
                {canGoBack && (
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-white/30 font-mono">Esc</kbd>
                    voltar
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-white/30 font-mono">Enter</kbd>
                  continuar
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
