'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface UrlInputListProps {
  urls: string[]
  onChange: (urls: string[]) => void
  maxUrls?: number
  placeholder?: string
}

export function UrlInputList({
  urls,
  onChange,
  maxUrls = 3,
  placeholder = 'https://exemplo.com.br'
}: UrlInputListProps) {
  const [errors, setErrors] = useState<Record<number, string>>({})

  const validateUrl = (url: string): boolean => {
    if (!url) return true // Empty is valid (optional)
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  const handleChange = (index: number, value: string) => {
    const newUrls = [...urls]
    newUrls[index] = value
    onChange(newUrls)

    // Validate on change
    if (value && !validateUrl(value)) {
      setErrors(prev => ({ ...prev, [index]: 'URL invalida' }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[index]
        return newErrors
      })
    }
  }

  const addUrl = () => {
    if (urls.length < maxUrls) {
      onChange([...urls, ''])
    }
  }

  const removeUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index)
    onChange(newUrls.length === 0 ? [''] : newUrls)
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[index]
      return newErrors
    })
  }

  // Initialize with one empty input if empty
  const displayUrls = urls.length === 0 ? [''] : urls

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {displayUrls.map((url, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative"
          >
            <div className="flex items-center gap-2">
              {/* URL icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>

              {/* Input */}
              <input
                type="url"
                value={url}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={placeholder}
                className={`
                  flex-1 px-4 py-3 bg-zinc-800/50 border rounded-xl text-white placeholder-zinc-500
                  focus:outline-none focus:ring-2 transition-all
                  ${errors[index]
                    ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500'
                    : 'border-zinc-700 focus:ring-emerald-500/30 focus:border-emerald-500'
                  }
                `}
              />

              {/* Remove button */}
              {displayUrls.length > 1 && (
                <button
                  onClick={() => removeUrl(index)}
                  className="flex-shrink-0 p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Error message */}
            {errors[index] && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 ml-12 text-xs text-red-400"
              >
                {errors[index]}
              </motion.p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add more button */}
      {displayUrls.length < maxUrls && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={addUrl}
          className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar outra referencia
        </motion.button>
      )}

      {/* Hint */}
      <p className="text-xs text-zinc-600 mt-2">
        Sites que voce admira ou que servem de inspiracao para o projeto
      </p>
    </div>
  )
}
