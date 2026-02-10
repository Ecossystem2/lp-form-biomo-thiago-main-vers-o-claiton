'use client'

import { motion } from 'framer-motion'
import { User, Briefcase, Settings, CheckCircle } from 'lucide-react'

// Definição das fases do funil
const PHASES = [
  {
    name: 'Dados',
    icon: User,
    steps: ['intro', 'name', 'email', 'whatsapp']
  },
  {
    name: 'Projeto',
    icon: Briefcase,
    steps: ['demand_type', 'company_name', 'situation', 'current_site_url', 'project_type', 'urgency']
  },
  {
    name: 'Detalhes',
    icon: Settings,
    steps: ['features', 'budget_fit', 'has_logo', 'logo_upload', 'brand_colors', 'has_references', 'reference_sites']
  },
  {
    name: 'Finalizar',
    icon: CheckCircle,
    steps: ['additional_notes', 'lgpd', 'submitting', 'success']
  }
]

// Função para obter todos os steps em ordem
const getAllSteps = () => PHASES.flatMap(phase => phase.steps)

// Função para calcular progresso
export function getProgressInfo(currentStep: string) {
  const allSteps = getAllSteps()
  const currentIndex = allSteps.indexOf(currentStep)
  const totalSteps = allSteps.length
  const percent = currentIndex >= 0 ? Math.round(((currentIndex + 1) / totalSteps) * 100) : 0

  // Encontrar fase atual
  let currentPhase = 0
  let stepsInCurrentPhase = 0
  for (let i = 0; i < PHASES.length; i++) {
    if (PHASES[i].steps.includes(currentStep)) {
      currentPhase = i
      stepsInCurrentPhase = PHASES[i].steps.indexOf(currentStep) + 1
      break
    }
  }

  return {
    currentIndex: currentIndex + 1,
    totalSteps,
    percent,
    currentPhase,
    stepsInCurrentPhase,
    phaseName: PHASES[currentPhase]?.name || 'Início'
  }
}

interface ProgressBarProps {
  currentStep: string
  variant?: 'minimal' | 'detailed'
}

export function ProgressBar({ currentStep, variant = 'minimal' }: ProgressBarProps) {
  const { percent, currentPhase, phaseName, currentIndex, totalSteps } = getProgressInfo(currentStep)

  if (variant === 'minimal') {
    return (
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso: ${percent}% - ${phaseName} - Passo ${currentIndex} de ${totalSteps}`}
        className="py-2"
      >
        {/* Indicador de passo */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-zinc-500 font-medium">
            {phaseName} <span className="text-zinc-300 mx-1">•</span> Passo {currentIndex} de {totalSteps}
          </span>
          <span className="text-xs sm:text-sm font-bold text-emerald-600">
            {percent}%
          </span>
        </div>

        {/* Barra de progresso - altura maior para visibilidade */}
        <div className="w-full h-2 sm:h-2.5 bg-zinc-200 rounded-full overflow-hidden border border-zinc-100">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 relative"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Brilho na ponta */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    )
  }

  // Variant detailed - com fases visuais
  return (
    <div className="px-4 py-3 border-b border-white/10">
      {/* Fases */}
      <div className="flex items-center justify-between mb-3">
        {PHASES.map((phase, index) => {
          const Icon = phase.icon
          const isCompleted = index < currentPhase
          const isCurrent = index === currentPhase
          const isUpcoming = index > currentPhase

          return (
            <div key={phase.name} className="flex items-center">
              {/* Fase */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-colors
                    ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                    ${isCurrent ? 'bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/50' : ''}
                    ${isUpcoming ? 'bg-white/5 text-white/30' : ''}
                  `}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon size={16} />
                </motion.div>
                <span className={`
                  text-[10px] mt-1 font-medium
                  ${isCompleted ? 'text-emerald-400' : ''}
                  ${isCurrent ? 'text-white' : ''}
                  ${isUpcoming ? 'text-white/30' : ''}
                `}>
                  {phase.name}
                </span>
              </div>

              {/* Linha conectora */}
              {index < PHASES.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-white/10 relative overflow-hidden min-w-[20px]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Barra de progresso geral */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Percentual */}
      <div className="flex justify-end mt-1">
        <span className="text-xs font-medium text-emerald-400">{percent}% concluído</span>
      </div>
    </div>
  )
}
