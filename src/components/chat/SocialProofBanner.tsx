'use client'

import { motion } from 'framer-motion'
import { Zap, Star, Shield, TrendingUp } from 'lucide-react'
import { AnimatedCounter } from '../ui/AnimatedCounter'

interface SocialProofBannerProps {
  variant?: 'compact' | 'expanded'
  animated?: boolean
}

const stats = [
  {
    icon: Zap,
    numericValue: 147,
    suffix: '+',
    label: 'Sites entregues',
    shortLabel: 'sites'
  },
  {
    icon: Star,
    numericValue: 5.0,
    suffix: '',
    label: 'Avaliação média',
    shortLabel: 'nota',
    isDecimal: true
  },
  {
    icon: Shield,
    numericValue: 100,
    suffix: '%',
    label: 'Satisfação',
    shortLabel: 'felizes'
  }
]

export function SocialProofBanner({ variant = 'compact', animated = true }: SocialProofBannerProps) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={animated ? { opacity: 0, y: -10 } : false}
        animate={{ opacity: 1, y: 0 }}
        className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-950/50 to-emerald-900/30 border-b border-emerald-500/20 rounded-lg sm:rounded-none"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={animated ? { opacity: 0, scale: 0.8 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1 sm:gap-1.5"
              >
                <Icon size={10} className="sm:w-3 sm:h-3 text-emerald-400" />
                <span className="font-semibold text-emerald-400">
                  {animated ? (
                    <AnimatedCounter
                      end={stat.numericValue}
                      suffix={stat.suffix}
                      duration={1.5}
                    />
                  ) : (
                    `${stat.numericValue}${stat.suffix}`
                  )}
                </span>
                <span className="text-white/50 hidden sm:inline">{stat.shortLabel}</span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  // Variant expanded - para desktop
  return (
    <motion.div
      initial={animated ? { opacity: 0, x: 20 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="p-4 border-b border-white/10"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-emerald-400" />
        <span className="text-sm font-medium text-white/80">Sites profissionais que convertem visitantes em clientes</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={animated ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <Icon size={16} />
                <span className="text-lg font-bold">
                  {animated ? (
                    <AnimatedCounter
                      end={stat.numericValue}
                      suffix={stat.suffix}
                      duration={1.8}
                    />
                  ) : (
                    `${stat.numericValue}${stat.suffix}`
                  )}
                </span>
              </div>
              <span className="text-[10px] text-white/50 text-center leading-tight">
                {stat.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Trust message */}
      <motion.p
        initial={animated ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-xs text-white/40 text-center"
      >
        Empresas que usam nossos sites profissionais para gerar leads e vendas todos os dias
      </motion.p>
    </motion.div>
  )
}
