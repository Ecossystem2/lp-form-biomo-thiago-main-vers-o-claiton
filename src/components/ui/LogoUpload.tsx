'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LogoUploadProps {
  value: string | null
  fileName: string | null
  onChange: (file: string | null, fileName: string | null) => void
  onSkip?: () => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']

export function LogoUpload({ value, fileName, onChange, onSkip }: LogoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Formato invalido. Use PNG, JPG ou SVG.'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Arquivo muito grande. Maximo 5MB.'
    }
    return null
  }

  const processFile = useCallback((file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      onChange(base64, file.name)
    }
    reader.readAsDataURL(file)
  }, [onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleRemove = () => {
    onChange(null, null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.svg"
        onChange={handleFileChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {value ? (
          // Preview state
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={value}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{fileName}</p>
                <p className="text-sm text-zinc-400">Logo enviada com sucesso</p>
              </div>

              {/* Remove button */}
              <button
                onClick={handleRemove}
                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : (
          // Dropzone state
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative cursor-pointer border-2 border-dashed rounded-2xl p-8
                transition-all duration-200
                ${isDragging
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-zinc-700 hover:border-zinc-500 bg-zinc-800/30 hover:bg-zinc-800/50'
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
                  ${isDragging ? 'bg-emerald-500/20' : 'bg-zinc-700/50'}
                `}>
                  <svg
                    className={`w-8 h-8 ${isDragging ? 'text-emerald-400' : 'text-zinc-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Text */}
                <p className="text-white font-medium mb-1">
                  {isDragging ? 'Solte o arquivo aqui' : 'Arraste a logo ou clique para enviar'}
                </p>
                <p className="text-sm text-zinc-500">
                  PNG, JPG ou SVG (max 5MB)
                </p>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-red-400 text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Skip option */}
            {onSkip && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSkip()
                }}
                className="w-full mt-4 py-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Nao tenho logo ainda
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
