import { ReactNode } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface CardProps {
    children: ReactNode;
    onClick?: () => void;
    link?: string;
    className?: string;
}

const CardWrap = ({ children, onClick, link, className } : CardProps) => {
    let classes = twMerge(
        "relative rounded-md overflow-hidden p-4 bg-gray-50 dark:bg-gray-500 min-w-0 inline-flex flex-col",
        (className || link) ? "cursor-pointer" : "",        
        className
    );

    if (onClick) {
        return <div className={classes} onClick={onClick}>{children}</div>
    }
    
    else if (link) {
        return <Link href={link} className={classes}>{children}</Link>
    }

    return <div className={classes}>{children}</div>
}

export default CardWrap;