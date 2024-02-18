import React, { ReactNode } from "react";
import { useFormValidation } from "@components/UI/Form/validation";

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

    const { isFormValid } = useFormValidation();
    const isDisabled = typeof disabled == "boolean"  ? disabled : ( type == 'submit' ? !isFormValid() : false );

    return (
        <button 
            type={'button'} 
            disabled={isDisabled}     
            onClick={() => console.log(isFormValid())}        
            className={`duration-300 rounded-md font-secondary flex items-center justify-center gap-2 ${btn_sizes[size]} ${isDisabled ? btn_colors['disabled'] : btn_colors[color] + ' cursor-pointer'}`}>
            {children}
        </button>
    );
}

export default Button;