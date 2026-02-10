'use client'

import { motion } from 'framer-motion'
import { AVAILABLE_FEATURES } from '@/hooks/useAppStore'

interface FeatureChipsProps {
  selected: string[]
  onChange: (selected: string[]) => void
}

export function FeatureChips({ selected, onChange }: FeatureChipsProps) {
  const toggleFeature = (featureId: string) => {
    if (selected.includes(featureId)) {
      onChange(selected.filter(id => id !== featureId))
    } else {
      onChange([...selected, featureId])
    }
  }

  return (
    <div className="w-full">
      {/* Scrollable container */}
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_FEATURES.map((feature, index) => {
          const isSelected = selected.includes(feature.id)

          return (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => toggleFeature(feature.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all
                ${isSelected
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                  : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">{feature.icon}</span>
              <span className="text-sm font-medium whitespace-nowrap">{feature.label}</span>

              {/* Checkmark when selected */}
              {isSelected && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Selected count */}
      {selected.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-zinc-500"
        >
          {selected.length} {selected.length === 1 ? 'funcionalidade selecionada' : 'funcionalidades selecionadas'}
        </motion.p>
      )}
    </div>
  )
}
