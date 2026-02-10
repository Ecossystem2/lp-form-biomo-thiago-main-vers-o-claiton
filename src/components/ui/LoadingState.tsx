'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Image, { ImageProps } from 'next/image'

interface LoadingStateProps {
  text?: string
  showDots?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingState({
  text = 'Carregando',
  showDots = true,
  size = 'md',
  className = ''
}: LoadingStateProps) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (!showDots) return

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 400)

    return () => clearInterval(interval)
  }, [showDots])

  const sizes = {
    sm: { icon: 16, text: 'text-sm' },
    md: { icon: 20, text: 'text-base' },
    lg: { icon: 24, text: 'text-lg' }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 size={sizes[size].icon} className="text-emerald-500" />
      </motion.div>
      <span className={`text-white/70 ${sizes[size].text}`}>
        {text}
        {showDots && <span className="inline-block w-6 text-left">{dots}</span>}
      </span>
    </motion.div>
  )
}

// Skeleton loader para placeholders
export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`bg-white/10 rounded ${className}`}
    />
  )
}

// Button loading state
interface LoadingButtonProps {
  loading: boolean
  loadingText?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

export function LoadingButton({
  loading,
  loadingText = 'Enviando',
  children,
  onClick,
  disabled,
  className = '',
  type = 'button'
}: LoadingButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      whileHover={!loading && !disabled ? { scale: 1.02 } : {}}
      whileTap={!loading && !disabled ? { scale: 0.98 } : {}}
      className={`
        relative flex items-center justify-center gap-2 px-6 py-3
        bg-gradient-to-r from-emerald-600 to-emerald-500
        hover:from-emerald-500 hover:to-emerald-400
        disabled:opacity-50 disabled:cursor-not-allowed
        text-white font-medium rounded-xl
        shadow-lg shadow-emerald-500/25
        transition-all duration-200
        ${className}
      `}
    >
      {loading ? (
        <LoadingState text={loadingText} size="sm" />
      ) : (
        children
      )}
    </motion.button>
  )
}

// Image with skeleton loading
interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  skeletonClassName?: string
}

export function ImageWithSkeleton({
  skeletonClassName = '',
  className = '',
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 ${skeletonClassName}`}
          >
            <SkeletonLoader className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div className={`flex items-center justify-center bg-white/5 ${className}`}>
          <span className="text-white/30 text-sm">Erro ao carregar</span>
        </div>
      ) : (
        <Image
          {...props}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}
