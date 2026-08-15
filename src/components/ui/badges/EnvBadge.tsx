import { cn } from '@/modules/primalui/libs/utils'
import React from 'react'

const EnvBadge = ({ className }: { className?: string }) => {
    const isServer = typeof window === 'undefined'
    return (
        <span className={cn("bg-blue-400", isServer && "bg-green-400", className)} >
            {isServer ? 'server' : 'client'}
        </span>
    )
}

export default EnvBadge