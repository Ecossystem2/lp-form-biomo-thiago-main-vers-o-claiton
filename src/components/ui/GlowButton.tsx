'use client'

import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    className?: string
    fullWidth?: boolean
}

export function GlowButton({ children, onClick, disabled, className, fullWidth = false, ...props }: GlowButtonProps) {
    return (
        <div
            className={cn(
                "glowbox glowbox-active cursor-pointer transition-opacity duration-200",
                fullWidth ? "w-full" : "w-auto",
                disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                className
            )}
            onClick={!disabled ? onClick : undefined}
            {...props}
        >
            <div className="glowbox-animations">
                <div className="glowbox-glow"></div>
                <div className="glowbox-stars-masker">
                    <div className="glowbox-stars"></div>
                </div>
            </div>
            <div className="glowbox-borders-masker">
                <div className="glowbox-borders"></div>
            </div>
            <div className="btn-cta-box group w-full">
                <div className="btn-cta text-xs sm:text-sm uppercase tracking-wider font-bold text-center leading-tight flex-1 flex items-center justify-center gap-2">
                    {children}
                </div>
                <ArrowRight className="arrow-icon text-white flex-shrink-0" size={16} />
            </div>
        </div>
    )
}
