import { ReactNode, Children } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    children: ReactNode | ReactNode[],
    className?: string,
    dotColor?: string
}

const DottedRow = ({ children, className, dotColor } : Props) => {
    return children ? (
        <div className={twMerge('flex items-center gap-x-4 mt-6 [&>*]:m-0', className)}>
            {
                Children.map(children, (child, index) => {
                    return (
                        <>
                            {child}
                            {/* @ts-ignore */}
                            { ( child && Object.keys(child?.props).length && index < Children.count(children) - 1) ? <span style={dotColor ? {backgroundColor: dotColor} : undefined} className={'w-1 h-1 bg-white rounded-full'}></span> : ''}
                        </>
                    )
                })
            }
        </div>
    ) : '';
} 

export default DottedRow;