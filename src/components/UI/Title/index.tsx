import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Title {
    children: ReactNode,
    className?: string,
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'  
}

const Title = ({ children, className, tag = 'h2'} : Title) => {
    let Tag : keyof JSX.IntrinsicElements = `${tag}`;

    let styles = {
        h1: 'text-3xl',
        h2: 'sm:text-3xl text-lg',
        h3: 'text-2xl',
        h4: 'text-2xl',
        h5: 'text-xl',
        h6: 'text-xl'
    }

    return <Tag className={twMerge(
        styles[tag], 
        `mb-3 md:mb-5 font-bold text-gray-400 dark:text-white`, 
        className ?? ''
        )}>{children}</Tag>
}

export default Title;