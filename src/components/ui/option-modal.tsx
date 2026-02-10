'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Info, Sparkles, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface OptionModalProps {
    isOpen: boolean
    onClose: () => void
    option: {
        label: string
        explanation: string
        benefits: string[]
        icon?: any
    } | null
}

export function OptionModal({ isOpen, onClose, option }: OptionModalProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

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

    if (!option || !mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                    />

                    {/* Modal Overlay */}
                    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="pointer-events-auto relative w-full max-w-lg flex flex-col max-h-[85vh] sm:max-h-[85vh] bg-zinc-950 border-t-4 sm:border-t-0 sm:border-2 border-emerald-500 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header / Close button */}
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={onClose}
                                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white backdrop-blur-sm transition-all duration-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 overscroll-contain">
                                {/* Icon & Title */}
                                <div className="mb-6 flex flex-col items-center text-center">
                                    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-4 shadow-lg shadow-emerald-500/20">
                                        {option.icon ? (
                                            <span className="text-2xl sm:text-3xl text-white">{option.icon}</span>
                                        ) : (
                                            <Info size={32} className="text-white" />
                                        )}
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                        {option.label}
                                    </h3>
                                </div>

                                {/* Explanation */}
                                <div className="mb-8 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                                    <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2 uppercase tracking-wider">
                                        <Sparkles size={14} />
                                        O que é isso?
                                    </h4>
                                    <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                                        {option.explanation}
                                    </p>
                                </div>

                                {/* Benefits */}
                                {option.benefits && option.benefits.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider opacity-80">
                                            Por que escolher:
                                        </h4>
                                        <div className="space-y-3">
                                            {option.benefits.map((benefit, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/20 transition-colors"
                                                >
                                                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                                                    <span className="text-zinc-300 text-sm font-medium">{benefit}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer (Fixed at bottom of modal) */}
                            <div className="shrink-0 p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800 z-10 text-center">
                                <button
                                    onClick={onClose}
                                    className="w-full sm:w-auto min-w-[200px] px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black font-bold shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Entendi, continuar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}
