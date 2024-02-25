import React, { ReactNode, useContext } from "react";
import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";

interface ButtonProps {
    type?: 'button' | 'submit',
    children: ReactNode,
    color?: 'green' | 'black' | 'gray' | 'white',
    disabled?: boolean | undefined,
    size?: 'normal' | 'small',
    className?: string,
    onClick?: () => void
};

const Button: React.FC<ButtonProps> = ({ 
    type = 'button', 
    children, 
    color = 'green',
    disabled,
    size = 'normal',
    className,
    onClick
}) => {
    const btn_colors = {
        'white': 'bg-white text-black-36 hover:opacity-70',
        'gray': 'bg-black-36 text-white hover:opacity-70',
        'green': 'bg-green-05 text-white hover:opacity-70',
        'black' : 'bg-black-36 text-white hover:opacity-70',
        'disabled' : 'bg-red-fc cursor-not-allowed opacity-80 text-white'
    };

    const btn_sizes = {
        'small' : 'py-[6px] px-[10px] min-w-[100px] text-sm',
        'normal' : 'py-[10px] px-6 min-w-[160px] text-base'
    };

    let isDisabled = typeof disabled == "boolean"  ? disabled : false;
    
    if (type == 'submit') {
        const buttonContext = useContext(ValidationContext) as ValidationContextType;
        
        if (buttonContext) {
            isDisabled = !buttonContext.isFormValid();
        }
    }

    return (
        <button 
            type={'button'} 
            disabled={isDisabled}     
            onClick={onClick ?? null}        
            className={`
                duration-300 
                rounded-md  
                flex 
                items-center 
                justify-center 
                gap-2 
                ${btn_sizes[size]} ${isDisabled ? btn_colors['disabled'] : btn_colors[color] + ' cursor-pointer'}
                ${className ?? ''}`}>
            
            {children}
        </button>
    );
}

export default Button;