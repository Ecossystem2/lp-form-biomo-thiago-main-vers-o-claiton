'use client'

import { ReactNode, useEffect, useRef } from 'react'

interface ChatMessagesProps {
  children: ReactNode
}

export function ChatMessages({ children }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when children change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [children])

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-2"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.1) transparent'
      }}
    >
      {children}
      <div ref={bottomRef} />
    </div>
  )
}
