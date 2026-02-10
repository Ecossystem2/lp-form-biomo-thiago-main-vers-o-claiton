'use client'

import { ReactNode } from 'react'
import { TypingIndicator } from './TypingIndicator'
import { Bot } from 'lucide-react'

interface BotMessageProps {
  children?: ReactNode
  typing?: boolean
  timestamp?: string
  animate?: boolean
}

export function BotMessage({
  children,
  typing = false,
  timestamp,
  animate = true
}: BotMessageProps) {
  const currentTime = timestamp || new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div
      className="flex items-end gap-2"
      style={{
        animation: animate ? 'wa-message-appear 0.3s ease-out forwards' : 'none'
      }}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0">
        <Bot size={16} className="text-white" />
      </div>

      {/* Message bubble */}
      <div className="max-w-[80%]">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
          {typing ? (
            <TypingIndicator />
          ) : (
            <p className="text-white/90 text-sm leading-relaxed">
              {children}
            </p>
          )}
        </div>

        {/* Timestamp */}
        {!typing && (
          <span className="text-[11px] text-white/30 ml-2 mt-1 block">
            {currentTime}
          </span>
        )}
      </div>
    </div>
  )
}
