'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, FileText, Star, Image as ImageIcon, MapPin, BookOpen, Calendar, ShoppingCart, Video, MessageSquare, CheckCircle2, HelpCircle } from 'lucide-react'
import { FeatureModal } from '../ui/feature-modal'

const FEATURES = [
    {
        icon: MessageCircle,
        title: 'Botão WhatsApp direto',
        description: 'Converta visitantes em leads com um clique. Integração direta com seu WhatsApp Business.',
        fullDescription: 'Um botão flutuante que fica sempre visível na tela, permitindo que visitantes entrem em contato direto com você pelo WhatsApp. É a forma mais rápida de capturar leads quentes e fechar vendas.',
        benefits: [
            'Cliente entra em contato em 1 segundo, sem preencher formulário',
            'Conversas ficam salvas no seu WhatsApp para follow-up',
            'Funciona 24/7, mesmo quando você está offline',
            'Aumenta em até 40% a taxa de conversão vs formulários tradicionais'
        ],
        examples: [
            'Restaurante: "Oi! Quero fazer uma reserva para hoje à noite"',
            'Dentista: "Gostaria de agendar uma consulta"',
            'E-commerce: "Esse produto tem em outra cor?"'
        ],
        included: ['Todos os planos']
    },
    {
        icon: FileText,
        title: 'Formulário de orçamento',
        description: 'Capture leads qualificados 24/7 com formulários inteligentes e notificações em tempo real.',
        fullDescription: 'Formulários personalizados que capturam exatamente as informações que você precisa. Cada envio gera notificação imediata por email e pode integrar com seu CRM.',
        benefits: [
            'Leads organizados com todas as informações necessárias',
            'Notificação em tempo real quando alguém preenche',
            'Filtro de spam automático (só leads reais chegam)',
            'Integração com Google Sheets, email e WhatsApp'
        ],
        examples: [
            'Arquiteto: captura tipo de projeto, metragem, orçamento',
            'Advogado: área de atuação, urgência do caso',
            'Fotógrafo: tipo de evento, data, número de horas'
        ],
        included: ['Todos os planos']
    },
    {
        icon: Star,
        title: 'Depoimentos de clientes',
        description: 'Aumente a confiança com provas sociais. Seção otimizada para conversão.',
        fullDescription: 'Seção dedicada para exibir avaliações e feedback de clientes satisfeitos. Inclui fotos, nomes, estrelas e depoimentos em texto. Fundamental para builds trust e credibilidade.',
        benefits: [
            '90% dos consumidores leem avaliações antes de comprar',
            'Depoimentos aumentam conversão em até 34%',
            'Reduz objeções e dúvidas do cliente',
            'Melhora ranqueamento no Google (sinais de autoridade)'
        ],
        examples: [
            'Antes e depois de clientes (estética, fitness)',
            'Avaliações 5 estrelas com foto do cliente',
            'Cases de sucesso com resultados numéricos'
        ],
        included: ['Todos os planos']
    },
    {
        icon: ImageIcon,
        title: 'Galeria de fotos/portfolio',
        description: 'Mostre seu trabalho com galerias responsivas e otimizadas para carregamento rápido.',
        fullDescription: 'Galerias profissionais de imagens com lightbox, zoom e navegação intuitiva. Ideal para mostrar seus produtos, projetos ou serviços com qualidade.',
        benefits: [
            'Imagem vende: 65% das pessoas são visuais',
            'Carregamento ultra-rápido (imagens otimizadas)',
            'Responsivo: funciona perfeito em celular',
            'Organização por categorias/projetos'
        ],
        examples: [
            'Portfólio de fotógrafo ou designer',
            'Galeria de produtos (roupas, móveis)',
            'Projetos concluídos (arquitetura, reformas)'
        ],
        included: ['Simples', 'Profissional']
    },
    {
        icon: MapPin,
        title: 'Mapa de localização',
        description: 'Facilite que clientes te encontrem. Integração com Google Maps e rotas.',
        fullDescription: 'Mapa interativo do Google Maps incorporado no site, mostrando sua localização exata. Clientes podem abrir rotas direto no celular deles.',
        benefits: [
            'Cliente não precisa sair do seu site para procurar endereço',
            'Botão "Como chegar" abre Google Maps com rota',
            'Aumenta visitas presenciais em negócios locais',
            'Melhora SEO local (Google entende onde você está)'
        ],
        examples: [
            'Clínicas, consultórios, escritórios',
            'Lojas físicas, showrooms',
            'Restaurantes, academias, salões'
        ],
        included: ['Simples', 'Profissional']
    },
    {
        icon: BookOpen,
        title: 'Blog pra atrair clientes',
        description: 'SEO poderoso: atraia tráfego orgânico e eduque seu público com conteúdo estratégico.',
        fullDescription: 'Área de blog profissional para publicar artigos, dicas e conteúdo relevante. Cada post é uma porta de entrada para novos visitantes via Google.',
        benefits: [
            'Tráfego orgânico gratuito e contínuo do Google',
            'Posiciona você como autoridade no assunto',
            'Cada artigo é um "vendedor 24/7" trabalhando pra você',
            'Conteúdo gera confiança e educa o cliente'
        ],
        examples: [
            'Dentista: "5 sinais de que você precisa de implante"',
            'Contador: "Como pagar menos impostos legalmente"',
            'Personal: "Treino para iniciantes em casa"'
        ],
        included: ['Profissional']
    },
    {
        icon: Calendar,
        title: 'Agendamento online',
        description: 'Sistema completo de reservas com calendário, notificações e lembretes automáticos.',
        fullDescription: 'Calendário integrado onde clientes escolhem data/hora disponível e agendam serviços. Você recebe notificação e o sistema envia lembretes automáticos.',
        benefits: [
            'Agenda preenchida sem você atender telefone',
            'Reduz "no-show" com lembretes automáticos',
            'Cliente agenda a qualquer hora (até 3h da manhã)',
            'Sincroniza com Google Calendar'
        ],
        examples: [
            'Salão de beleza, barbearia',
            'Consultórios médicos, psicólogos',
            'Personal trainer, nutricionista'
        ],
        included: ['Profissional']
    },
    {
        icon: ShoppingCart,
        title: 'Loja virtual/carrinho',
        description: 'Venda 24/7: catálogo de produtos, carrinho, checkout e integração com pagamentos.',
        fullDescription: 'E-commerce completo com catálogo de produtos, carrinho de compras, checkout e integração com meios de pagamento (Mercado Pago, PagSeguro, etc).',
        benefits: [
            'Venda enquanto dorme (loja nunca fecha)',
            'Cliente compra sem falar com ninguém',
            'Controle de estoque automático',
            'Relatórios de vendas e produtos mais vendidos'
        ],
        examples: [
            'Loja de roupas, acessórios',
            'Produtos digitais (cursos, ebooks)',
            'Alimentos, cosméticos, artesanato'
        ],
        included: ['Profissional']
    },
    {
        icon: Video,
        title: 'Vídeos do YouTube/Vimeo',
        description: 'Incorpore vídeos otimizados para engajamento e conversão de visitantes.',
        fullDescription: 'Integração com YouTube e Vimeo para exibir vídeos institucionais, tutoriais ou depoimentos. Vídeos aumentam o tempo no site e conversão.',
        benefits: [
            'Vídeos convertem 80% mais que texto',
            'Aumenta tempo no site (bom para SEO)',
            'Explica serviços complexos de forma simples',
            'Humaniza sua marca'
        ],
        examples: [
            'Vídeo institucional da empresa',
            'Tour virtual do espaço',
            'Depoimentos em vídeo de clientes'
        ],
        included: ['Todos os planos']
    },
    {
        icon: MessageSquare,
        title: 'Chat ao vivo',
        description: 'Atenda em tempo real e nunca perca uma venda. Integração com principais plataformas.',
        fullDescription: 'Widget de chat que permite conversar com visitantes em tempo real. Integra com ferramentas como Tawk.to, Zendesk ou Intercom.',
        benefits: [
            'Tire dúvidas na hora e feche vendas imediatas',
            'Cliente não precisa sair do site',
            'Reduz abandono de carrinho',
            'Histórico de conversas salvo'
        ],
        examples: [
            'E-commerce: "Esse vestido tem no P?"',
            'SaaS: "Qual plano é melhor para mim?"',
            'Serviços: "Vocês atendem na região X?"'
        ],
        included: ['Profissional']
    }
]

export function FeaturesSection() {
    const [selectedFeature, setSelectedFeature] = useState<typeof FEATURES[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (feature: typeof FEATURES[0]) => {
        setSelectedFeature(feature)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedFeature(null), 300)
    }

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

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
                        O que não pode faltar no <span className="text-emerald-400">seu site?</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Marque tudo que faz sentido pro seu negócio. Criamos sites completos, prontos para vender.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative"
                        >
                            <div className="h-full p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/80 hover:border-emerald-500/50 transition-all duration-300">
                                {/* Icon & Help Button */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                                        <feature.icon size={24} />
                                    </div>

                                    {/* Included badge */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap gap-1">
                                            {feature.included.map((plan) => (
                                                <span key={plan} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    <CheckCircle2 size={10} />
                                                    {plan}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Help Button */}
                                    <button
                                        onClick={() => openModal(feature)}
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:scale-110 group/help"
                                        aria-label={`Saiba mais sobre ${feature.title}`}
                                    >
                                        <HelpCircle size={16} className="group-hover/help:rotate-12 transition-transform" />
                                    </button>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-zinc-400 mb-6">
                        Todas essas funcionalidades estão incluídas nos nossos planos. Escolha o seu:
                    </p>
                    <a
                        href="#planos"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]"
                    >
                        Ver planos e preços
                        <CheckCircle2 size={20} />
                    </a>
                </motion.div>
            </div>

            {/* Feature Modal */}
            <FeatureModal
                isOpen={isModalOpen}
                onClose={closeModal}
                feature={selectedFeature}
            />
        </section>
    )
}
