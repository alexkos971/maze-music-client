import React, { ReactNode, createContext, useState, useEffect } from "react";

type registerFieldType = (fieldName: string, fieldValue: any, fieldValid?: boolean) => void;

export interface ValidationContextType {
    registerField: registerFieldType;
    isFormValid: () => boolean;    
};

export const ValidationContext = createContext<ValidationContextType | null>(null);

type FieldsType<T> = {} | {[key: string] : T};

export interface ValidationProviderProps {
    className?: string;
    children: ReactNode | JSX.Element,
    fields: FieldsType<any>,
    setFields: (value: FieldsType<any>) => void
    validFields?: FieldsType<boolean>, 
    setValidFields?: (value: FieldsType<boolean> ) => void
};

export const ValidationProvider : React.FC<ValidationProviderProps> = ({ children, fields, setFields, validFields, setValidFields }) => {
    // const [ validatedFields, setValidatedFields ] = useState<{ [name: string] : boolean }>({});

    const registerField : registerFieldType = (fieldName, fieldValue, isValid) => {
        setFields((prev: {}) => ({
            ...prev,
            [fieldName] : fieldValue
        }));

        if (typeof isValid !== 'boolean' || !setValidFields) return;
        
        setValidFields((prev :  FieldsType<boolean>) => ({
            ...prev,
            [fieldName] : isValid
        }));
    }

    const isFormValid = () : boolean => {
        for (let field in validFields) {
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