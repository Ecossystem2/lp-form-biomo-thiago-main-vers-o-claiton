'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface Project {
  id: string
  name: string
  category: string
  description: string
  image: string
  url: string
}

const projects: Project[] = [
  {
    id: 'liboni-bauer',
    name: 'Liboni Bauer',
    category: 'Landing Page • Marketing Digital',
    description: 'Landing page moderna para agência de marketing digital com design dark theme e cores vibrantes.',
    image: '/portfolio/liboni-bauer.webp',
    url: 'https://libonibauer.com.br'
  },
  {
    id: 'tupa-fc',
    name: 'Tupã FC',
    category: 'Institucional • Esportes',
    description: 'Site institucional completo para clube de futebol com sistema de sócios e galeria de mídia.',
    image: '/portfolio/tupa-fc.webp',
    url: 'https://tupafc.com.br'
  },
  {
    id: 'orestes',
    name: 'Orestes Cabeleireiro',
    category: 'Landing Page • Beleza & Estética',
    description: 'Site premium para salão de beleza com sistema de agendamento online.',
    image: '/portfolio/orestes-cabeleireiro.webp',
    url: 'https://orestescabeleireiro.com.br'
  }
]

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <h2 className="text-xl font-bold text-white">Nosso Portfólio</h2>
                <p className="text-sm text-zinc-400">Alguns dos projetos que criamos</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {selectedProject ? (
                /* Project Detail View */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar
                  </button>

                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.name}</h3>
                    <p className="text-zinc-400 mt-2">{selectedProject.description}</p>
                  </div>

                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-medium rounded-xl transition-colors"
                  >
                    Visitar site
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              ) : (
                /* Grid View */
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project, index) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedProject(project)}
                      className="group text-left rounded-xl overflow-hidden bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="inline-flex items-center gap-1 text-xs text-white font-medium">
                            Ver projeto
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-emerald-400 font-medium">{project.category}</span>
                        <h3 className="text-white font-semibold mt-1 group-hover:text-emerald-400 transition-colors">
                          {project.name}
                        </h3>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">
                  +50 projetos entregues
                </p>
                <a
                  href="https://biomo.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Ver mais em biomo.com.br
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Botão para abrir o modal - pode ser usado em qualquer lugar
export function PortfolioButton({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors ${className}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Ver portfólio
      </button>
      <PortfolioModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
