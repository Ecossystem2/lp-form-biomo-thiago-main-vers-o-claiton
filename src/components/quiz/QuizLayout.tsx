'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ExternalLink, Sparkles } from 'lucide-react'
import { ProgressBar } from '../chat/ProgressBar'
import { SocialProofBanner } from '../chat/SocialProofBanner'
import { ProjectSummary } from '../chat/ProjectSummary'
import type { FormData } from '@/hooks/useAppStore'

// Lazy load heavy components
const PortfolioModal = dynamic(() => import('@/components/PortfolioModal').then(mod => ({ default: mod.PortfolioModal })), { ssr: false })
const MacBookCarousel = dynamic(() => import('@/components/MacBookCarousel').then(mod => ({ default: mod.MacBookCarousel })), { ssr: false })

interface QuizLayoutProps {
  children: ReactNode
  currentStep: string
  formData: FormData
}

export function QuizLayout({ children, currentStep, formData }: QuizLayoutProps) {
  const [showPortfolio, setShowPortfolio] = useState(false)

  return (
    <div className="h-[100dvh] w-full flex overflow-hidden relative">
      {/* Background global animado */}
      {/* Clean Grid Background */}
      <div className="fixed inset-0 z-0 bg-white">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, #00000018 1px, transparent 1px), linear-gradient(to bottom, #00000018 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Radial Mask (Fade Edges) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 pointer-events-none" />

        {/* Shine/Glow Effect (Animated) */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-400/8 rounded-full blur-[100px] pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>



      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row w-full relative z-10 h-full">
        {/* Coluna esquerda - Quiz Card centralizado / Scrollable */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar scroll-smooth">
          {/* Header fixo */}
          <div className="shrink-0 px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-2 sm:gap-3 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center justify-between">
              <a href="https://biomo.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                <Image
                  src="/logo-biomo-mini.svg"
                  alt="Biomo"
                  width={28}
                  height={36}
                  className="h-6 sm:h-8 w-auto"
                />
                <div className="hidden sm:block">
                  <span className="text-zinc-900 font-semibold">Biomo</span>
                  <span className="text-emerald-500 font-semibold">.sites</span>
                </div>
              </a>

              <button
                onClick={() => setShowPortfolio(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-zinc-700 hover:text-black transition-all text-xs sm:text-sm"
              >
                <Sparkles size={12} className="text-emerald-500" />
                <span>Portfolio</span>
              </button>
            </div>

            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} variant="minimal" />
          </div>

          {/* Social Proof - Mobile Only */}
          <div className="lg:hidden shrink-0 px-3 sm:px-4 pb-1 sm:pb-2">
            <SocialProofBanner variant="compact" />
          </div>

          {/* Quiz Card Area - Centralizado verticalmente */}
          <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-8 min-h-max">
            {children}
          </div>
        </div>

        {/* Coluna direita - Sidebar (apenas desktop) */}
        <div className="hidden lg:flex w-[400px] xl:w-[480px] h-screen flex-col relative overflow-hidden border-l border-neutral-800 bg-neutral-950">
          <div className="w-full h-full flex flex-col py-4 px-4 gap-4">
            {/* MacBook Carousel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="shrink-0"
            >
              <div className="text-center mb-3">
                <h3 className="text-white/80 text-sm font-medium">Ultimos Sites Que Criamos</h3>
              </div>
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

            {/* CTA ver portfolio */}
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


        </div>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal isOpen={showPortfolio} onClose={() => setShowPortfolio(false)} />
    </div >
  )
}
