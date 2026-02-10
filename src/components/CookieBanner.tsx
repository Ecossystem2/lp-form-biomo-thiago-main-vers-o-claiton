'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Delay para não aparecer imediatamente
      const timer = setTimeout(() => setShowBanner(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🍪</span>
                  <h3 className="font-semibold text-white">Usamos cookies</h3>
                </div>
                <p className="text-sm text-zinc-400">
                  Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site.
                  Ao continuar navegando, você concorda com nossa{' '}
                  <a href="/privacidade" className="text-emerald-400 hover:text-emerald-300 underline">
                    Política de Privacidade
                  </a>.
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleReject}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors"
                >
                  Recusar
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-black bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors"
                >
                  Aceitar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
