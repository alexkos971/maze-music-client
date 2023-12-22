import React, { ReactNode } from "react";
import { useFormValidation } from "../Form/validation";

interface ButtonProps {
    type?: 'button' | 'submit',
    children: ReactNode,
    color?: 'green' | 'black' | 'gray' | 'white',
    disabled?: boolean | undefined,
    size?: 'normal' | 'small'
};

const Button: React.FC<ButtonProps> = ({ 
    type = 'button', 
    children, 
    color = 'green',
    disabled,
    size = 'normal'
}) => {
    const btn_colors = {
        'white': 'bg-white text-black-36',
        'gray': 'bg-black-36 text-white',
        'green': 'bg-green-05 text-white',
        'black' : 'bg-black-36 text-white',
        'disabled' : 'bg-red-fc cursor-not-allowed opacity-80 text-white'
    };

    const btn_sizes = {
        'small' : 'py-[6px] px-[10px] max-w-[100px] text-sm justify-center',
        'normal' : 'py-[10px] px-6 max-w-[160px] text-base'
    };

    const { isFormValid } = useFormValidation();
    const isDisabled = typeof disabled == "boolean"  ? disabled : ( type == 'submit' ? !isFormValid() : false );

    return (
        <button 
            type={'button'} 
            disabled={isDisabled}     
            onClick={() => {
                console.log(isFormValid)
            }}        
            className={`duration-300 rounded-md mt-6 w-full flex items-center gap-2 ${btn_sizes[size]} cursor-pointer ${isDisabled ? btn_colors['disabled'] : btn_colors[color]}`}>
            {children}
        </button>
    );
}

export default Button;