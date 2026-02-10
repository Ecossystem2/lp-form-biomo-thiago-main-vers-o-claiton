'use client'

import Image from 'next/image'
import { Circle } from 'lucide-react'

interface ChatHeaderProps {
  name: string
  status?: string
  avatar?: string
}

export function ChatHeader({
  name,
  status = 'Online',
  avatar = '/logo-biomo-mini.svg'
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
      {/* Avatar */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center overflow-hidden">
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="object-contain p-1.5"
          />
        </div>
        {/* Online indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-900" />
      </div>

      {/* Name and status */}
      <div className="flex-1 min-w-0">
        <h1 className="text-white font-semibold text-base truncate leading-tight">
          {name}
        </h1>
        <div className="flex items-center gap-1.5">
          <Circle size={8} className="fill-emerald-500 text-emerald-500" />
          <p className="text-emerald-400 text-xs font-medium">
            {status}
          </p>
        </div>
      </div>

      {/* Quiz badge */}
      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
        <span className="text-emerald-400 text-xs font-semibold">Quiz Interativo</span>
      </div>
    </div>
  )
}
