'use client'
import { motion } from "motion/react";
import { cn } from '../../libs/utils';

interface GradientBarsProps {
    bars?: number,
    heightScale?: number,
    minBarsHeight?: number,
    curvature?: number,
}

const GradientBars = ({ bars = 20, heightScale = 0.7, minBarsHeight = 0.3, curvature = 1.2, }: GradientBarsProps) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="flex h-full w-full">
                {Array.from({ length: bars }).map((_, index) => {
                    const position = index / (bars - 1);
                    const center = 0.5;
                    const distance = Math.abs(position - center);
                    const scale = minBarsHeight + heightScale * Math.pow(distance * 2, curvature);

                    return (
                        <motion.div
                            key={`bg-bar-${index}`}
                            className={cn("flex-1 origin-bottom bg-linear-to-t from-blue-400 to-transparent")}
                            animate={{
                                scaleY: [scale, scale + 0.1, scale],
                                opacity: [1, 0.95, 1],
                            }}
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "mirror",
                                delay: index * 0.5,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default GradientBars