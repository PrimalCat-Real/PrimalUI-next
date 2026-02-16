import React from 'react'
import { cn } from '../libs/utils'
import { FaChevronRight } from 'react-icons/fa6'

const TestButton = () => {
    const buttonName = "TestButton"
    return (
        <button aria-label={buttonName} className={cn('px-4 py-2 inline-flex font-medium items-center gap-x-2 group border-blue-400/40 border rounded-md cursor-pointer relative overflow-hidden',
            'after:mask-[radial-gradient(circle_at_bottom,transparent_40%,black)] after:bg-linear-300 after:from-transparent after:via-blue-400 after:to-transparent after:w-[150%] after:block after:aspect-square after:content-[""] after:absolute after:-translate-x-1/2 after:left-1/2 after:top-1/2 after:-translate-y-1/2 after:opacity-60  after:animate-[spin_3s_linear_infinite]'
        )}>
            <span className='group-hover:before:opacity-100 before:transition-opacity before:opacity-0 before:block before:duration-500 ease-in before:content-[""] before:h-[calc(100%+1rem)] before:w-[calc(100%+1rem)] before:shadow-[inset_0_-1ex_2rem_4px_var(--color-blue-300)] before:absolute before:-translate-x-1/2 before:left-1/2 before:top-1/2 before:-translate-y-1/2  before:animate-scaling'>
                {buttonName}
            </span>
            <FaChevronRight className='group-hover:translate-x-0.5 duration-200 transition-transform ease-out' size={12} />
        </button>
    )
}

export default TestButton