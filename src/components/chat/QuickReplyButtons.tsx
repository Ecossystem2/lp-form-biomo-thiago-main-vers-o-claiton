'use client'

import { useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface QuickReplyOption {
  id: string
  label: string
  description?: string
  icon?: string
}

interface QuickReplyButtonsProps {
  options: QuickReplyOption[]
  onSelect: (selected: string | string[]) => void
  multiSelect?: boolean
  columns?: 1 | 2
  disabled?: boolean
}

export function QuickReplyButtons({
  options,
  onSelect,
  multiSelect = false,
  columns = 1,
  disabled = false
}: QuickReplyButtonsProps) {
  const [selected, setSelected] = useState<string[]>([])

  const handleSelect = (id: string) => {
    if (disabled) return

    if (multiSelect) {
      const newSelected = selected.includes(id)
        ? selected.filter(s => s !== id)
        : [...selected, id]
      setSelected(newSelected)
    } else {
      onSelect(id)
    }
  }

  const handleConfirm = () => {
    if (selected.length > 0) {
      onSelect(selected)
    }
  }

  return (
    <div className="px-4 py-4 space-y-3 border-t border-white/10">
      <div
        className={`grid gap-2 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
      >
        {options.map((option, index) => {
          const isSelected = selected.includes(option.id)

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(option.id)}
              disabled={disabled}
              className={`
                group relative flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 text-left
                ${isSelected
                  ? 'bg-emerald-500/20 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }
                border
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {option.icon && (
                <span className="text-xl shrink-0">{option.icon}</span>
              )}
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium block ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-white/50 mt-0.5 block truncate">
                    {option.description}
                  </span>
                )}
              </div>
              {multiSelect ? (
                <div className={`
                  w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                  ${isSelected
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-white/30 group-hover:border-white/50'
                  }
                `}>
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
              ) : (
                <ChevronRight
                  size={16}
                  className={`shrink-0 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-emerald-400' : 'text-white/30'}`}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Confirm button for multi-select */}
      {multiSelect && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleConfirm}
          disabled={disabled || selected.length === 0}
          className={`
            w-full py-3 rounded-xl font-medium text-sm transition-all duration-200
            ${selected.length > 0
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/25'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
            }
          `}
        >
          {selected.length > 0
            ? `Confirmar (${selected.length} selecionado${selected.length > 1 ? 's' : ''})`
            : 'Selecione pelo menos uma opção'
          }
        </motion.button>
      )}
    </div>
  )
}
