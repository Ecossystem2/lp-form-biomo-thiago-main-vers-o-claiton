'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Send, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatInputProps {
  type?: 'text' | 'email' | 'tel' | 'url' | 'textarea'
  placeholder?: string
  onSubmit: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
  mask?: 'phone' | 'none'
  validation?: (value: string) => boolean
  errorMessage?: string
}

export function ChatInput({
  type = 'text',
  placeholder = 'Digite sua mensagem...',
  onSubmit,
  disabled = false,
  autoFocus = true,
  mask = 'none',
  validation,
  errorMessage = 'Valor inválido'
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [autoFocus])

  // Phone mask (XX) XXXXX-XXXX
  const formatPhone = (input: string): string => {
    const numbers = input.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value

    if (mask === 'phone') {
      newValue = formatPhone(newValue)
    }

    setValue(newValue)
    setError(false)
  }

  const handleSubmit = () => {
    if (disabled || !value.trim()) return

    // Validate if validation function provided
    if (validation && !validation(value)) {
      setError(true)
      return
    }

    onSubmit(value.trim())
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isTextarea = type === 'textarea'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-4 border-t border-white/10"
    >
      {error && (
        <div className="px-4 py-2 mb-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="flex items-end gap-3">
        {/* Input */}
        <div className="flex-1 flex items-end gap-2 px-4 py-3 bg-white/5 rounded-2xl border border-white/10 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
          <button
            type="button"
            className="shrink-0 text-white/30 hover:text-white/50 transition-colors hidden sm:block"
          >
            <Smile size={20} />
          </button>

          {isTextarea ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent outline-none resize-none text-sm text-white placeholder:text-white/30 max-h-32"
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={type === 'tel' ? 'text' : type}
              inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'text'}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30"
            />
          )}
        </div>

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className={`
            shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
            ${value.trim()
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/25 hover:scale-105'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
            }
          `}
        >
          <Send size={18} />
        </button>
      </div>

      {/* Hint */}
      <p className="text-[11px] text-white/20 mt-2 text-center">
        Pressione Enter para enviar
      </p>
    </motion.div>
  )
}
