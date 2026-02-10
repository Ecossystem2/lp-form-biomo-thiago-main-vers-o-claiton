'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Check, Copy, X } from 'lucide-react'

interface ShareButtonProps {
  title?: string
  text?: string
  url?: string
  className?: string
}

export function ShareButton({
  title = 'Biomo - Sites Profissionais',
  text = 'Acabei de solicitar um orcamento de site profissional na Biomo! Recomendo muito.',
  url,
  className = ''
}: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.origin : 'https://sites.biomo.com.br')

  const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator

  const handleNativeShare = useCallback(async () => {
    if (!canNativeShare) return

    try {
      await navigator.share({
        title,
        text,
        url: shareUrl
      })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch {
      // User cancelled or error
    }
  }, [canNativeShare, title, text, shareUrl])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowMenu(false)
      }, 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = shareUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowMenu(false)
      }, 2000)
    }
  }, [shareUrl])

  const shareOnWhatsApp = useCallback(() => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`
    window.open(whatsappUrl, '_blank')
    setShowMenu(false)
  }, [text, shareUrl])

  const shareOnLinkedIn = useCallback(() => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(linkedinUrl, '_blank')
    setShowMenu(false)
  }, [shareUrl])

  const shareOnTwitter = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank')
    setShowMenu(false)
  }, [text, shareUrl])

  const handleClick = () => {
    if (canNativeShare) {
      handleNativeShare()
    } else {
      setShowMenu(prev => !prev)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
        aria-label="Compartilhar"
      >
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check size={18} className="text-emerald-400" />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Share2 size={18} />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="text-sm font-medium">
          {showSuccess ? 'Compartilhado!' : 'Compartilhar'}
        </span>
      </motion.button>

      {/* Dropdown menu for non-native share */}
      <AnimatePresence>
        {showMenu && !canNativeShare && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 min-w-[200px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span className="text-sm font-medium text-white">Compartilhar</span>
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="text-white/50 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Options */}
            <div className="p-2">
              {/* Copy link */}
              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  {copied ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} className="text-white/70" />
                  )}
                </div>
                <span className="text-sm text-white/80">
                  {copied ? 'Link copiado!' : 'Copiar link'}
                </span>
              </button>

              {/* WhatsApp */}
              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="text-sm text-white/80">WhatsApp</span>
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                onClick={shareOnLinkedIn}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span className="text-sm text-white/80">LinkedIn</span>
              </button>

              {/* Twitter/X */}
              <button
                type="button"
                onClick={shareOnTwitter}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-sm text-white/80">X (Twitter)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
