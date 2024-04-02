import React from "react";
import { ValidationProvider, ValidationProviderProps } from "./validation";

const Form : React.FC<ValidationProviderProps> = ({ children, className, fields, setFields, validFields, setValidFields }) => {
    return (
        <ValidationProvider fields={fields} setFields={setFields} validFields={validFields} setValidFields={setValidFields}>
            <form className={`w-full ${className ?? ''}`}>{children}</form>
        </ValidationProvider>
    );

}

export default Form;