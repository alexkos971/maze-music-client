import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";

interface ValidationContextType {
    registerField: (fieldName: string, fieldValid: boolean) => void;
    isFormValid: () => boolean;
    fields: {[key : string] : boolean} | {};
};

export const ValidationContext = createContext<ValidationContextType | null>(null);

export const useFormValidation = () : ValidationContextType | false => {
    const context = useContext(ValidationContext);
    if ( !context ) {
        return false;
        // throw new Error('useFormValidation must be used within a ValidationProvider');
    }
    return context; 
}


interface ValidationProviderProps {
    children: ReactNode | JSX.Element
};

export const ValidationProvider : React.FC<ValidationProviderProps> = ({ children }) => {
    const [ fields, setFields ] = useState<{ [name: string] : boolean }>({});

    const registerField = (fieldName: string, fieldValid: boolean) => {
        setFields((prev) => ({
            ...prev,
            [fieldName] : fieldValid
        }));
    }

    const isFormValid = () : boolean => {
        for (const field in fields) {
            if ( !fields[field] ) {
                return false;
            }
        }
        return true;
    }

    return (
        <ValidationContext.Provider value={{ registerField, isFormValid, fields }}>
            {children}
        </ValidationContext.Provider>
    );
}