'use client'

import { ReactNode } from 'react'
import { Check, CheckCheck } from 'lucide-react'

interface UserMessageProps {
  children: ReactNode
  timestamp?: string
  status?: 'sent' | 'delivered' | 'read'
  animate?: boolean
}

export function UserMessage({
  children,
  timestamp,
  status = 'read',
  animate = true
}: UserMessageProps) {
  const currentTime = timestamp || new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div
      className="flex justify-end"
      style={{
        animation: animate ? 'wa-message-appear 0.3s ease-out forwards' : 'none'
      }}
    >
      <div className="max-w-[80%]">
        {/* Message bubble */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl rounded-br-md px-4 py-3 shadow-lg shadow-emerald-500/20">
          <p className="text-white text-sm leading-relaxed">
            {children}
          </p>
        </div>

        {/* Timestamp and status */}
        <div className="flex items-center justify-end gap-1 mt-1 mr-2">
          <span className="text-[11px] text-white/30">
            {currentTime}
          </span>
          <span className="text-white/40">
            {status === 'sent' ? (
              <Check size={14} />
            ) : (
              <CheckCheck size={14} className={status === 'read' ? 'text-emerald-400' : ''} />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
