'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/hooks/useAppStore'
import { useState, useRef } from 'react'
import { sendGTMEvent } from '@/components/GTMScript'
import { LogoUpload } from '@/components/ui/LogoUpload'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { UrlInputList } from '@/components/ui/UrlInputList'

export function StepAdditional() {
  const { formData, setFormData, setSubmitting, isSubmitting, nextStep, prevStep } = useAppStore()
  const [consentimento, setConsentimento] = useState(true)
  const [currentSection, setCurrentSection] = useState<'logo' | 'colors' | 'references' | 'final'>('logo')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handle logo upload
  const handleLogoChange = (file: string | null, fileName: string | null) => {
    setFormData({
      logoFile: file,
      logoFileName: fileName,
      hasLogo: file !== null
    })
    // If logo uploaded, go to colors section
    if (file) {
      setTimeout(() => setCurrentSection('colors'), 300)
    }
  }

  // Handle skip logo
  const handleSkipLogo = () => {
    setFormData({ hasLogo: false })
    setCurrentSection('references')
  }

  // Handle colors change
  const handleColorsChange = (colors: string[]) => {
    setFormData({ brandColors: colors })
  }

  // Handle skip colors
  const handleSkipColors = () => {
    setCurrentSection('references')
  }

  // Handle continue from colors
  const handleContinueFromColors = () => {
    setCurrentSection('references')
  }

  // Handle references change
  const handleReferencesChange = (urls: string[]) => {
    setFormData({ referenceSites: urls.filter(u => u.trim() !== '') })
  }

  // Handle continue from references
  const handleContinueFromReferences = () => {
    setCurrentSection('final')
  }

  // Handle additional text
  const handleAdditionalChange = (text: string) => {
    setFormData({ additional: text })
  }

  // Submit form
  const handleSubmit = async () => {
    if (!consentimento || isSubmitting) return

    setSubmitting(true)

    try {
      // Salvar lead
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString()
        })
      })

      if (!response.ok) throw new Error('Erro ao salvar')

      // Evento GTM - Conversao de Lead
      sendGTMEvent('generate_lead', {
        project_type: formData.projectType,
        demand_type: formData.demandType,
        budget_fit: formData.budgetFit,
        situation: formData.situation,
        urgency: formData.urgency,
        has_logo: formData.hasLogo,
        features_count: formData.desiredFeatures.length,
        currency: 'BRL',
        value: formData.projectType === 'simples' ? 997 : formData.projectType === 'institucional' ? 2497 : 5000
      })

      // Notificar WhatsApp
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      })

      nextStep()
    } catch (error) {
      console.error('Erro:', error)
      // Mesmo com erro, continua para mostrar sucesso (melhor UX)
      nextStep()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-5xl mb-6"
          >
            {currentSection === 'logo' && '🎨'}
            {currentSection === 'colors' && '🌈'}
            {currentSection === 'references' && '🔗'}
            {currentSection === 'final' && '📝'}
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {currentSection === 'logo' && 'Tem a logo da empresa?'}
            {currentSection === 'colors' && 'Quais as cores da marca?'}
            {currentSection === 'references' && 'Sites de referencia'}
            {currentSection === 'final' && `Quase la, ${formData.nome}!`}
          </h2>

          <p className="text-zinc-400">
            {currentSection === 'logo' && 'Envie sua logo para usarmos no projeto'}
            {currentSection === 'colors' && 'Ja que enviou a logo, nos conta as cores'}
            {currentSection === 'references' && 'Sites que voce admira como inspiracao (opcional)'}
            {currentSection === 'final' && 'Revise e adicione informacoes extras se quiser'}
          </p>
        </motion.div>

        {/* Section: Logo Upload */}
        <AnimatePresence mode="wait">
          {currentSection === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <LogoUpload
                value={formData.logoFile}
                fileName={formData.logoFileName}
                onChange={handleLogoChange}
                onSkip={handleSkipLogo}
              />

              {/* Se ja tem logo, mostra botao para continuar */}
              {formData.logoFile && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setCurrentSection('colors')}
                  className="w-full py-4 rounded-full font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
                >
                  Continuar →
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Section: Colors */}
          {currentSection === 'colors' && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Preview da logo */}
              {formData.logoFile && (
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={formData.logoFile}
                      alt="Logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <ColorPicker
                colors={formData.brandColors.length > 0 ? formData.brandColors : ['#10B981']}
                onChange={handleColorsChange}
                maxColors={3}
              />

              <div className="flex gap-3">
                <button
                  onClick={handleSkipColors}
                  className="flex-1 py-3 rounded-xl font-medium border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                >
                  Definir depois
                </button>
                <button
                  onClick={handleContinueFromColors}
                  className="flex-1 py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
                >
                  Continuar →
                </button>
              </div>
            </motion.div>
          )}

          {/* Section: References */}
          {currentSection === 'references' && (
            <motion.div
              key="references"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <UrlInputList
                urls={formData.referenceSites.length > 0 ? formData.referenceSites : ['']}
                onChange={handleReferencesChange}
                maxUrls={3}
                placeholder="https://sitequereferencia.com.br"
              />

              <button
                onClick={handleContinueFromReferences}
                className="w-full py-4 rounded-full font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
              >
                Continuar →
              </button>
            </motion.div>
          )}

          {/* Section: Final */}
          {currentSection === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Resumo do que foi preenchido */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Resumo</h4>

                <div className="space-y-2 text-sm">
                  {formData.logoFile && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Logo enviada
                    </div>
                  )}

                  {formData.brandColors.length > 0 && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-zinc-300">Cores:</span>
                      <div className="flex gap-1">
                        {formData.brandColors.map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-zinc-600"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.referenceSites.filter(u => u).length > 0 && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {formData.referenceSites.filter(u => u).length} site(s) de referencia
                    </div>
                  )}

                  {formData.desiredFeatures.length > 0 && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {formData.desiredFeatures.length} funcionalidade(s)
                    </div>
                  )}
                </div>
              </div>

              {/* Textarea para observacoes */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Mais alguma informacao? (opcional)
                </label>
                <textarea
                  ref={textareaRef}
                  value={formData.additional}
                  onChange={(e) => handleAdditionalChange(e.target.value)}
                  placeholder="Detalhes extras, funcionalidades especificas, observacoes..."
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                />
              </div>

              {/* Consentimento LGPD */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={consentimento}
                    onChange={(e) => setConsentimento(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-zinc-700 rounded peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all group-hover:border-zinc-600">
                    {consentimento && (
                      <svg className="w-full h-full text-black p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-zinc-400 leading-relaxed">
                  Concordo em receber contato via WhatsApp e e-mail com a proposta comercial, conforme a{' '}
                  <a href="/privacidade" className="text-emerald-400 hover:text-emerald-300 underline" target="_blank">
                    Politica de Privacidade
                  </a>.
                </span>
              </label>

              {/* Botao enviar */}
              <motion.button
                onClick={handleSubmit}
                disabled={!consentimento || isSubmitting}
                whileHover={consentimento && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={consentimento && !isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  consentimento && !isSubmitting
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar e receber proposta</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voltar */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            if (currentSection === 'logo') {
              prevStep()
            } else if (currentSection === 'colors') {
              setCurrentSection('logo')
            } else if (currentSection === 'references') {
              // Volta para colors se tinha logo, senao volta para logo
              setCurrentSection(formData.logoFile ? 'colors' : 'logo')
            } else {
              setCurrentSection('references')
            }
          }}
          disabled={isSubmitting}
          className="mt-8 w-full text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
        >
          ← Voltar
        </motion.button>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {['logo', 'colors', 'references', 'final'].map((section) => {
            const isActive = currentSection === section
            const isPast = ['logo', 'colors', 'references', 'final'].indexOf(currentSection) > ['logo', 'colors', 'references', 'final'].indexOf(section)
            const shouldShow = section !== 'colors' || formData.logoFile

            if (!shouldShow) return null

            return (
              <div
                key={section}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive ? 'w-6 bg-emerald-500' : isPast ? 'bg-emerald-500/50' : 'bg-zinc-700'
                }`}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
