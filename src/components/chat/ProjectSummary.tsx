'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Phone, Building2, Globe, Briefcase, Clock, Palette, Image, FileText, CheckCircle2 } from 'lucide-react'
import type { FormData } from '@/hooks/useAppStore'

interface ProjectSummaryProps {
  formData: FormData
  currentStep: string
}

// Mapeamento de labels
const projectTypeLabels: Record<string, string> = {
  simples: 'Presença Digital',
  institucional: 'Site Institucional',
  personalizado: 'Solução Personalizada'
}

const urgencyLabels: Record<string, string> = {
  urgent: 'Urgente (2 semanas)',
  normal: 'Normal (30-60 dias)',
  flexible: 'Sem pressa'
}

const situationLabels: Record<string, string> = {
  no_site: 'Não tenho site',
  new_site: 'Quero um novo site',
  improve_site: 'Melhorar atual'
}

export function ProjectSummary({ formData }: ProjectSummaryProps) {
  // Renderizador de item de linha
  const renderItem = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-start gap-3 p-3 border-b border-white/5 last:border-0 group hover:bg-white/5 transition-colors">
      <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5">{label}</p>
        <p className="text-sm text-white/90 truncate font-medium">{value}</p>
      </div>
    </div>
  )

  const hasContact = formData.nome || formData.email || formData.whatsapp
  const hasCompany = formData.empresa || formData.situation || formData.currentSiteUrl
  const hasProject = formData.projectType || formData.urgency || (formData.desiredFeatures && formData.desiredFeatures.length > 0)

  if (!hasContact && !hasCompany && !hasProject) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-50">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 rotate-3">
          <FileText size={24} className="text-white/30" />
        </div>
        <p className="text-sm text-white/40 max-w-[150px]">
          Suas informações aparecerão aqui conforme você preenche
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">Sua Ficha</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-emerald-400 font-medium">Em preenchimento</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Grupo: Contato */}
        {hasContact && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h4 className="text-[10px] uppercase tracking-wider text-white/30 font-bold ml-1 flex items-center gap-2">
              <User size={10} />
              Identificação
            </h4>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
              {formData.nome && renderItem(<User size={14} />, 'Nome', formData.nome)}
              {formData.email && renderItem(<Mail size={14} />, 'E-mail', formData.email)}
              {formData.whatsapp && renderItem(<Phone size={14} />, 'WhatsApp', formData.whatsapp)}
            </div>
          </motion.section>
        )}

        {/* Grupo: Empresa */}
        {hasCompany && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <h4 className="text-[10px] uppercase tracking-wider text-white/30 font-bold ml-1 flex items-center gap-2">
              <Building2 size={10} />
              Sobre o Negócio
            </h4>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
              {formData.empresa && renderItem(<Building2 size={14} />, 'Empresa', formData.empresa)}
              {formData.situation && renderItem(<Globe size={14} />, 'Situação Atual', situationLabels[formData.situation] || formData.situation)}
            </div>
          </motion.section>
        )}

        {/* Grupo: Projeto */}
        {hasProject && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h4 className="text-[10px] uppercase tracking-wider text-white/30 font-bold ml-1 flex items-center gap-2">
              <Briefcase size={10} />
              O Projeto
            </h4>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
              {formData.projectType && renderItem(<Briefcase size={14} />, 'Tipo', projectTypeLabels[formData.projectType] || formData.projectType)}
              {formData.urgency && renderItem(<Clock size={14} />, 'Prazo', urgencyLabels[formData.urgency] || formData.urgency)}
              {formData.desiredFeatures && formData.desiredFeatures.length > 0 &&
                renderItem(<CheckCircle2 size={14} />, 'Funcionalidades', `${formData.desiredFeatures.length} selecionadas`)
              }
            </div>
          </motion.section>
        )}

        {/* Cores da Marca */}
        {formData.brandColors && formData.brandColors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/60 font-medium flex items-center gap-2">
                <Palette size={12} className="text-emerald-400" />
                Paleta Escolhida
              </span>
            </div>
            <div className="flex gap-2">
              {formData.brandColors.map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-8 h-8 rounded-full border border-white/20 shadow-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
