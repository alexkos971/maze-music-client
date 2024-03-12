import React, { ReactNode, createContext, useState, useRef, useEffect } from "react";
import Dots from "@components/UI/Slider/dots";
import styles from "./Slider.module.scss";
import { useThrottle } from "@hooks/listeners";

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
    let [childWidth, setChildWidth] = useState<number>(0);
    let [ignoreScroll, setIgnoreScroll] = useState<boolean>(false)
    
    const scrollTo = (next: number) => {
        setIgnoreScroll(true);
        setActive(next);
        
        if (sliderRef?.current && childWidth > 0) {            
            let scrollLeft = childWidth * next;
            sliderRef.current.scrollLeft = scrollLeft;
        }    
        
        setTimeout(() => {
            setIgnoreScroll(false);
        }, 1000);
    };

    const handleScroll = () => {
        let scrollableValue = sliderRef.current?.scrollLeft ?? 0;        
            
        if (scrollableValue > 0 && childWidth > 0 && !ignoreScroll) {
            setActive(Math.floor(scrollableValue / childWidth));
        }
    }

    // Initial Values
    useEffect(() => {
        if (!sliderRef?.current) return;
        
        setChildWidth(parseInt(getComputedStyle(sliderRef.current?.children[0]).width));
        
        setTimeout(() => {            
            sliderRef && sliderRef.current && setChildWidth(parseInt(getComputedStyle(sliderRef.current.children[0]).width));
        }, 2000)

    }, []);
    
    return (
        <SliderContext.Provider value={{ ...settings }}>
            <div className={styles.slider}>
                <div className={`${styles.slider__wrap} hide-scrollbar`} ref={sliderRef} onScroll={handleScroll}>{children}</div>               

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