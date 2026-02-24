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

            <div className="flex h-full w-full absolute inset-0">
                {Array.from({ length: bars }).map((_, index) => (
                    <div className='relative flex flex-1'>
                        <div className="absolute inset-0 first:border-x border-r border-white/10 backdrop-blur-[140px] bg-linear-to-r from-white/25 via-28% via-black/20 to-white/25 bg-blend-overlay" />
                    </div>

                ))}
            </div>
            {children}
        </>
    )
}

export default GlassGradientBars
