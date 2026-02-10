'use client'

import { ReactNode, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortfolioModal } from '@/components/PortfolioModal'
import { MacBookCarousel } from '@/components/MacBookCarousel'
import { ExternalLink, Sparkles } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { SocialProofBanner } from './SocialProofBanner'
import { ProjectSummary } from './ProjectSummary'
import type { FormData } from '@/hooks/useAppStore'

interface ChatLayoutProps {
  children: ReactNode
  currentStep?: string
  formData?: FormData
}

export function ChatLayout({ children, currentStep = 'intro', formData = {} as FormData }: ChatLayoutProps) {
  const [showPortfolio, setShowPortfolio] = useState(false)

  // Gerar posições das partículas de forma determinística
  const particles = useMemo(() =>
    [...Array(15)].map((_, i) => {
      // Usar seed baseada no índice para valores consistentes
      const seed = i * 9301 + 49297
      const r1 = ((seed % 233280) / 233280)
      const r2 = (((seed * 2) % 233280) / 233280)
      const r3 = (((seed * 3) % 233280) / 233280)
      const r4 = (((seed * 4) % 233280) / 233280)
      return {
        id: i,
        left: `${r1 * 100}%`,
        top: `${r2 * 100}%`,
        duration: 3 + r3 * 2,
        delay: r4 * 2,
      }
    }), []
  )

  return (
    <div className="h-screen w-full flex overflow-hidden relative">
      {/* Background global animado */}
      <div className="fixed inset-0 -z-10">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-950/40 via-zinc-950 to-black" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-emerald-500/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Coluna esquerda - Chat */}
      <div className="w-full lg:w-[480px] xl:w-[520px] h-full flex flex-col relative z-10">
        {/* Header fixo com Progress */}
        <div className="shrink-0 p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <a href="https://biomo.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
              <Image
                src="/logo-biomo-mini.svg"
                alt="Biomo"
                width={32}
                height={40}
                className="h-8 w-auto"
              />
              <div className="hidden sm:block">
                <span className="text-white font-semibold text-lg">Biomo</span>
                <span className="text-emerald-400 font-semibold text-lg">.sites</span>
              </div>
            </a>

            <button
              onClick={() => setShowPortfolio(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all text-sm font-medium"
            >
              <Sparkles size={14} className="text-emerald-400" />
              <span className="hidden sm:inline">Ver portfólio</span>
              <span className="sm:hidden">Portfólio</span>
            </button>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} variant="minimal" />
        </div>

        {/* Chat container - flex-1 com min-h-0 para permitir overflow interno */}
        <div className="flex-1 min-h-0 flex flex-col mx-3 mb-3 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Social Proof Banner - Mobile Only */}
          <div className="lg:hidden">
            <SocialProofBanner variant="compact" />
          </div>
          {children}
        </div>
      </div>

      {/* Coluna direita - Showcase + Summary (apenas desktop) */}
      <div className="hidden lg:flex flex-1 h-full flex-col relative overflow-hidden">
        {/* Container do painel */}
        <div className="w-full max-w-xl mx-auto h-full flex flex-col py-4 px-4 gap-4">
          {/* MacBook Carousel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="shrink-0"
          >
            <MacBookCarousel autoPlayInterval={4000} compact={true} />
          </motion.div>

          {/* Stats compactos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="shrink-0"
          >
            <SocialProofBanner variant="compact" />
          </motion.div>

          {/* Project Summary - cresce para preencher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 min-h-0 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col"
          >
            <ProjectSummary formData={formData} currentStep={currentStep} />
          </motion.div>

          {/* CTA ver portfólio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="shrink-0 text-center"
          >
            <button
              onClick={() => setShowPortfolio(true)}
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors group"
            >
              <span>Ver todos os projetos</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-24 h-24 border border-emerald-500/20 rounded-full" />
        <div className="absolute bottom-20 left-10 w-16 h-16 border border-white/10 rounded-lg rotate-45" />
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal isOpen={showPortfolio} onClose={() => setShowPortfolio(false)} />
    </div>
  )
}
