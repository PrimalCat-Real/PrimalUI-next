import React from 'react'
import { mergeProps, useRender } from '@base-ui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
    "inline-flex justify-between items-center",
    {
        variants: {
            variant: {
                default: "",
                primary: "bg-blue-400",
                outline: "",
                secondary: "",
                ghost: "",
                destructive: "",
                link: "",
            },
            size: {
                default: "",
                xs: "",
                sm: "",
                lg: "",
                icon: "size-8",
                "icon-xs": "",
                "icon-sm": "",
                "icon-lg": "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

// type ButtonProps = useRender.ComponentProps<'button'> & VariantProps<typeof buttonVariants>
interface ButtonProps extends useRender.ComponentProps<'button'>, VariantProps<typeof buttonVariants> { }

const Button = (props: ButtonProps) => {
    const mergedProps = mergeProps(props, {
        className: twMerge(buttonVariants({ variant: props.variant, size: props.size }), props.className)
    })

    const element = useRender({
        defaultTagName: "button",
        render: props.render,
        props: mergedProps,
    })
    return element
}

export default Button