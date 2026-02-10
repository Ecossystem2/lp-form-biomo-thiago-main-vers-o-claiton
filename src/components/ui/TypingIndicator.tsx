'use client'

import { motion } from 'framer-motion'

interface TypingIndicatorProps {
  text?: string
  className?: string
}

export function TypingIndicator({ text = 'Biomo esta digitando', className = '' }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center gap-2 text-white/50 text-sm ${className}`}
    >
      <span>{text}</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Mini feedback positivo para transições
interface MicroFeedbackProps {
  message: string
  emoji?: string
  className?: string
}

export function MicroFeedback({ message, emoji = '✓', className = '' }: MicroFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      className={`flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium ${className}`}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
      >
        {emoji}
      </motion.span>
      <span>{message}</span>
    </motion.div>
  )
}

// Mensagens de feedback por etapa
export const STEP_FEEDBACK: Record<string, { message: string; emoji: string }> = {
  name: { message: 'Prazer em conhecer!', emoji: '👋' },
  email: { message: 'Perfeito!', emoji: '✅' },
  whatsapp: { message: 'Otimo, ja anotei!', emoji: '📱' },
  demand_type: { message: 'Entendi!', emoji: '👍' },
  company_name: { message: 'Show!', emoji: '🏢' },
  situation: { message: 'Faz sentido!', emoji: '💡' },
  project_type: { message: 'Escolha certeira!', emoji: '🎯' },
  urgency: { message: 'Anotado!', emoji: '⏰' },
  features: { message: 'Vai ficar incrivel!', emoji: '✨' },
  budget_fit: { message: 'Combinado!', emoji: '🤝' },
  has_logo: { message: 'Certo!', emoji: '🎨' },
  logo_upload: { message: 'Logo linda!', emoji: '💎' },
  brand_colors: { message: 'Cores salvas!', emoji: '🌈' },
  has_references: { message: 'Isso ajuda muito!', emoji: '💡' },
  reference_sites: { message: 'Boas referencias!', emoji: '🔗' },
  additional_notes: { message: 'Valeu pelo detalhe!', emoji: '📝' },
  lgpd: { message: 'Tudo certo!', emoji: '🔒' }
}
