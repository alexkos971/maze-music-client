import { MutableRefObject, forwardRef } from "react";
import styles from "./Slider.module.scss";
import classNames from "classnames";
import ArrowIcon from "@icons/chevron-left-gray.svg";

interface ArrowsProps {
    sliderRef: MutableRefObject<HTMLDivElement | null>,
    slideWidth: number
}

const Arrows = forwardRef<HTMLDivElement, ArrowsProps>(function({
    sliderRef,
    slideWidth
}, ref ) {    
    const moveTo = (direction: 'prev' | 'next') => {
        if (sliderRef?.current) {

            if (direction == 'prev') {
                sliderRef.current.scrollLeft -= slideWidth;
            } else {
                sliderRef.current.scrollLeft += slideWidth;
            }
        }
    }

    return (
        <div className={styles.slider__arrows}>
            <button 
                type="button"
                onClick={() => moveTo('prev')} 
                className={classNames(
                    styles['slider__arrows-item']
                )}>
                    <ArrowIcon/>
                </button>

            <button 
                type="button"
                onClick={() => moveTo('next')}
                className={classNames(
                    styles['slider__arrows-item'],
                    styles['slider__arrows-item_next']
                )}            
                >
                    <ArrowIcon/>
                </button>
        </div>
    )
})


Arrows.displayName = 'Arrows';

export default Arrows;