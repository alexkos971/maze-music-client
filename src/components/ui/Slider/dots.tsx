import React, { ReactNode, Dispatch,  useId } from "react";

interface DotsProps {
    count: number, 
    active: number,
    setActive: (prop : number) => void
};

const Dots = ({ count, active, setActive } : DotsProps) => {
    const id = useId();

    return (
        <div className={`embla__dots absolute top-[calc(100%+32px)] left-1/2 translate-x-[-50%] flex items-center justify-center`}>
            { Array.from({length: count}, (_, index) => (
                <button 
                    className={`embla__dots-item mx-2 shrink-0 p-1 block after:block after:w-2 after:h-2 after:rounded-lg ${active == index ? 'after:bg-gray-40' : 'after:bg-gray-c4'}`}
                    onClick={() => setActive(index)}
                    type="button" 
                    key={id + index}>
                </button>
            )) }            
        </div>
    );
}

export default Dots;