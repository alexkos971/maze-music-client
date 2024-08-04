import React, { ReactNode, createContext, useState, useRef, useEffect } from "react";
import Arrows from "@components/UI/Slider/arrows";
import styles from "./Slider.module.scss";

interface SliderOptions {
    slidesToShow?: number | 1,
    withDots?: boolean,
    withArrows?: boolean
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
        withDots: false,
        withArrows: true,
        slidesToShow: 1,
        ...options
    };

    let sliderRef = useRef<HTMLDivElement | null>(null);
    let [childWidth, setChildWidth] = useState<number>(0);  
    let [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    let [pos, setPos] = useState({
        left: 0, x: 0 
    });

    const mouseDownHandler = (e: React.MouseEvent) => {
        setIsMouseDown(true);              
    
        if ( sliderRef.current ) {
            sliderRef.current.style.scrollBehavior = 'initial';

            setPos({
                left: sliderRef.current.scrollLeft,
                x: e.clientX
            });
        }
    }

    const mouseUpHandler = (e: Event) => {
        setIsMouseDown(false);

        if (sliderRef.current) {
            sliderRef.current.style.scrollBehavior = 'smooth';
        }
    }

    const mouseMoveHandler = (e: React.MouseEvent) => {
        if ( !sliderRef?.current || !isMouseDown ) {
            return;
        }
        
        const dx = e.clientX - pos.x;

        setPos({
            left: pos.left - dx,
            x: e.clientX
        });        
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = pos.left;  
        }
    }, [pos]);

    // Initial Values
    useEffect(() => {
        if (!sliderRef?.current) return;
        
        setChildWidth(parseInt(getComputedStyle(sliderRef.current?.children[0]).width));
        
        setTimeout(() => {            
            sliderRef && sliderRef.current && setChildWidth(parseInt(getComputedStyle(sliderRef.current.children[0]).width));
        }, 2000);

        document.addEventListener('mouseup', mouseUpHandler);

        return () => {
            document.removeEventListener('mouseup', mouseUpHandler);
        }
    }, []);
    
    return (
        <SliderContext.Provider value={{ ...settings }}>
            <div className={styles.slider}>
                <div 
                    className={`${styles.slider__wrap} hide-scrollbar`} 
                    ref={sliderRef}                     
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                >
                    {children}
                </div>               

                { settings.withArrows ?
                    <Arrows 
                        sliderRef={sliderRef}
                        slideWidth={childWidth}                        
                    />
                    : <></> 
                }
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

Slider.Item.displayName = 'Slider.Item'

export default Slider;