'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const hasAnimated = useRef(false)

  // Auto-detect decimals if not specified
  const actualDecimals = decimals || (end % 1 !== 0 ? 1 : 0)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)

      // Easing function (ease-out)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = actualDecimals > 0
        ? parseFloat((easeOutProgress * end).toFixed(actualDecimals))
        : Math.floor(easeOutProgress * end)

      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration, actualDecimals])

  const formattedCount = actualDecimals > 0
    ? count.toLocaleString('pt-BR', { minimumFractionDigits: actualDecimals, maximumFractionDigits: actualDecimals })
    : count.toLocaleString('pt-BR')

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {prefix}{formattedCount}{suffix}
    </motion.span>
  )
}

// Versão compacta para números pequenos
interface AnimatedStatProps {
  value: number | string
  label: string
  suffix?: string
  icon?: React.ReactNode
  className?: string
}

export function AnimatedStat({
  value,
  label,
  suffix = '',
  icon,
  className = ''
}: AnimatedStatProps) {
  const numericValue = typeof value === 'number' ? value : parseFloat(value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 ${className}`}
    >
      {icon && <span className="text-emerald-400">{icon}</span>}
      <span className="font-bold text-emerald-400">
        {isNaN(numericValue) ? (
          value
        ) : (
          <AnimatedCounter end={numericValue} suffix={suffix} duration={1.5} />
        )}
      </span>
      <span className="text-white/60 text-sm">{label}</span>
    </motion.div>
  )
}
