import { ReactNode } from "react";

interface Title {
    children: ReactNode,
    className?: string,
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'  
}

const Title = ({ children, className, tag = 'h2'} : Title) => {
    let Tag : keyof JSX.IntrinsicElements = `${tag}`;

    let styles = {
        h1: 'text-3xl',
        h2: 'text-3xl',
        h3: 'text-2xl',
        h4: 'text-2xl',
        h5: 'text-xl',
        h6: 'text-xl'
    }

    return <Tag className={`${styles[tag]} mb-5 font-bold ${className ?? ''}`}>{children}</Tag>
}

export default Title;