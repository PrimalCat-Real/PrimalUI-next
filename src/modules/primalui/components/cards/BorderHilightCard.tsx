'use client'
import { HTMLMotionProps, animate, motion, useMotionValue } from 'motion/react'
import { ReactNode, useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../libs/utils'

const RADIUS = 8
const STROKE = 2

interface BorderHilightCardProps extends HTMLMotionProps<'div'> {
    children?: ReactNode,

}

const BorderHilightCard = ({ children, className, ...props }: BorderHilightCardProps) => {
    const uid = useId()
    const parentRef = useRef<HTMLDivElement | null>(null)
    const [size, setSize] = useState({ width: 0, height: 0 })

    const borderOpacity = useMotionValue(0)
    const handleHoverStart = () => animate(borderOpacity, 1, { duration: 0.3, ease: 'easeIn' })
    const handleHoverEnd = () => animate(borderOpacity, 0, { duration: 0.3, ease: 'easeOut' })

    useEffect(() => {
        const element = parentRef.current
        if (!element) return

        const sizeObserver = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect
            setSize({ width, height })
        })

        sizeObserver.observe(element)
        return () => sizeObserver.disconnect()
    }, [])

    const { width, height } = size

    const filterId = `bh-shadow-${uid}`
    const gradId = `bh-grad-${uid}`
    const clipId = `bh-clip-${uid}`

    return (
        <motion.div
            {...props}
            ref={parentRef}
            className={cn('w-130 h-99.75 relative', className)}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
        >
            {width > 0 && (
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 pointer-events-none"
                >
                    <defs>
                        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.161  0 0 0 0 0  0 0 0 0 0.012  0 0 0 1 0"
                            />
                            <feBlend in2="BackgroundImageFix" result="shadow" />
                            <feBlend in="SourceGraphic" in2="shadow" result="shape" />
                        </filter>

                        <linearGradient
                            id={gradId}
                            x1={width / 2} y1={0}
                            x2={width / 2} y2={height}
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#DE7BBA" />
                            <motion.stop
                                offset="1"
                                stopColor="#FF2CF6"
                                style={{ stopOpacity: borderOpacity }}
                            />
                        </linearGradient>

                        <clipPath id={clipId}>
                            <rect x={0} y={0} width={width} height={height} rx={RADIUS} />
                        </clipPath>
                    </defs>

                    <g filter={`url(#${filterId})`}>
                        <rect
                            x={0} y={0}
                            width={width} height={height}
                            rx={RADIUS}
                            stroke={`url(#${gradId})`}
                            strokeWidth={STROKE * 2}
                            clipPath={`url(#${clipId})`}
                        />
                    </g>
                </svg>
            )}
            {children}
        </motion.div>
    )
}

export default BorderHilightCard
