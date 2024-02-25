import React from "react";
import { Select} from "./select";
import { RadiosWithImages } from "./radios-with-images";

import { useTranslation } from "next-i18next";

import { 
    Text,
    TextArea,
    Email,
    Password,
    Tel,
    Search
} from "./text";


const FieldTitle : React.FC<{title: string | undefined}> = ({ title }) => (
    <>
        {title ? <span className="field__title mb-[10px] mt-3 text-sm text-black-36">{title}</span> : <></>}
    </>
);

const FieldError : React.FC<{error: string | undefined}> = ({ error }) => {
    const {t} = useTranslation();
    
    return (
        <>
            {error ? <span className="field__error text-red-fc text-xs mt-2">{t(error)}</span> : ''}
        </>
    );
}

export interface MainFieldProps {
    title?: string;
    id?: string;
    value?: any;
    name: string;
    placeholder?: string;
    required?: boolean;
};

export type FieldTypes = 
'text' 
| 'email' 
| 'tel' 
| 'search' 
| 'select' 
| 'password' 
| 'textarea' 
| 'file' 
| 'password';

export { 
    FieldTitle, 
    FieldError,

    Select,
    Text,
    Password,
    TextArea,
    Email,
    Tel,
    Search,
    RadiosWithImages
};

// export default Field;