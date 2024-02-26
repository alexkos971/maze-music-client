import React, { useContext } from "react";
import { AppContext } from "@components/AppWrap";

export type ToastProps = {
    type: 'success' | 'error' | 'warning' | 'info' | 'hidden';
    text?: string;
};

const Toast: React.FC<ToastProps> = ({ text, type }) => {
    const appContext = useContext(AppContext);

    let styles : {[key: string]: string} = {
        'success': 'bg-green-05',
        'error': 'bg-red-fc',
        'warning': 'bg-yellow-F4E15A',
        'hidden': 'opacity-0 scale-75'
    };

    return (
        <div className={`${styles[type]} duration-300 z-50 px-4 py-3 fixed bottom-6 right-6 flex items-center gap-4`}>
            <span className="text-white text-lg">{text}</span> 
            
            <button type="button" onClick={() => appContext && appContext.showToast({ text, type: 'hidden' })} className="relative w-6 h-6 block 
                before:w-5 before:h-[2px] before:bg-white before:absolute before:left-1/2 before:top-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:-rotate-45
                after:w-5 after:h-[2px] after:bg-white after:absolute after:left-1/2 after:top-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-45
            "></button>
        </div>
    );
}

export default Toast;