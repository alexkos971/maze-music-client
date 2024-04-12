import React, { useEffect } from "react";
import { showToast } from "@store/reducers/interfaceReducer";
import { useAppDispatch, useAppSelector } from "@hooks";

export type ToastProps = {
    type: 'success' | 'error' | 'warning' | 'info' | 'hidden';
    text?: string | string[];
};

const ToastContent = ({ className, text, onClose } : { className: string, text?: string; onClose: () => void }) => (
    <div className={`${className} duration-300 px-4 py-3 flex items-center gap-4 mb-3`}>
        <span className="text-white text-lg">{text}</span> 
        
        <button type="button" onClick={onClose} className="relative w-6 h-6 block 
            before:w-5 before:h-[2px] before:bg-white before:absolute before:left-1/2 before:top-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:-rotate-45
            after:w-5 after:h-[2px] after:bg-white after:absolute after:left-1/2 after:top-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-45
        "></button>
    </div>
);

const Toast = () => {
    const dispatch = useAppDispatch();
    const { type, text } = useAppSelector(state => state.interface.toast);

    let styles : {[key: string]: string} = {
        'success': 'bg-green-05',
        'error': 'bg-red-fc',
        'warning': 'bg-yellow-F4E15A',
        'info': 'bg-blue-75',
        'hidden': 'opacity-0 scale-75 pointer-events-none'
    };

    // Auto Hide
    useEffect(() => {
        let timerId : any;
        
        if (type == 'hidden') return;

        setTimeout(() => {
            dispatch(showToast({ text, type: 'hidden' }))
        }, 2000);

        return () => clearTimeout(timerId);
    }, [type]);

    return (
        <div className="fixed bottom-6 right-3 flex flex-col items-end z-50">
        {
            Array.isArray(text) ? 
                text.map(item => (
                    <ToastContent className={styles[type]} key={item} text={item} onClose={() => dispatch(showToast({ text, type: 'hidden' }))}/>
                ))
            : <ToastContent className={styles[type]} text={text} onClose={() => dispatch(showToast({ text, type: 'hidden' }))}/>
        }
        </div>
    );
}

export default Toast;