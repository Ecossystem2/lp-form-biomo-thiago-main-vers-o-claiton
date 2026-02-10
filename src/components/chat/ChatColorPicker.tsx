'use client'

import { useState } from 'react'
import { Plus, X, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatColorPickerProps {
  onSelect: (colors: string[]) => void
  onSkip?: () => void
  maxColors?: number
}

const PRESET_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F8B500', '#00CED1',
  '#FF69B4', '#20B2AA', '#FF7F50', '#9370DB',
  '#000000', '#333333', '#666666', '#FFFFFF'
]

export function ChatColorPicker({
  onSelect,
  onSkip,
  maxColors = 3
}: ChatColorPickerProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [customColor, setCustomColor] = useState('#10B981')
  const [showCustom, setShowCustom] = useState(false)

  const handleColorClick = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(prev => prev.filter(c => c !== color))
    } else if (selectedColors.length < maxColors) {
      setSelectedColors(prev => [...prev, color])
    }
  }

  const handleCustomAdd = () => {
    if (selectedColors.length < maxColors && !selectedColors.includes(customColor)) {
      setSelectedColors(prev => [...prev, customColor])
      setShowCustom(false)
    }
  }

  const handleConfirm = () => {
    if (selectedColors.length > 0) {
      onSelect(selectedColors)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-4 space-y-4 border-t border-white/10"
    >
      {/* Selected colors preview */}
      {selectedColors.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-xs text-white/50">
            Selecionadas:
          </span>
          <div className="flex gap-2">
            {selectedColors.map(color => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className="w-8 h-8 rounded-lg border-2 border-white/20 flex items-center justify-center group hover:scale-110 transition-transform shadow-lg"
                style={{ backgroundColor: color }}
              >
                <X size={14} className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color grid */}
      <div className="grid grid-cols-5 gap-2">
        {PRESET_COLORS.map((color, index) => {
          const isSelected = selectedColors.includes(color)
          return (
            <motion.button
              key={color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => handleColorClick(color)}
              disabled={!isSelected && selectedColors.length >= maxColors}
              className={`
                w-10 h-10 rounded-lg border-2 transition-all duration-200
                ${isSelected
                  ? 'border-emerald-400 scale-110 ring-2 ring-emerald-400/30'
                  : 'border-white/10 hover:scale-110 hover:border-white/30'
                }
                ${!isSelected && selectedColors.length >= maxColors ? 'opacity-30 cursor-not-allowed' : ''}
              `}
              style={{ backgroundColor: color }}
            >
              {isSelected && (
                <Check size={16} className="mx-auto text-white drop-shadow-md" />
              )}
            </motion.button>
          )
        })}

        {/* Custom color button */}
        <button
          onClick={() => setShowCustom(true)}
          disabled={selectedColors.length >= maxColors}
          className={`
            w-10 h-10 rounded-lg border-2 border-dashed border-white/30
            flex items-center justify-center transition-all duration-200
            ${selectedColors.length >= maxColors ? 'opacity-30 cursor-not-allowed' : 'hover:border-emerald-400 hover:scale-110'}
          `}
        >
          <Plus size={18} className="text-white/50" />
        </button>
      </div>

      {/* Custom color picker */}
      {showCustom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
        >
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border-0"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50"
          />
          <button
            onClick={handleCustomAdd}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
          >
            Adicionar
          </button>
          <button
            onClick={() => setShowCustom(false)}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}

      {/* Help text */}
      <p className="text-xs text-center text-white/30">
        Selecione até {maxColors} cores principais da sua marca
      </p>

      {/* Action buttons */}
      <div className="flex gap-2">
        {onSkip && (
          <button
            onClick={onSkip}
            className="flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-200 border border-white/20 text-white/70 hover:bg-white/5 hover:text-white"
          >
            Pular
          </button>
        )}

        <button
          onClick={handleConfirm}
          disabled={selectedColors.length === 0}
          className={`
            flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-200
            ${selectedColors.length > 0
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/25'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
            }
          `}
        >
          Confirmar
        </button>
      </div>
    </motion.div>
  )
}
