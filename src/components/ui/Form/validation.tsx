import React, { ReactNode, createContext, useState, useEffect } from "react";

type registerFieldType = (fieldName: string, fieldValue: any, fieldValid?: boolean) => void;

export interface ValidationContextType {
    registerField: registerFieldType;
    isFormValid: () => boolean;    
};

export const ValidationContext = createContext<ValidationContextType | null>(null);

export interface ValidationProviderProps {
    className?: string;
    children: ReactNode | JSX.Element,
    fields: {},
    setFields: (fields: {}) => void
    validFields: { [name: string] : boolean }, 
    setValidFields: (fields: () => void | { [name: string] : boolean }) => void
};

export const ValidationProvider : React.FC<ValidationProviderProps> = ({ children, fields, setFields, validFields, setValidFields }) => {
    // const [ validatedFields, setValidatedFields ] = useState<{ [name: string] : boolean }>({});

    const registerField : registerFieldType = (fieldName, fieldValue, isValid) => {
        setFields((prev: {}) => ({
            ...prev,
            [fieldName] : fieldValue
        }));

        if (typeof isValid !== 'boolean') return;
        setValidFields((prev) => ({
            ...prev,
            [fieldName] : isValid
        }));
    }

    const isFormValid = () : boolean => {
        for (const field in validFields) {
            if ( !validFields[field] ) {
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