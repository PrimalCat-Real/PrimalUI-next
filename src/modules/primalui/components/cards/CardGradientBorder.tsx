'use client'


import { useRender } from '@base-ui/react/use-render'
import React, { ReactNode, useEffect, useId, useRef, useState } from 'react'
import { cn, cssColorKeywords } from '../../libs/utils'



interface CardGradientBorderProps extends useRender.ComponentProps<'div'> {
    type?: GradientType
    from?: string
    via?: string
    to?: string
    fixedWidth?: number
    fixedHeight?: number
}


type GradientType = "radial" | "linear"

type RoundedCorner = "tl" | "tr" | "bl" | "br"

const GRADINET_COLORS_PREFIX = ["from", "via", "to"] as const
const ROUNDED_PREFIX = "rounded" as const
type RoundedPrefix = typeof ROUNDED_PREFIX[number]
type RoundedResult = {
    [R in RoundedPrefix]: string
}


type GradientPrefix = typeof GRADINET_COLORS_PREFIX[number]
type GradientResult = {
    [P in GradientPrefix]: string
}


type ParsedResult = Partial<RoundedResult> & Partial<GradientResult>

interface ParseRuleType<P = string> {
    match: (token: string) => { prefix: P, isMatch: boolean },
    extract: (token: string, prefix: string) => string,
    formateValues: (value: string) => string
}



const gradientParseRule: ParseRuleType<GradientPrefix> = {
    match: (token) => {
        const foundPrefix = GRADINET_COLORS_PREFIX.find((prefix: string) =>
            token.startsWith(prefix)
        );
        return {
            prefix: foundPrefix as GradientPrefix,
            isMatch: foundPrefix ? true : false
        };
    },
    extract: (token, prefix) => {
        return token.slice(prefix.length + 1);
    },
    formateValues: (value) => {
        if (value?.startsWith("[") && value.endsWith("]")) {
            value = value.slice(1, -1)
        }
        if (Number.isFinite(Number(value?.split("-").at(-1)))) {
            value = `var(--color-${value})`
        }
        return value
    }
}

const raundedPrefixRule: ParseRuleType<RoundedPrefix> = {
    match: (token) => {
        token.startsWith(ROUNDED_PREFIX)
        return {
            prefix: ROUNDED_PREFIX,
            isMatch: token.startsWith(ROUNDED_PREFIX)
        };
    },
    extract: (token, prefix) => {
        return token.slice(prefix.length + 1);
    },
    formateValues: (value) => {
        if (value?.startsWith("[") && value.endsWith("]")) {
            value = value.slice(1, -1)
            return value
        }
        value = `var(--radius-${value})`
        return value
    }
}

const RULES: ParseRuleType[] = [gradientParseRule, raundedPrefixRule]




const CardGradientBorder = ({
    render,
    children,
    className,
    type = "linear",
    from,
    via,
    to,
    fixedWidth,
    fixedHeight,
    ...props
}: CardGradientBorderProps) => {
    const gradientId = useId()
    const containerRef = useRef<HTMLElement | null>(null)
    const [observedSize, setObservedSize] = useState({ width: 0, height: 0 })
    const classList = className?.split(" ")
    const parsed: ParsedResult = {}
    if (classList) {
        for (const token of classList) {
            for (const rule of RULES) {
                const { prefix, isMatch } = rule.match(token);
                if (isMatch) {
                    parsed[prefix] = rule.formateValues(rule.extract(token, prefix))
                }
            }
        }
    }
    console.log(parsed)
    // const parsed = parseGradientClassName(className)
    const mergedFrom = from ?? parsed.from
    const mergedVia = via ?? parsed.via
    const mergedTo = to ?? parsed.to
    const width = fixedWidth ?? observedSize.width
    const height = fixedHeight ?? observedSize.height

    // Disable ResizeObserver if both fixed dimensions are provided
    const hasFixedSize = fixedWidth !== undefined && fixedHeight !== undefined

    useEffect(() => {
        if (hasFixedSize) return

        const element = containerRef.current
        if (!element) return

        const sizeObserver = new ResizeObserver(([entry]) => {
            const target = entry.target as HTMLElement
            setObservedSize({
                width: target.offsetWidth,
                height: target.offsetHeight
            })
        })

        sizeObserver.observe(element)
        return () => sizeObserver.disconnect()
    }, [hasFixedSize])

    const gradients: Record<GradientType, ReactNode> = {
        linear: (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={mergedFrom} />
                {mergedVia && <stop offset="50%" stopColor={mergedVia} />}
                <stop offset="100%" stopColor={mergedTo} />
            </linearGradient>
        ),
        radial: (
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={mergedFrom} />
                {mergedVia && <stop offset="50%" stopColor={mergedVia} />}
                <stop offset="100%" stopColor={mergedTo} />
            </radialGradient>
        )
    }

    // Merge SVG border and children together to pass them into useRender
    const mergedChildren = (
        <>
            {width > 0 && height > 0 && (
                // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    className="absolute inset-0 pointer-events-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        stroke={`url(#${gradientId})`}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={2}
                    />
                    <defs>
                        {gradients[type]}
                    </defs>
                </svg>
            )}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </>
    )

    return useRender({
        render: render ?? <div />,
        props: {
            ...props,
            ref: containerRef,
            className: cn("relative", className),
            children: mergedChildren
        }
    })
}

export default CardGradientBorder