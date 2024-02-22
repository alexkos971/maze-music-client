import React, { ReactNode, Dispatch, useId } from "react";
import styles from './Slider.module.scss';

interface DotsProps {
    count: number, 
    active: number,
    setActive: (prop : number) => void
};

const Dots = ({ count, active, setActive } : DotsProps) => {
    const id = useId();

    return (
        <div className={styles.slider__dots}>
            { Array.from({length: count}, (_, index) => (
                <button 
                    className={`${styles['slider__dots-item']}  ${active == index ? 'after:bg-gray-40' : 'after:bg-gray-c4'}`}
                    onClick={() => setActive(index)}
                    type="button" 
                    key={id + index}>
                </button>
            )) }            
        </div>
    );
}

export default Dots;