import React, { ReactNode, createContext, useCallback, useState, useEffect } from "react";
import Dots from "./dots";
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import styles from "./Slider.module.scss";

interface SliderOptions {
    slidesToShow?: number | 1,
    withDots?: boolean,
    dragFree?: boolean,
    containScroll? : string

};

type ItemComponent = React.FC<{ children: ReactNode }>;
type SliderComponent = React.FC<{ children: JSX.Element | JSX.Element[], options: SliderOptions }> & {Item: ItemComponent};

// Context for passing props to children slides
const SliderContext = createContext<SliderOptions>({});

const Slider: SliderComponent = ({ 
    children, 
    options
}) => {

    const defaultOptions : SliderOptions = {
        withDots: true,
        slidesToShow: 1,
    };

    const sliderOptions = Object.assign(defaultOptions, options);

    const [emblaRef, emblaApi]  = useEmblaCarousel({
        loop: false,
        slidesToScroll: 1,
        dragFree: true, 
        containScroll: 'trimSnaps'
    });

    let [active, setActive] = useState<number>(0);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    // const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    //     setScrollSnaps(emblaApi.scrollSnapList())
    //   }, [])
    
      const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setActive(emblaApi.selectedScrollSnap())
        // setPrevBtnDisabled(!emblaApi.canScrollPrev())
        // setNextBtnDisabled(!emblaApi.canScrollNext())
      }, [])

    useEffect(() => {
        if (!emblaApi) return
        // onInit(emblaApi)
        onSelect(emblaApi)
        // emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [
        emblaApi, 
        // onInit, 
        onSelect
    ]);
    
    return (
        <SliderContext.Provider value={{ ...options }}>
            <div className="embla relative mx-[-10px] flex w-full" ref={emblaRef}>
                <div className="embla__container flex w-full">{children}</div>               
                
                { sliderOptions.withDots ?
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
            {(props) => {
                return (
                    <div 
                        className={`embla__slide px-[10px] w-full ${styles['slider-item']}`} 
                        style={{
                            ['--max-w' as any]: String((100 / props.slidesToShow!) + '%')
                        }}>
                            {children}
                    </div>
                );
            }}
        </SliderContext.Consumer>
    );
};

export default Slider;