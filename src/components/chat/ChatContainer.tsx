'use client'

import { ReactNode } from 'react'

interface ChatContainerProps {
  children: ReactNode
}

export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {children}
    </div>
  )
}
