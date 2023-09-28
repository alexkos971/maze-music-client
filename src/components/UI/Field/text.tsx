import React, { useEffect, useId, useState } from "react";
import styles from "./Field.module.scss";
import { MainFieldProps } from "./index";
import { FieldError, FieldTitle } from "./index";

import { useFormValidation } from "../Form/validation";
import { useFieldValidation } from "@hooks";

interface TextFieldProps extends MainFieldProps {    
    value?: string | number | undefined;    
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

interface FieldTemplateProps extends TextFieldProps {
    type: 'text' | 'email' | 'tel' | 'search' | 'password' | 'textarea';
}

const TextFieldTemplate = ({ 
    type,
    id, 
    title,
    value,
    placeholder,
    onChange,
    name,
    required = false
} : FieldTemplateProps) => {    
    const {  registerField } = useFormValidation();

    const field_id = id ? id : useId();

    const [ error, setError ] = useState<string>('');
    const [val, setVal] = useState<TextFieldProps['value']>(value);
    const [is_valid, setIsValid] = useState(!error.length && ( (required  && val) || !required ) ? true : false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) : void => {
        setVal(e.currentTarget.value);

        const [ current_valid, current_error ] = useFieldValidation(e.currentTarget.value, type, required);

        if (error !== current_error) {
            setError(current_error);
        }

        if (current_valid !== is_valid) {
            setIsValid(current_valid);
        }

        // Call side on change
        if (onChange) {
            onChange(e);
        }
    }

    useEffect(() => {
        registerField(name, is_valid);
    }, [is_valid]);

    return (
        <div className={`field field_${type} flex flex-col mt-3 max-w-sm`}>
            <FieldTitle title={title}/>

            <label className="field__label relative" htmlFor={name}>

            {(() => {
                if (type !== 'textarea') {
                    return (
                        <input 
                            className={styles['typeable-input'] + ( error.length ? ' ' + styles['typeable-input_error'] : '' )} 
                            type={type} 
                            name={name} 
                            value={val}
                            required={required ?? false}
                            placeholder={placeholder ?? ''}
                            onChange={handleInput}
                            id={field_id}/>
                    );
                }
                else {
                    return (                        
                        <textarea 
                            className={styles['typeable-input'] + ( error.length ? ' ' + styles['typeable-input_error'] : '' ) + `resize-none`} 
                            name={name} 
                            placeholder={placeholder ?? ''}
                            id={field_id}
                            required={required ?? false}
                            rows={3}
                            onChange={handleInput} >
                            {val}
                        </textarea>
                    );      
                }
            })()}        
            </label>

            <FieldError error={error}/>            
        </div>
    );
};

const Text : React.FC<TextFieldProps> = (props) => {
    return <TextFieldTemplate {...{...props, type: 'text'}}/>;
}

const Email : React.FC<TextFieldProps> = (props) => {
    return <TextFieldTemplate  {...{...props, type: 'email'}}/>;
}

const TextArea : React.FC<TextFieldProps> = (props) => {
    return <TextFieldTemplate  {...{...props, type: 'textarea'}}/>;
}

const Tel : React.FC<TextFieldProps> = (props) => {
    return <TextFieldTemplate  {...{...props, type: 'tel'}}/>;
}

const Search : React.FC<TextFieldProps> = (props) => {
    return <TextFieldTemplate  {...{...props, type: 'search'}}/>;
}

export {
    Text,
    Email,
    TextArea,
    Tel,
    Search
};