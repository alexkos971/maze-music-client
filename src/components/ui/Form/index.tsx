import React, { ReactNode } from "react";
import { ValidationProvider } from "./validation";

const Form : React.FC<{ children : ReactNode, className : string }> = ({ children, className }) => {
    return (
        <ValidationProvider>
            <form className={`w-full ${className ?? ''}`}>{children}</form>
        </ValidationProvider>
    );

}

export default Form;