'use client'
import React, { ReactNode } from 'react'
import { cn } from '../../libs/utils';

interface GlassGradientBarsProps {
    bars?: number,
    children?: ReactNode
}

const GlassGradientBars = ({ bars = 13, children }: GlassGradientBarsProps) => {
    return (
        <>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="flex h-full w-full">
                    {Array.from({ length: bars }).map((_, index) => (
                        <div
                            key={`bg-bar-${index}`}
                            className={cn("flex-1 relative z-10 border-x border-white/10 backdrop-blur-[80px] bg-linear-to-r from-white/25 via-28% via-black/20 to-white/25")}
                        />
                    ))}
                </div>
            </div>
            {children}
        </>
    )
}

export default GlassGradientBars
