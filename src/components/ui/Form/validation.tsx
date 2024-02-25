import React, { ReactNode, createContext, useState } from "react";

export interface ValidationContextType {
    registerField: (fieldName: string, fieldValue: any, fieldValid?: boolean) => void;
    isFormValid: () => boolean;    
};

export const ValidationContext = createContext<ValidationContextType | null>(null);

export interface ValidationProviderProps {
    className?: string;
    children: ReactNode | JSX.Element,
    fields: {},
    setFields: (fields: {}) => void
};

export const ValidationProvider : React.FC<ValidationProviderProps> = ({ children, fields, setFields }) => {
    const [ validatedFields, setValidatedFields ] = useState<{ [name: string] : boolean }>({});

    const registerField = (fieldName: string, fieldValue: any, isValid?: boolean) => {
        setFields((prev: {}) => ({
            ...prev,
            [fieldName] : fieldValue
        }));

        if (typeof isValid !== 'boolean') return;
        setValidatedFields((prev) => ({
            ...prev,
            [fieldName] : isValid
        }));
    }

    const isFormValid = () : boolean => {
        for (const field in validatedFields) {
            if ( !validatedFields[field] ) {
                return false;
            }
        }
        return true;
    }

    return (
        <ValidationContext.Provider value={{ registerField, isFormValid }}>
            {children}
        </ValidationContext.Provider>
    );
}