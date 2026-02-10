'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatUploadProps {
  onUpload: (file: File) => void
  onSkip?: () => void
  accept?: string
  maxSize?: number // in MB
}

export function ChatUpload({
  onUpload,
  onSkip,
  accept = 'image/*,.svg,.png,.jpg,.jpeg,.webp',
  maxSize = 5
}: ChatUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Apenas imagens são permitidas')
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Arquivo muito grande (máx ${maxSize}MB)`)
      return
    }

    setError(null)
    setFileName(file.name)

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleConfirm = () => {
    if (inputRef.current?.files?.[0]) {
      onUpload(inputRef.current.files[0])
    }
  }

  const handleClear = () => {
    setPreview(null)
    setFileName(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-4 space-y-3 border-t border-white/10"
    >
      {/* Drop zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
          ${isDragging
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-white/20 hover:border-white/40 bg-white/5'
          }
          ${preview ? 'p-4' : ''}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            {/* Preview image */}
            <img
              src={preview}
              alt="Preview"
              className="max-h-32 mx-auto rounded-lg object-contain"
            />
            <p className="mt-2 text-sm text-white/50 truncate">
              {fileName}
            </p>
            {/* Clear button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleClear() }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
              <ImageIcon size={28} className="text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-white">
              Arraste sua logo aqui
            </p>
            <p className="text-xs text-white/40 mt-1">
              ou clique para selecionar
            </p>
          </>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-400 text-center bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20">
          {error}
        </p>
      )}

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

        {preview && (
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-200 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/25"
          >
            Enviar
          </button>
        )}
      </div>
    </motion.div>
  )
}
