'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sendGTMEvent } from '@/components/GTMScript'
import { ShareButton } from '@/components/ui/ShareButton'

export default function SucessoPage() {
  useEffect(() => {
    // Disparar evento de conversao para tracking
    sendGTMEvent('conversion_complete', {
      page: 'sucesso',
      source: 'sites.biomo.com.br'
    })
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      {/* Logo */}
      <div className="fixed top-4 right-4 z-50">
        <Link href="https://biomo.com.br" target="_blank" className="flex items-center">
          <Image
            src="/logo-biomo-mini.svg"
            alt="Biomo"
            width={28}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      >
        <div className="max-w-lg mx-auto w-full text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Obrigado pela confianca!
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-zinc-300 mb-8"
          >
            Nosso time ja recebeu suas informacoes e entraremos em contato em breve.
          </motion.p>

          {/* Contact options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Precisa falar com a gente?</h3>

            <div className="space-y-4">
              <a
                href="https://wa.me/5547996067992"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar no WhatsApp
              </a>

              <div className="flex items-center justify-center gap-4 text-zinc-500">
                <a
                  href="mailto:contato@biomo.com.br"
                  className="hover:text-white transition-colors"
                >
                  contato@biomo.com.br
                </a>
                <span>|</span>
                <a
                  href="tel:+5547996067992"
                  className="hover:text-white transition-colors"
                >
                  (47) 99606-7992
                </a>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Fazer outro orcamento
            </Link>

            <span className="hidden sm:block text-zinc-700">|</span>

            <ShareButton
              title="Biomo - Sites Profissionais"
              text="Acabei de solicitar um orcamento de site profissional na Biomo! Se voce precisa de um site, recomendo muito."
            />
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-zinc-800"
          >
            <p className="text-sm text-zinc-600 mb-4">Siga a Biomo nas redes</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://instagram.com/agenciabiomo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/agenciabiomo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
