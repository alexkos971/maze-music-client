import useThrottle from './throttle';
import { useEffect, useState } from 'react';

let screenSizes: {[key:string]: number} = {
    'lg': 1200,
    'md': 992,
    'sm': 768,
    'xs': 640 
};

function getDimension() {
    if (window.innerWidth > 1200) {
        return 'xl';    
    }
    else if (window.innerWidth < 1200 && window.innerWidth > 992) {
        return 'lg';    
    }
    else if (window.innerWidth < 992 && window.innerWidth > 768) {
        return 'md';    
    }
    else if (window.innerWidth < 768 && window.innerWidth > 640) {
        return 'sm';    
    }
    else if (window.innerWidth < 640) {
        return 'xs';    
    }
};

export const screenIsGreater = (dimension: string) : boolean | Error => {
    if (!screenSizes[dimension]) {
        return new Error('Unknown screen type');
    }

    let [isGreater, setIsGreater] = useState(window.innerWidth >= screenSizes[dimension]);
    let throttledValue = useThrottle(isGreater, 50);

    const resizeHandle = () => setIsGreater(window.innerWidth >= screenSizes[dimension]);

    useEffect(() => {
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle, false);
    }, []);

    return throttledValue;
}

export const screenIsSmaller = (dimension: string) : boolean | Error => {
    if (!screenSizes[dimension]) {
        return new Error('Unknown screen type');
    }

    let [isSmaller, setIsSmaller] = useState(window.innerWidth < screenSizes[dimension]);
    let throttledValue = useThrottle(isSmaller, 50)

    const resizeHandle = () => setIsSmaller(window.innerWidth < screenSizes[dimension]);

    useEffect(() => {
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle, false);
    }, []);

    return throttledValue;
}


export const useScreen = () => {
    const [dimension, setDimension] = useState(getDimension());
    let throttledValue = useThrottle(dimension, 50);

    const resizeHandle = () => setDimension(getDimension());

    useEffect(() => {
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle, false);
    }, []);

    return throttledValue;
};