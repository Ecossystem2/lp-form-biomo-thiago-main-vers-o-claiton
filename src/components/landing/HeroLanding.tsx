'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Star, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { MacBookCarousel } from '../MacBookCarousel'
import { DotScreenShader } from '../ui/dot-shader-background'

interface HeroLandingProps {
  onStart: () => void
  variant?: 'A' | 'B' | 'C' | 'D'
}

const COPY_VARIANTS = {
  A: {
    badge: 'Agência de criação de sites no Brasil',
    headline: (
      <>
        Criação de Sites Profissionais <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">que Geram Clientes</span>
      </>
    ),
    description: 'Empresa especializada em sites otimizados para Google Ads e conversão. Tenha uma landing page estratégica pronta para captar leads e vender mais.',
    cta: 'Orçamento para site profissional'
  },
  B: {
    badge: 'Site para captar clientes',
    headline: (
      <>
        Qual é a melhor empresa para <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">criar um site?</span>
      </>
    ),
    description: 'Descubra como um site profissional ajuda a vender mais. Criamos estruturas digitais de alta performance focadas em resultado e tráfego pago.',
    cta: 'Quero um site que vende'
  },
  C: {
    badge: 'Landing Project Ads',
    headline: (
      <>
        Site Otimizado para <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Anunciar no Google Ads</span>
      </>
    ),
    description: 'Não desperdice dinheiro com cliques ruins. Tenha uma landing page que converte visitantes em clientes reais com nossa metodologia AEO.',
    cta: 'Otimizar minhas vendas'
  },
  D: {
    badge: 'Pare de perder vendas hoje',
    headline: (
      <>
        <span className="md:whitespace-nowrap">Seu concorrente já tem site.</span> <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">E você?</span>
      </>
    ),
    description: 'A cada dia sem um site profissional, você deixa dinheiro na mesa. Tenha uma presença digital que passa confiança e autoridade instantânea.',
    cta: 'Não quero perder mais vendas'
  }
}

// Info items that will rotate
const infoItems = [
  {
    id: 'badge',
    type: 'badge',
    content: '' // This will be dynamically set by the variant
  },
  {
    id: 'conversion',
    type: 'stat',
    icon: Zap,
    value: '147+',
    label: 'Sites que geram clientes'
  },
  {
    id: 'rating',
    type: 'stat',
    icon: Star,
    value: '5.0/5.0',
    label: 'Projetos de alta conversão'
  }
]

export function HeroLanding({ onStart, variant = 'A' }: HeroLandingProps) {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0)
  const [city, setCity] = useState<string | null>(null)

  // Detect city for Variant D
  useEffect(() => {
    if (variant === 'D') {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data.city) setCity(data.city)
        })
        .catch(err => console.error('Error fetching location:', err))
    }
  }, [variant])

  const copy = { ...COPY_VARIANTS[variant] }

  // Inject city into Variant D headline if available
  if (variant === 'D' && city) {
    copy.headline = (
      <>
        <span>Seu concorrente em <span className="text-emerald-400">{city}</span> já está online.</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"> E você?</span>
      </>
    )
  }

  // Update infoItems badge content based on variant
  const currentInfoItems = [
    { ...infoItems[0], content: copy.badge },
    ...infoItems.slice(1)
  ]

  // Rotate info items every 3 seconds on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prev) => (prev + 1) % currentInfoItems.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [currentInfoItems.length])

  const currentInfo = currentInfoItems[currentInfoIndex]

  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex flex-col relative overflow-x-hidden">
      {/* Simple Background - Replacing WebGL to fix Turbopack crashes */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-black via-zinc-950 to-black">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-3 sm:py-4 shrink-0 z-50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="https://biomo.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Image
              src="/logo-biomo-mini.svg"
              alt="Biomo"
              width={28}
              height={36}
              className="h-7 sm:h-8 w-auto"
            />
            <div className="hidden sm:block">
              <span className="text-white font-semibold">Biomo</span>
              <span className="text-emerald-400 font-semibold">.sites</span>
            </div>
          </a>

          <a
            href="https://wa.me/5547996067992"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full 
            border border-emerald-500/40 bg-emerald-500/5 text-emerald-400 font-medium text-sm 
            transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-400 
            hover:shadow-[0_0_20px_-5px_var(--color-emerald-500)] hover:-translate-y-0.5"
          >
            <span className="hidden sm:inline text-emerald-300 group-hover:text-emerald-200 transition-colors">Falar no</span>
            <span className="font-bold tracking-wide">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-start lg:justify-center relative z-10 w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-0 overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">

          {/* Left Column: Text & CTA */}
          <section className="w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 relative z-10">

            {/* Mobile: Rotating Badge/Stats */}
            <div className="lg:hidden h-10 mb-4">
              <AnimatePresence mode="wait">
                {currentInfo.type === 'badge' ? (
                  <motion.div
                    key={currentInfo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium backdrop-blur-sm"
                  >
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-geist tracking-wide">{currentInfo.content}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentInfo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <div className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                      {currentInfo.icon && <currentInfo.icon size={14} />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{currentInfo.value}</span>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">{currentInfo.label}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop: Static Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-geist tracking-wide">{copy.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-4 lg:mb-5"
            >
              {copy.headline}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-slate-400 max-w-md font-light leading-relaxed mb-6 mx-auto lg:mx-0"
            >
              {copy.description}
            </motion.p>

            {/* CTA Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              {/* Glow Button */}
              <div
                className="glowbox glowbox-active cursor-pointer w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('🎯 Button clicked! Calling onStart...')
                  onStart()
                }}
              >
                <div className="glowbox-animations">
                  <div className="glowbox-glow"></div>
                  <div className="glowbox-stars-masker">
                    <div className="glowbox-stars"></div>
                  </div>
                </div>
                <div className="glowbox-borders-masker">
                  <div className="glowbox-borders"></div>
                </div>
                <div className="btn-cta-box group">
                  <div className="btn-cta text-xs sm:text-sm uppercase tracking-wider font-bold text-center leading-tight">{copy.cta}</div>
                  <ArrowRight className="arrow-icon text-white flex-shrink-0" size={16} />
                </div>
              </div>

              <span className="text-slate-500 text-xs font-medium tracking-wide">
                Orçamento grátis em 2 minutos
              </span>
            </motion.div>

            {/* Desktop: Stats / Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="hidden lg:flex mt-10 pt-6 border-t border-white/5 w-full flex-wrap justify-start gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Zap size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">147+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Projetos</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Star size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">5.0/5.0</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Avaliação</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Right Column: MacBook Carousel */}
          <section className="w-full relative order-2 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full max-w-[500px] lg:max-w-[550px] mx-auto"
            >
              {/* Glow effect behind MacBook */}
              <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 blur-3xl opacity-50 rounded-full pointer-events-none" />

              {/* Label */}
              <div className="text-center mb-3">
                <span className="text-emerald-400/80 text-[10px] sm:text-xs font-mono uppercase tracking-widest border border-emerald-500/20 rounded px-2 py-1 bg-emerald-950/30">
                  Últimos Trabalhos
                </span>
              </div>

              {/* MacBook Carousel */}
              <MacBookCarousel autoPlayInterval={4000} compact={true} />
            </motion.div>
          </section>
        </div>
      </main>

      {/* Trust Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full border-t border-white/5 bg-black/20 backdrop-blur-md py-2 sm:py-3 shrink-0"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6 text-slate-500 text-[9px] sm:text-xs font-medium uppercase tracking-widest flex-wrap px-4">
          <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-default">
            <CheckCircle size={10} className="text-emerald-500" /> Responsivo
          </span>
          <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-default">
            <CheckCircle size={10} className="text-emerald-500" /> SEO
          </span>
          <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-default">
            <CheckCircle size={10} className="text-emerald-500" /> Performance
          </span>
          <span className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-default">
            <CheckCircle size={10} className="text-emerald-500" /> Suporte
          </span>
        </div>
      </motion.div>
    </div>
  )
}
