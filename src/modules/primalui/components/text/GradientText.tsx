import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render'
import React, { ReactNode } from 'react'

interface GradientTextProps extends useRender.ComponentProps<'p'> {

}

const GradientText = ({ render, ...otherProps }: GradientTextProps) => {

    const element = useRender({
        defaultTagName: 'p',
        render,
        props: mergeProps<'p'>({ className: "inline-flex text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-200 to-indigo-400" }, otherProps),
    });

    return element;
}

export default GradientText