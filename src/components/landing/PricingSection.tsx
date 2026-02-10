'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Crown, Rocket } from 'lucide-react'

const PLANS = [
    {
        name: 'Presença Digital',
        tagline: 'Ideal para começar',
        icon: Zap,
        price: 'R$ 1.497',
        installments: '12x de R$ 149',
        description: 'Site profissional completo para sua empresa estar online',
        features: [
            'Design moderno e responsivo',
            'Até 5 páginas',
            'Formulário de contato',
            'Botão WhatsApp integrado',
            'Depoimentos de clientes',
            'Galeria de fotos/portfolio',
            'Mapa de localização',
            'SEO básico otimizado',
            'Integração Google Analytics',
            'Hospedagem por 1 ano',
            'Suporte técnico 30 dias'
        ],
        cta: 'Começar agora',
        popular: false,
        color: 'emerald'
    },
    {
        name: 'Profissional',
        tagline: 'Mais vendido',
        icon: Crown,
        price: 'R$ 2.997',
        installments: '12x de R$ 299',
        description: 'Solução completa para empresas que querem vender online',
        features: [
            'Tudo do plano Presença Digital',
            'Até 10 páginas',
            'Blog para SEO',
            'Agendamento online',
            'Área de membros/login',
            'Chat ao vivo',
            'Vídeos integrados',
            'Formulários avançados',
            'Automações de email',
            'Pixel Facebook + Google Ads',
            'Otimização para conversão',
            'Suporte técnico 90 dias'
        ],
        cta: 'Escolher Profissional',
        popular: true,
        color: 'emerald'
    },
    {
        name: 'E-commerce',
        tagline: 'Venda 24/7',
        icon: Rocket,
        price: 'Sob consulta',
        installments: 'A partir de R$ 499/mês',
        description: 'Loja virtual completa com gestão de produtos e vendas',
        features: [
            'Tudo do plano Profissional',
            'Catálogo ilimitado de produtos',
            'Carrinho de compras',
            'Checkout otimizado',
            'Integração com pagamentos',
            'Gestão de estoque',
            'Painel administrativo',
            'Cupons de desconto',
            'Cálculo de frete',
            'Relatórios de vendas',
            'Email marketing integrado',
            'Suporte prioritário'
        ],
        cta: 'Falar com especialista',
        popular: false,
        color: 'emerald'
    }
]

export function PricingSection() {
    return (
        <section id="planos" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(to right, #00E7DF 1px, transparent 1px), linear-gradient(to bottom, #00E7DF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Planos que <span className="text-emerald-400">geram resultados</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Investimento transparente. Sem taxas escondidas. Comece a vender online hoje mesmo.
                    </p>
                </motion.div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-black text-sm font-bold shadow-lg">
                                        <Crown size={16} />
                                        Mais vendido
                                    </span>
                                </div>
                            )}

                            <div className={`h-full p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 ${plan.popular
                                    ? 'bg-emerald-500/10 border-2 border-emerald-500 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]'
                                    : 'bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900/80 hover:border-emerald-500/50'
                                }`}>
                                {/* Icon */}
                                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
                                    <plan.icon size={28} />
                                </div>

                                {/* Header */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-sm text-emerald-400 font-medium mb-4">{plan.tagline}</p>
                                    <p className="text-zinc-400 text-sm">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                                    <div className="text-sm text-zinc-400">{plan.installments}</div>
                                </div>

                                {/* CTA Button */}
                                <a
                                    href={`https://wa.me/5547996067992?text=Olá! Quero saber mais sobre o plano ${plan.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 mb-8 group ${plan.popular
                                            ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg hover:shadow-emerald-500/50'
                                            : 'bg-white/5 hover:bg-emerald-500 text-white hover:text-black border border-white/10 hover:border-emerald-500'
                                        }`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {plan.cta}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>

                                {/* Features */}
                                <div className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <Check size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                                            <span className="text-sm text-zinc-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Guarantee */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20">
                            <Check size={24} className="text-emerald-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-semibold">Garantia de 7 dias</div>
                            <div className="text-sm text-zinc-400">Não gostou? Devolvemos 100% do seu investimento</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
