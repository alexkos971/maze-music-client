import React, { ReactNode } from "react";
import { useFormValidation } from "../Form/validation";

interface ButtonProps {
    type?: 'button' | 'submit',
    children: ReactNode,
    color?: 'green' | 'black',
    disabled?: boolean | undefined
};

const Button: React.FC<ButtonProps> = ({ 
    type = 'button', 
    children, 
    color = 'green',
    disabled
}) => {
    const btn_colors = {
        'green': 'bg-green-05 text-white',
        'black' : 'bg-black-36 text-white',
        'disabled' : 'bg-red-fc cursor-not-allowed opacity-80 text-white'
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
            className={`text-base duration-300 rounded-md mt-6 py-[10px] px-6 w-full max-w-[160px] cursor-pointer ${isDisabled ? btn_colors['disabled'] : btn_colors[color]}`}>
            {children}
        </button>
    );
}

export default Button;