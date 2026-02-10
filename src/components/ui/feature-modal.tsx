'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react'
import { useEffect } from 'react'

interface FeatureModalProps {
    isOpen: boolean
    onClose: () => void
    feature: {
        icon: any
        title: string
        description: string
        fullDescription: string
        benefits: string[]
        examples: string[]
        included: string[]
    } | null
}

export function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!feature) return null

    const Icon = feature.icon

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-zinc-950 border-t-4 sm:border-t-0 sm:border-2 border-emerald-500 sm:rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110"
                            >
                                <X size={20} />
                            </button>

                            {/* Scrollable content */}
                            <div className="overflow-y-auto max-h-[90vh] sm:max-h-[85vh] custom-scrollbar">
                                {/* Header with gradient */}
                                <div className="relative p-6 sm:p-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-b border-emerald-500/20">
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shrink-0 shadow-lg shadow-emerald-500/20">
                                            <Icon size={32} className="text-white" />
                                        </div>

                                        {/* Title */}
                                        <div className="flex-1 pt-2">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-emerald-400 text-sm sm:text-base">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 sm:p-8 space-y-8">
                                    {/* Full Description */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <Sparkles size={20} className="text-emerald-400" />
                                            O que é isso?
                                        </h4>
                                        <p className="text-zinc-300 leading-relaxed text-base">
                                            {feature.fullDescription}
                                        </p>
                                    </div>

                                    {/* Benefits */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <TrendingUp size={20} className="text-emerald-400" />
                                            Por que você precisa disso?
                                        </h4>
                                        <div className="space-y-3">
                                            {feature.benefits.map((benefit, index) => (
                                                <motion.div
                                                    key={benefit}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
                                                >
                                                    <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                                                    <span className="text-zinc-300 text-sm sm:text-base">{benefit}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Examples */}
                                    {feature.examples.length > 0 && (
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4">
                                                Exemplos práticos:
                                            </h4>
                                            <div className="space-y-2">
                                                {feature.examples.map((example, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-3 text-zinc-400 text-sm sm:text-base"
                                                    >
                                                        <span className="text-emerald-400 font-bold shrink-0">→</span>
                                                        <span>{example}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Included in plans */}
                                    <div className="pt-4 border-t border-zinc-800">
                                        <p className="text-sm text-zinc-500 mb-2">Disponível nos planos:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {feature.included.map((plan) => (
                                                <span
                                                    key={plan}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                >
                                                    <CheckCircle2 size={14} />
                                                    {plan}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Footer */}
                                <div className="p-6 sm:p-8 bg-zinc-900/50 border-t border-zinc-800">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={onClose}
                                            className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all duration-300"
                                        >
                                            Entendi
                                        </button>
                                        <a
                                            href={`https://wa.me/5547996067992?text=Olá! Quero saber mais sobre: ${feature.title}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
                                        >
                                            Quero no meu site
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
