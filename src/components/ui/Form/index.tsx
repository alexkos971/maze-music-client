import React from "react";
import { ValidationProvider, ValidationProviderProps } from "./validation";

const Form : React.FC<ValidationProviderProps> = ({ children, className, fields, setFields }) => {
    return (
        <ValidationProvider fields={fields} setFields={setFields}>
            <form className={`w-full ${className ?? ''}`}>{children}</form>
        </ValidationProvider>
    );

}

export default Form;