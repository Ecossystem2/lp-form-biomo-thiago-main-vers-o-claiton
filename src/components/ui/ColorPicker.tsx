'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

interface ColorPickerProps {
  colors: string[]
  onChange: (colors: string[]) => void
  maxColors?: number
}

// Cores sugeridas como presets
const PRESET_COLORS = [
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#000000', // Black
  '#FFFFFF', // White
]

export function ColorPicker({ colors, onChange, maxColors = 3 }: ColorPickerProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors]
    newColors[index] = color
    onChange(newColors)
  }

  const addColor = () => {
    if (colors.length < maxColors) {
      onChange([...colors, '#6366F1'])
    }
  }

  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index)
    onChange(newColors)
  }

  const handlePresetClick = (presetColor: string) => {
    // Adiciona a cor preset se ainda houver espaco
    if (colors.length < maxColors) {
      onChange([...colors, presetColor])
    } else {
      // Substitui a ultima cor
      const newColors = [...colors]
      newColors[colors.length - 1] = presetColor
      onChange(newColors)
    }
  }

  return (
    <div className="space-y-4">
      {/* Selected colors */}
      <div className="flex items-center gap-3 flex-wrap">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative group"
          >
            <input
              ref={(el) => { inputRefs.current[index] = el }}
              type="color"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="sr-only"
            />
            <button
              onClick={() => inputRefs.current[index]?.click()}
              className="w-14 h-14 rounded-xl border-2 border-zinc-600 hover:border-zinc-400 transition-colors shadow-lg"
              style={{ backgroundColor: color }}
            >
              {/* Edit icon on hover */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </span>
            </button>

            {/* Remove button */}
            {colors.length > 1 && (
              <button
                onClick={() => removeColor(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-800 border border-zinc-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:border-red-500"
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Color hex value */}
            <p className="text-xs text-zinc-500 text-center mt-1 font-mono">
              {color.toUpperCase()}
            </p>
          </motion.div>
        ))}

        {/* Add color button */}
        {colors.length < maxColors && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={addColor}
            className="w-14 h-14 rounded-xl border-2 border-dashed border-zinc-700 hover:border-zinc-500 flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Preset colors */}
      <div className="pt-2">
        <p className="text-xs text-zinc-500 mb-2">Cores sugeridas:</p>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map((presetColor) => (
            <button
              key={presetColor}
              onClick={() => handlePresetClick(presetColor)}
              className={`
                w-8 h-8 rounded-lg border transition-all
                ${presetColor === '#FFFFFF' ? 'border-zinc-600' : 'border-transparent'}
                hover:scale-110 hover:shadow-lg
              `}
              style={{ backgroundColor: presetColor }}
              title={presetColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
