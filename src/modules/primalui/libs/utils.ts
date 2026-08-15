import { type ClassValue, clsx } from 'clsx'
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

const cssColorKeywords = ["transparent", "white", "black", "currentColor", "inherit", "initial"]

export {cn, cssColorKeywords}