'use client'

import { useEffect, useCallback, useRef } from 'react'

const STORAGE_KEY = 'biomo-quiz-progress'
const EXPIRATION_HOURS = 24

interface SavedProgress {
  step: string
  data: Record<string, unknown>
  timestamp: number
}

export function useAutoSave<T extends Record<string, unknown>>(
  currentStep: string,
  formData: T,
  onRestore?: (step: string, data: T) => void
) {
  const hasRestored = useRef(false)

  // Salvar progresso
  const saveProgress = useCallback(() => {
    if (typeof window === 'undefined') return
    if (currentStep === 'intro' || currentStep === 'success' || currentStep === 'submitting') return

    const progress: SavedProgress = {
      step: currentStep,
      data: formData,
      timestamp: Date.now()
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch (e) {
      console.warn('Erro ao salvar progresso:', e)
    }
  }, [currentStep, formData])

  // Verificar se há progresso salvo válido
  const getSavedProgress = useCallback((): SavedProgress | null => {
    if (typeof window === 'undefined') return null

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return null

      const progress: SavedProgress = JSON.parse(saved)

      // Verificar expiração (24 horas)
      const expirationMs = EXPIRATION_HOURS * 60 * 60 * 1000
      if (Date.now() - progress.timestamp > expirationMs) {
        localStorage.removeItem(STORAGE_KEY)
        return null
      }

      // Verificar se tem dados úteis
      if (!progress.data || !progress.step) return null

      return progress
    } catch {
      return null
    }
  }, [])

  // Limpar progresso salvo
  const clearProgress = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Auto-save quando dados mudam
  useEffect(() => {
    saveProgress()
  }, [saveProgress])

  // Tentar restaurar na inicialização
  useEffect(() => {
    if (hasRestored.current) return
    hasRestored.current = true

    const saved = getSavedProgress()
    if (saved && onRestore) {
      // Pequeno delay para dar tempo do componente montar
      setTimeout(() => {
        onRestore(saved.step, saved.data as T)
      }, 100)
    }
  }, [getSavedProgress, onRestore])

  return {
    saveProgress,
    getSavedProgress,
    clearProgress,
    hasProgress: !!getSavedProgress()
  }
}

// Hook simplificado para verificar se há progresso sem restaurar
export function useHasSavedProgress(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return false

    const progress: SavedProgress = JSON.parse(saved)
    const expirationMs = EXPIRATION_HOURS * 60 * 60 * 1000

    return Date.now() - progress.timestamp < expirationMs
  } catch {
    return false
  }
}
