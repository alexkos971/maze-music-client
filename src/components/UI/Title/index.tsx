import { ReactNode } from "react";

interface Title {
    children: ReactNode,
    className?: string,
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'  
}

const Title = ({ children, className, tag = 'h2'} : Title) => {
    let Tag : keyof JSX.IntrinsicElements = `${tag}`;

    return <Tag className={`text-3xl mb-5 font-bold ${className ?? ''}`}>{children}</Tag>
}

export default Title;