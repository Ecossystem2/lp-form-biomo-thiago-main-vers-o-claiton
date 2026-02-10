'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Rocket, Building2, ShoppingCart, Wrench } from 'lucide-react'

interface ProjectTypeCardProps {
  id: string
  title: string
  description: string
  price: string
  features: string[]
  icon?: 'rocket' | 'building' | 'cart' | 'wrench'
  recommended?: boolean
  selected?: boolean
  onSelect: () => void
  index?: number
}

const iconMap = {
  rocket: Rocket,
  building: Building2,
  cart: ShoppingCart,
  wrench: Wrench
}

export function ProjectTypeCard({
  title,
  description,
  price,
  features,
  icon = 'rocket',
  recommended = false,
  selected = false,
  onSelect,
  index = 0
}: ProjectTypeCardProps) {
  const Icon = iconMap[icon]

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      role="option"
      aria-selected={selected}
      aria-label={`${title} - ${description} - ${price}${recommended ? ' - Recomendado' : ''}`}
      className={`
        relative w-full p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-left transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-[0.98]
        ${selected
          ? 'bg-emerald-500/20 border-2 border-emerald-500 ring-2 sm:ring-4 ring-emerald-500/20'
          : 'bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10'
        }
      `}
    >
      {/* Badge Recomendado */}
      {recommended && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold shadow-lg"
        >
          <Sparkles size={10} />
          <span>POPULAR</span>
        </motion.div>
      )}

      {/* Header com preço */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`
          w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0
          ${selected ? 'bg-emerald-500 text-white' : 'bg-white/10 text-emerald-400'}
        `}>
          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-xs sm:text-sm ${selected ? 'text-emerald-400' : 'text-white'}`}>
            {title}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-white/50 line-clamp-1">
            {description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[9px] sm:text-[10px] text-white/40">a partir de</div>
          <div className={`text-sm sm:text-base font-bold ${selected ? 'text-emerald-400' : 'text-white'}`}>
            {price}
          </div>
        </div>
      </div>

      {/* Features inline - hidden on very small screens */}
      <div className="hidden xs:flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 mt-2 pt-2 border-t border-white/5">
        {features.slice(0, 2).map((feature, i) => (
          <div key={i} className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px]">
            <Check size={9} className={`sm:w-[10px] sm:h-[10px] ${selected ? 'text-emerald-400' : 'text-emerald-500/70'}`} />
            <span className="text-white/60">{feature}</span>
          </div>
        ))}
      </div>

      {/* Selected indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
        >
          <Check size={14} className="text-white" />
        </motion.div>
      )}
    </motion.button>
  )
}

// Dados dos tipos de projeto
export const PROJECT_TYPES = [
  {
    id: 'simples',
    title: 'Presenca Digital',
    description: 'Ideal pra quem ta comecando',
    price: 'R$ 997',
    icon: 'rocket' as const,
    recommended: true,
    features: [
      'Pronto em ate 7 dias',
      'Design moderno e responsivo',
      'WhatsApp integrado'
    ]
  },
  {
    id: 'institucional',
    title: 'Site Profissional',
    description: 'Pra quem quer se destacar',
    price: 'R$ 2.497',
    icon: 'building' as const,
    features: [
      'Design exclusivo da sua marca',
      'SEO pra aparecer no Google',
      'Ate 10 paginas personalizadas'
    ]
  },
  {
    id: 'ecommerce',
    title: 'Loja Virtual',
    description: 'Pra vender online todo dia',
    price: 'R$ 4.999',
    icon: 'cart' as const,
    features: [
      'Carrinho e checkout completo',
      'Pagamentos integrados (Pix, cartao)'
    ]
  },
  {
    id: 'personalizado',
    title: 'Projeto Sob Medida',
    description: 'Pra necessidades especificas',
    price: 'Sob consulta',
    icon: 'wrench' as const,
    features: [
      'Funcionalidades exclusivas',
      'Desenvolvimento do zero'
    ]
  }
]

// Componente de lista de cards
interface ProjectTypeCardsProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ProjectTypeCards({ selectedId, onSelect }: ProjectTypeCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="listbox"
      aria-label="Selecione o tipo de projeto"
      className="space-y-3"
    >
      {PROJECT_TYPES.map((project, index) => (
        <ProjectTypeCard
          key={project.id}
          {...project}
          selected={selectedId === project.id}
          onSelect={() => onSelect(project.id)}
          index={index}
        />
      ))}
    </motion.div>
  )
}
