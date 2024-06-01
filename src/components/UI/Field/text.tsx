import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import styles from "./Field.module.scss";
import { MainFieldProps } from "./index";
import { FieldError, FieldTitle } from "./index";

import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";
import { useFieldValidation } from "@hooks";

import { EyeIcon, EyeClosedIcon } from "@utils/images";
import classNames from "classnames";

interface TextFieldProps extends MainFieldProps {    
    value?: string | number;    
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

interface FieldTemplateProps extends TextFieldProps {
    type: 'text' | 'email' | 'tel' | 'search' | 'password' | 'confirm-password' | 'textarea';
    password?: string
}

const TextFieldTemplate = ({ 
    type,
    id, 
    title,
    value = '',
    placeholder,
    onChange,
    className = '',
    password = undefined,
    name,
    required = false
} : FieldTemplateProps) => {    

    const formContext = useContext(ValidationContext) as ValidationContextType;

    const inputRef = useRef(null);

    const [val, setVal] = useState<TextFieldProps['value']>(value);
    const [current_valid, current_error] = useFieldValidation(
        val, 
        type, 
        required, 
        (type == 'confirm-password' && password) 
            ? password 
            : undefined
    );

    const [ error, setError ] = useState<string>('');
    const [is_valid, setIsValid] = useState(!error.length && ( (required && val) || !required ) ? true : false);

    const [firstEnter, setFirstEnter] = useState(true);

    useEffect(() => {        
        if (firstEnter) {
            return;
        }

        if (error !== current_error) {
            setError(current_error);
        }

        if (current_valid !== is_valid) {
            setIsValid(current_valid);
        }

        // Call side on change        
    }, [val]);

    useEffect(() => {
        if (formContext?.registerField) {
            formContext.registerField(name, val, is_valid);
        }  
    }, [is_valid, val])


    const [passIsVisible, setPassIsVisible] = useState<boolean>(false);    

    const handleInput = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVal(e.currentTarget.value);

        if (firstEnter) setFirstEnter(false);

        if (onChange && !firstEnter) {
            onChange(e);
        }
    }

    return (
        <div className={classNames(
            styles.field,
            styles[`field_${type == 'confirm-password' ? 'password' : type}`],
            'flex flex-col mt-3 w-full',
            className
        )}>
            <FieldTitle title={title}/>

            <label className="field__label relative" htmlFor={name}>
                {(() => {
                    if (type == 'textarea') {
                        return (                        
                            <textarea 
                                className={classNames(
                                    styles['typeable-input'],
                                    error.length && styles['typeable-input_error'],   
                                    'resize-none'
                                )} 
                                ref={inputRef}
                                name={name} 
                                placeholder={placeholder ?? ''}
                                id={id ?? undefined}
                                required={required ?? false}
                                rows={3}
                                value={val}
                                onChange={handleInput}>
                            </textarea>
                        );
                    }
                    else if ( type == 'password' || type == 'confirm-password' ) {                        
                            return (
                                <>
                                    <input 
                                        className={classNames(
                                            styles['typeable-input'],
                                            error.length && styles['typeable-input_error']   
                                        )}
                                        ref={inputRef}
                                        type={passIsVisible ? 'text' : 'password'} 
                                        name={name} 
                                        value={val}
                                        required={required ?? false}
                                        placeholder={placeholder ?? ''}
                                        onChange={handleInput}
                                        id={id ?? undefined}/>
                                    <div
                                        onClick={() => setPassIsVisible(!passIsVisible)} 
                                        className="block absolute right-[18px] top-1/2 translate-y-[-50%] cursor-pointer">
                                        {passIsVisible ?  <EyeIcon/> : <EyeClosedIcon/>}
                                    </div>
                                </>
                            );
                    }
                    else {
                        return (
                            <input 
                                className={classNames(
                                    styles['typeable-input'],
                                    error.length && styles['typeable-input_error']   
                                )} 
                                ref={inputRef}
                                type={type} 
                                name={name} 
                                value={val}
                                required={required ?? false}
                                placeholder={placeholder ?? ''}
                                onChange={handleInput}
                                id={id ?? undefined}/>
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

const ConfirmPassword : React.FC<TextFieldProps> = (props) => {
    return <TextFieldTemplate  {...{...props, type: 'confirm-password'}}/>;
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
    ConfirmPassword,
    TextArea,
    Tel,
    Search,
};