'use client'

import { useState } from 'react'
import { QuizFunnel } from '@/components/quiz'
import { HeroLanding } from '@/components/landing/HeroLanding'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { AnimatePresence, motion } from 'framer-motion'

interface HomeClientProps {
    initialVariant: 'A' | 'B' | 'C' | 'D'
}

export function HomeClient({ initialVariant }: HomeClientProps) {
    const [showQuiz, setShowQuiz] = useState(false)

    return (
        <AnimatePresence mode="wait">
            {!showQuiz ? (
                <motion.div
                    key="hero"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <HeroLanding onStart={() => setShowQuiz(true)} variant={initialVariant} />
                    <FeaturesSection />
                    <ProcessSection />
                    <PricingSection />
                </motion.div>
            ) : (
                <motion.div
                    key="quiz"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <QuizFunnel />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
