import React, { useState, useRef, useEffect, useId, useContext } from "react";
import { MainFieldProps } from "./index";
import styles from "./Field.module.scss";
import { useFieldValidation } from "@hooks";
import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";
import { FieldError, FieldTitle } from "./index";

interface MultiSelectProps extends MainFieldProps {
    value?: Array<string>;
    onChange?: (val: string) => void;
};

export const MultiSelect = ({
    id, 
    value,
    placeholder,
    onChange,
    className = '',
    name,
    required = false,
    title
} : MultiSelectProps) => {
    const field_id = id ? id : useId();
    const multiSelectRef = useRef(null);
    const [ selectIsOpened, setSelectIsOpened ] = useState(false);
    const fieldContext = useContext(ValidationContext) as ValidationContextType | null;

    const [ error, setError ] = useState<string>('');
    const [val, setVal] = useState<MultiSelectProps['value']>(value ?? []);
    const [inputVal, setInputVal] = useState<string>('');
    const [is_valid, setIsValid] = useState(!error.length && ( (required && val?.length) || !required ) ? true : false);

    // Set Field Validation in Form Parent
    useEffect(() => {
        if ( fieldContext?.registerField ) {
            fieldContext.registerField(name, val, is_valid);
        }

        const [ current_valid, current_error ] = useFieldValidation(val, 'multi-select', required);
    
        if (error !== current_error) {
            setError(current_error);
        }
    
        if (current_valid !== is_valid) {
            setIsValid(current_valid);
        }
    }, [val, is_valid]);

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputVal.length) {
            setVal(() => {
                return [...val, inputVal];
            });            

            setInputVal('');
        }
    }

    return (
        <div className={`${styles.field} ${styles.field_text} ${styles.field_multiselect} flex flex-col mt-3 ${className}`}>
            <FieldTitle title={title}/>
        
            <label 
                htmlFor={name} 
                className="field__label relative" 
                ref={multiSelectRef} >

                <div className="flex items-center mx-[-4px] mb-4 flex-wrap">
                    {val?.length
                        ? val.map((item, index) => (
                            <span className="p-2 text-xs bg-gray-e5 rounded-r-sm mx-1 my-1 flex items-center relative" key={item + index}>
                                {item}

                                <button 
                                    type="button" 
                                    onClick={() => setVal(prev => prev?.filter(el => el !== item))}
                                    className="ml-1 w-4 h-4 block relative rotate-45
                                        before:h-3 before:w-[1px] before:bg-black-36 before:block before:absolute before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%]
                                        after:w-3 after:h-[1px] after:bg-black-36 after:block after:absolute after:top-1/2 after:left-1/2 after:translate-y-[-50%] after:translate-x-[-50%]
                                    "></button>
                            </span>
                        )) : <></>
                    }
                </div>

                <input 
                    className={styles['typeable-input'] + ( error.length ? ' ' + styles['typeable-input_error'] : '' )} 
                    type={'text'} 
                    name={name} 
                    value={inputVal}
                    required={required ?? false}
                    placeholder={placeholder ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)}
                    onKeyDown={onEnter}
                    id={field_id}/>
            </label>

            <FieldError error={error}/>
        </div>
    );
}