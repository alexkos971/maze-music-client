import React, { ReactNode } from "react";
import { Select} from "./select";
import { 
    Text,
    TextArea,
    Email,
    Tel,
    Search
} from "./text";

const FieldTitle : React.FC<{title: string | undefined}> = ({ title }) => (
    <>
        {title ? <span className="field__title mb-[10px] mt-3 text-sm text-black-36">{title}</span> : <></>}
    </>
);

const FieldError : React.FC<{error: string | undefined}> = ({ error }) => ( 
    <>
        {error ? <span className="field__error text-red-fc text-xs mt-2">{error}</span> : ''}
    </>
);

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
    TextArea,
    Email,
    Tel,
    Search
};

// export default Field;