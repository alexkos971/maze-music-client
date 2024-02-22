import React, { ReactNode, createContext, useState, useRef } from "react";
import Dots from "@components/UI/Slider/dots";
import styles from "./Slider.module.scss";

interface SliderOptions {
    slidesToShow?: number | 1,
    withDots?: boolean
};

type ItemComponent = React.FC<{ children: ReactNode }>;
type SliderComponent = React.FC<{ children: JSX.Element | JSX.Element[], options: SliderOptions }> & {Item: ItemComponent};

// Context for passing props to children slides
const SliderContext = createContext<SliderOptions>({});

const Slider: SliderComponent = ({ 
    children, 
    options
}) => {
    let settings = {
        withDots: true,
        slidesToShow: 1,
        ...options
    };

    let sliderRef = useRef<HTMLDivElement | null>(null);
    let [active, setActive] = useState<number>(0);
    
    const scrollTo = (next: number) => {
        setActive(next);
        
        if (!sliderRef?.current) return;

        let childWidth: number = parseInt(getComputedStyle(sliderRef.current?.children[0]).width);

        if (typeof childWidth !== 'number' || childWidth <= 0) return;

        let scrollLeft = childWidth * next;
        sliderRef.current.scrollLeft = scrollLeft;
    };
    
    return (
        <SliderContext.Provider value={{ ...settings }}>
            <div className={styles.slider}>
                <div className={`${styles.slider__wrap} hide-scrollbar`} ref={sliderRef}>{children}</div>               

                { settings.withDots ?
                    <Dots count={Array.isArray(children) ? children.length : 0} active={active} setActive={scrollTo}/>
                : '' }
            </div>       
        </SliderContext.Provider>
    )
}

Slider.Item = ({ 
    children
} : { 
    children: ReactNode 
}) => {
    
    return (
        <SliderContext.Consumer>
            {({ slidesToShow = 1 }) => {
                return (
                    <div 
                        className={styles.slider__slide} 
                        style={{
                            ['--max-w' as any]: String((100 / slidesToShow) + '%')
                        }}>
                            {children}
                    </div>
                );
            }}
        </SliderContext.Consumer>
    );
};

export default Slider;