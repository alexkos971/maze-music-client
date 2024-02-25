import { ReactNode, Children } from "react";
import styles from './DottedRow.module.scss';

interface Props {
    children: ReactNode | ReactNode[],
    className?: string,
    dotColor?: string
}

const DottedRow = ({ children, className, dotColor } : Props) => {
    return children ? (
        <div className={`${styles['dotted-row']} ${className ?? ''}`}>
            {
                Children.map(children, (child, index) => (
                    <>
                        {child}
                        {index < (Children.count(children) - 1) ? <span style={dotColor ? {backgroundColor: dotColor} : undefined} className={styles['dotted-row__dot']}></span> : ''}
                    </>
                ))
            }
        </div>
    ) : '';
} 

export default DottedRow;