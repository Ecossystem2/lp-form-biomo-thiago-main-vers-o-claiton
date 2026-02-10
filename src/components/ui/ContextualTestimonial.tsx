'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Shield, Lock, Quote } from 'lucide-react'

// Depoimentos por contexto/etapa
const TESTIMONIALS: Record<string, { text: string; author: string; role: string }[]> = {
  price: [
    {
      text: 'O investimento se pagou em menos de 2 meses com os novos clientes!',
      author: 'Carlos M.',
      role: 'Advogado'
    },
    {
      text: 'Melhor custo-beneficio que encontrei. Site ficou incrivel!',
      author: 'Ana P.',
      role: 'Dentista'
    }
  ],
  quality: [
    {
      text: 'Design moderno e profissional. Meus clientes elogiam muito!',
      author: 'Roberto S.',
      role: 'Arquiteto'
    },
    {
      text: 'Superou todas as expectativas. Recomendo de olhos fechados!',
      author: 'Juliana L.',
      role: 'Nutricionista'
    }
  ],
  speed: [
    {
      text: 'Site ficou pronto em 5 dias! Muito rapido e eficiente.',
      author: 'Pedro H.',
      role: 'Personal Trainer'
    },
    {
      text: 'Entrega no prazo prometido. Equipe muito profissional.',
      author: 'Mariana C.',
      role: 'Psicologa'
    }
  ],
  trust: [
    {
      text: 'Empresa seria e confiavel. Atendimento impecavel do inicio ao fim.',
      author: 'Fernando A.',
      role: 'Empresario'
    },
    {
      text: 'Transparencia total no processo. Me senti segura durante todo o projeto.',
      author: 'Beatriz R.',
      role: 'Fotografa'
    }
  ]
}

// Mapeamento de etapas para contexto de depoimento
const STEP_TO_CONTEXT: Record<string, string> = {
  project_type: 'price',
  budget_fit: 'price',
  urgency: 'speed',
  features: 'quality',
  lgpd: 'trust',
  email: 'trust',
  whatsapp: 'trust'
}

interface ContextualTestimonialProps {
  step: string
  className?: string
}

export function ContextualTestimonial({ step, className = '' }: ContextualTestimonialProps) {
  const context = STEP_TO_CONTEXT[step]
  if (!context) return null

  const testimonials = TESTIMONIALS[context]
  if (!testimonials?.length) return null

  // Selecionar depoimento baseado no step (deterministico)
  const testimonial = testimonials[step.length % testimonials.length]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.5 }}
        className={`bg-white/5 border border-white/10 rounded-xl p-4 ${className}`}
      >
        <div className="flex gap-3">
          <Quote size={20} className="text-emerald-500/50 shrink-0 mt-1" />
          <div>
            <p className="text-white/70 text-sm italic leading-relaxed">
              "{testimonial.text}"
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/50 text-xs">
                — {testimonial.author}, {testimonial.role}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Selo de segurança
interface SecurityBadgeProps {
  variant?: 'minimal' | 'full'
  className?: string
}

export function SecurityBadge({ variant = 'minimal', className = '' }: SecurityBadgeProps) {
  if (variant === 'minimal') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`flex items-center justify-center gap-2 text-white/30 text-xs ${className}`}
      >
        <Lock size={12} />
        <span>Dados protegidos com criptografia</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
        <Shield size={20} className="text-emerald-400" />
      </div>
      <div>
        <p className="text-emerald-400 text-sm font-medium">Seus dados estao seguros</p>
        <p className="text-white/40 text-xs">Protegidos por criptografia SSL e LGPD</p>
      </div>
    </motion.div>
  )
}
