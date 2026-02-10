'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  name: string
  image: string
  url: string
}

// All portfolio projects
const projects: Project[] = [
  {
    id: 'liboni-bauer',
    name: 'Liboni Bauer',
    image: '/portfolio/slide-liboni-bauer.png',
    url: 'https://libonibauer.com.br'
  },
  {
    id: 'tupa-fc',
    name: 'Tupã FC',
    image: '/portfolio/slide-tupa-fc.png',
    url: 'https://tupafc.com.br'
  },
  {
    id: 'orestes',
    name: 'Orestes Cabeleireiro',
    image: '/portfolio/slide-orestes.png',
    url: 'https://orestescabeleireiro.com.br'
  },
  {
    id: 'liboni-bauer-alt',
    name: 'Liboni Bauer',
    image: '/portfolio/liboni-bauer.webp',
    url: 'https://libonibauer.com.br'
  },
  {
    id: 'tupa-fc-alt',
    name: 'Tupã FC',
    image: '/portfolio/tupa-fc.webp',
    url: 'https://tupafc.com.br'
  },
  {
    id: 'orestes-alt',
    name: 'Orestes Cabeleireiro',
    image: '/portfolio/orestes-cabeleireiro.webp',
    url: 'https://orestescabeleireiro.com.br'
  }
]

interface MacBookCarouselProps {
  compact?: boolean
  autoPlayInterval?: number
}

export function MacBookCarousel({
  compact = false,
  autoPlayInterval = 4000 // Slower: 4 seconds per slide
}: MacBookCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [nextSlide, autoPlayInterval])

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* MacBook Container */}
      <div className="relative w-full max-w-[600px] mx-auto">

        {/* The screen content needs to be rendered FIRST (below in DOM = behind visually with same z) */}
        {/* But since the lid image has solid pixels, we need content ON TOP of lid but clipped to screen area */}

        {/* MacBook Structure */}
        <div className="relative">

          {/* Lid Background Image - FRONT layer (frame) */}
          <img
            src="https://i.postimg.cc/MGBsP9Rc/superior-macbook.webp"
            alt="MacBook Lid"
            className="w-full h-auto block relative z-10 pointer-events-none"
          />

          {/* Screen Content - BEHIND the lid frame (lower z-index) */}
          <div
            className="absolute overflow-hidden bg-black z-0"
            style={{
              top: '4.8%',
              left: '12%',
              right: '12%',
              bottom: '11%',
              borderRadius: '2px',
            }}
          >
            {/* Fade Carousel - Using AnimatePresence for smooth transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Screen glare effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 100%)',
              }}
            />
          </div>

          {/* MacBook Base - Attached to bottom of lid */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: '-1%',
              width: '100%',
            }}
          >
            <img
              src="https://i.postimg.cc/bN6FsDpr/inferior-macbook.webp"
              alt="MacBook Base"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Spacer for base overflow */}
        <div className="h-12" />
      </div>

      {/* Project Name & Indicators */}
      <div className="flex flex-col items-center gap-3 mt-2">
        {/* Project Name */}
        <AnimatePresence mode="wait">
          <motion.a
            key={currentIndex}
            href={projects[currentIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors group"
          >
            <span className="font-medium text-sm">{projects[currentIndex].name}</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex gap-1.5">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-500 ${index === currentIndex
                ? 'bg-emerald-500 w-5 h-1.5'
                : 'bg-zinc-700 hover:bg-zinc-600 w-1.5 h-1.5'
                }`}
              aria-label={`Ver ${project.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
