import React from "react";
import styles from "./Range.module.scss";
import classNames from "classnames";

interface RangeProps {
    value: number, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any, 
    onMouseUp?: (e: React.MouseEvent<HTMLInputElement>) => any,
    onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => any,
    max: number, 
    min?: number | null,
    step?: number | null,
    name?: string,
    color?: 'green' | 'gray';
    className?: React.HTMLAttributes<HTMLDivElement> | string 
};

const Range = ({ value, onChange, onMouseUp, onMouseDown, className, max, min, step, name, color = 'green' } : RangeProps) => {
    let classes = classNames(
        className,
        styles['range'],
        styles[`range_${color}`],
    );

    return (
        <div 
            className={classes} 
            style={{
                '--range-progress': ((value !== 0 && max !== 0) ? ((value / max) * 100) : 0) + '%',
            } as React.CSSProperties}>
            
            <input 
                value={value} 
                onChange={onChange} 
                max={max} 
                min={min ?? undefined} 
                step={step ?? undefined} 
                className={styles['range__input']} 
                type="range" 
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                name={name ?? 'track-progress'} />
            
            <span className={styles['range__track']}>
                <span className={styles['range__current-time']}></span>
            </span>
        </div>
    );
}

export default Range;