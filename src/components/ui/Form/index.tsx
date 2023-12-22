import React, { ReactNode } from "react";
import { ValidationProvider } from "./validation";

const Form : React.FC<{ children : ReactNode }> = ({ children }) => {
    return (
        <ValidationProvider>
            <form>{children}</form>
        </ValidationProvider>
    );

}

export default Form;