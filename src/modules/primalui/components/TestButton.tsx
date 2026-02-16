import React from 'react'
import { cn } from '../libs/utils'

const TestButton = () => {
    const buttonName = "TestButton"
    return (
        <button aria-label={buttonName} className={cn('px-4 py-2 border-blue-400/40 border rounded-md cursor-pointer relative overflow-hidden',
            'after:mask-[radial-gradient(circle_at_bottom,transparent_40%,black)] after:bg-linear-300 after:from-transparent after:via-blue-400 after:to-transparent after:w-[150%] after:block after:aspect-square after:content-[""] after:absolute after:-translate-x-1/2 after:left-1/2 after:top-1/2 after:-translate-y-1/2 after:opacity-60  after:animate-[spin_3s_linear_infinite]'
        )}>{buttonName}
        </button>
    )
}

export default TestButton