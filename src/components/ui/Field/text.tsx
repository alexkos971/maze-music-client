import React, { useEffect, useId, useState } from "react";
import styles from "./Field.module.scss";
import { MainFieldProps } from "./index";
import { FieldError, FieldTitle } from "./index";

import { useFormValidation } from "@components/UI/Form/validation";
import { useFieldValidation } from "@hooks";

import { EyeIcon, EyeClosedIcon } from "@helpers/images";

interface TextFieldProps extends MainFieldProps {    
    value?: string | number;    
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

interface FieldTemplateProps extends TextFieldProps {
    type: 'text' | 'email' | 'tel' | 'search' | 'password' | 'textarea';
}

const TextFieldTemplate = ({ 
    type,
    id, 
    title,
    value = '',
    placeholder,
    onChange,
    className = '',
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
        if (registerField) {
            registerField(name, is_valid);
        }
    }, [is_valid]);

    return (
        <div className={`field field_${type} flex flex-col mt-3 w-full ${className}`}>
            <FieldTitle title={title}/>

            <label className="field__label relative" htmlFor={name}>

            {(() => {
                if (type == 'textarea') {
                    return (                        
                        <textarea 
                            className={styles['typeable-input'] + ( error.length ? ' ' + styles['typeable-input_error'] : '' ) + ` resize-none`} 
                            name={name} 
                            placeholder={placeholder ?? ''}
                            id={field_id}
                            required={required ?? false}
                            rows={3}
                            value={val}
                            onChange={handleInput} >
                        </textarea>
                    );
                }
                else if ( type == 'password' ) {
                    const [isVisible, setIsVisible] = useState<boolean>(false);

                        return (
                            <>
                                <input 
                                    className={styles['typeable-input'] + ( error.length ? ' ' + styles['typeable-input_error'] : '' )} 
                                    type={isVisible ? 'text' : 'password'} 
                                    name={name} 
                                    value={val}
                                    required={required ?? false}
                                    placeholder={placeholder ?? ''}
                                    onChange={handleInput}
                                    id={field_id}/>

                                <div
                                    onClick={() => setIsVisible(!isVisible)} 
                                    className="block absolute right-[18px] top-1/2 translate-y-[-50%] cursor-pointer">
                                    {isVisible ?  <EyeIcon/> : <EyeClosedIcon/>}
                                </div>
                            </>
                        );
                }
                else {
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

const Password : React.FC<TextFieldProps> = (props) => {
    return <TextFieldTemplate  {...{...props, type: 'password'}}/>;
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
    Password,
    TextArea,
    Tel,
    Search,
};