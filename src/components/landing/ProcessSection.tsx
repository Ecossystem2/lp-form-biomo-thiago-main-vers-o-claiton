'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Palette, Code, Rocket, CheckCircle2 } from 'lucide-react'

const STEPS = [
    {
        number: '01',
        icon: MessageSquare,
        title: 'Briefing',
        description: 'Conversamos sobre seu negócio, objetivos e o que você precisa no site.',
        duration: '30 minutos',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        number: '02',
        icon: Palette,
        title: 'Design',
        description: 'Criamos o visual do seu site alinhado com sua identidade e focado em conversão.',
        duration: '3-5 dias',
        color: 'from-teal-500 to-cyan-500'
    },
    {
        number: '03',
        icon: Code,
        title: 'Desenvolvimento',
        description: 'Programamos seu site com tecnologia moderna, rápida e otimizada para Google.',
        duration: '5-7 dias',
        color: 'from-cyan-500 to-blue-500'
    },
    {
        number: '04',
        icon: Rocket,
        title: 'Lançamento',
        description: 'Seu site vai ao ar! Configuramos tudo e treinamos você para usar.',
        duration: '1-2 dias',
        color: 'from-blue-500 to-emerald-500'
    }
]

const GUARANTEES = [
    'Site responsivo (funciona em qualquer dispositivo)',
    'Velocidade otimizada (carrega em menos de 3 segundos)',
    'SEO configurado (pronto para aparecer no Google)',
    'SSL/Segurança (cadeado verde de segurança)',
    'Treinamento completo (vídeos + suporte)',
    'Revisões ilimitadas durante o projeto'
]

export function ProcessSection() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-zinc-950" />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Como funciona a <span className="text-emerald-400">criação do seu site</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Processo simples, rápido e transparente. Em até 14 dias seu site está no ar.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto mb-20">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-20" />

                    {/* Steps */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Card */}
                                <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900/80 hover:border-emerald-500/50 transition-all duration-300 group">
                                    {/* Number */}
                                    <div className="absolute -top-4 -left-4 flex items-center justify-center w-12 h-12 rounded-xl bg-black border-2 border-emerald-500 text-emerald-400 font-bold text-lg">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <step.icon size={32} className="text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Duration */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-xs text-emerald-400 font-medium">{step.duration}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Guarantees */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">O que você recebe em todos os planos</h3>
                            <p className="text-zinc-400">Padrão de qualidade garantido</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {GUARANTEES.map((guarantee, index) => (
                                <motion.div
                                    key={guarantee}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 shrink-0 mt-0.5">
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                    </div>
                                    <span className="text-white font-medium">{guarantee}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
