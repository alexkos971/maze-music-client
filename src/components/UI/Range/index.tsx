import React from "react";
import styles from "./Range.module.scss";

interface RangeProps {
    value: number, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any, 
    max: number, 
    min?: number | null,
    step?: number | null,
    name?: string,
    color?: 'green' | 'gray';
    withThumb?: boolean,
    className?: React.HTMLAttributes<HTMLDivElement> | string 
};

const Range = ({ value, onChange, className, max, min, step, name, withThumb = true, color = 'green' } : RangeProps) => {
    let classes = [
        styles['range'],
        styles[`range_${color}`],
        className ?? ''
    ].join(' ');

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
                name={name ?? 'track-progress'} />
            
            <span className={styles['range__track']}>
                <span className={styles['range__current-time']}></span>
            </span>

            {withThumb ? <span className={styles['range__thumb']}></span> : ''}
        </div>
    );
}

export default Range;