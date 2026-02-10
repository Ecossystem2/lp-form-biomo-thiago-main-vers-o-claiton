'use client'

import { useEffect, useMemo, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle } from 'lucide-react'
import { OptionModal } from '../ui/option-modal'

interface QuizOption {
  id: string
  label: string
  description?: string
  icon?: string
  explanation?: string
  benefits?: string[]
}

interface QuizOptionsProps {
  options: QuizOption[]
  selected: string | string[] | null
  onSelect: (id: string) => void
  multiSelect?: boolean
  columns?: 1 | 2
}

export function QuizOptions({
  options,
  selected,
  onSelect,
  multiSelect = false,
  columns = 1
}: QuizOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Derivar selectedIds do prop selected
  const selectedIds = useMemo(() => {
    if (selected === null) return []
    if (Array.isArray(selected)) return selected
    return [selected]
  }, [selected])

  const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds])

  const handleSelect = useCallback((id: string) => {
    onSelect(id)
  }, [onSelect])

  const openModal = (option: QuizOption, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedOption(option)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedOption(null), 300)
  }

  // Keyboard shortcuts (A, B, C, D...)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      const index = key.charCodeAt(0) - 65 // A=0, B=1, C=2, D=3
      if (index >= 0 && index < options.length) {
        handleSelect(options[index].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [options, handleSelect])

  const getShortcutKey = (index: number) => String.fromCharCode(65 + index)

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        role="listbox"
        aria-label="Selecione uma opção"
        aria-multiselectable={multiSelect}
        className={`grid gap-3 sm:gap-4 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}
      >
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(option.id)}
            role="option"
            aria-selected={isSelected(option.id)}
            aria-label={`${option.label}${option.description ? ` - ${option.description}` : ''} - Tecla ${getShortcutKey(index)}`}
            className={`
              group relative flex items-center gap-4 p-4 md:p-4 min-h-[60px] rounded-2xl
              text-left transition-all duration-300 focus:outline-none cursor-pointer
              ${isSelected(option.id)
                ? 'bg-emerald-950/40 border border-emerald-500/50 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] scale-[1.02] z-10'
                : 'bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.07] hover:scale-[1.01] hover:shadow-lg hover:shadow-emerald-500/5'
              }
            `}
          >
            {/* Help button (?) - replaces letter */}
            {(option.explanation || option.benefits) && (
              <button
                onClick={(e) => openModal(option, e)}
                className={`
                  shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                  transition-all duration-300 z-20
                  ${isSelected(option.id)
                    ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                    : 'bg-white/10 text-white/60 hover:bg-emerald-500/20 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/40'
                  }
                  hover:scale-110 hover:rotate-12
                `}
                aria-label={`Saiba mais sobre ${option.label}`}
              >
                <HelpCircle size={16} />
              </button>
            )}

            {/* Fallback to letter if no explanation */}
            {!option.explanation && !option.benefits && (
              <div className={`
                shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                font-mono text-sm font-semibold transition-colors
                ${isSelected(option.id)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white/70'
                }
              `}>
                {getShortcutKey(index)}
              </div>
            )}

            {/* Icon */}
            {option.icon && (
              <span className="text-2xl shrink-0">{option.icon}</span>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`font-medium transition-colors ${isSelected(option.id) ? 'text-white' : 'text-white/90'}`}>
                {option.label}
              </p>
              {option.description && (
                <p className="text-sm text-white/50 mt-0.5">{option.description}</p>
              )}
            </div>

            {/* Check mark */}
            {isSelected(option.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
              >
                <Check size={14} className="text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Multi-select hint */}
      {multiSelect && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/30 text-sm mt-4 text-center"
        >
          Selecione quantas opcoes quiser, depois pressione{' '}
          <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/50 text-xs font-mono">Enter</kbd>
        </motion.p>
      )}

      {/* Option Modal */}
      <OptionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        option={selectedOption ? {
          label: selectedOption.label,
          explanation: selectedOption.explanation || '',
          benefits: selectedOption.benefits || []
        } : null}
      />
    </div>
  )
}
