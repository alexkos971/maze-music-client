import React, { useState, useRef, useEffect, useId, useContext } from "react";
import { ChevronDownBlack } from "@helpers/images";
import { useOutsideClick } from "@hooks/interface";
import { MainFieldProps } from "./index";
import styles from "./Field.module.scss";
import { useFieldValidation } from "@hooks";
import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";
import { FieldError, FieldTitle } from "./index";

interface SelectSimpleProps extends MainFieldProps {
    value?: string | number | null;
    options: string[] | number[];
    onChange?: (val: string | number) => void;
};

interface SelectObjectProps extends MainFieldProps {
    value?: {slug: string | number, title : string | number} | null;
    options: {[key: string | number]: string | number};
    onChange?: (val: { slug: string | number, title : string | number }) => void;
};

export const Select = ({
    id, 
    value,
    placeholder,
    options,
    onChange,
    className = '',
    name,
    required = false,
    title
} : SelectSimpleProps | SelectObjectProps) => {
    if (options) {
        const field_id = id ? id : useId();
        const selectRef = useRef(null);
        const is_outside = useOutsideClick(selectRef);
        const [ selectIsOpened, setSelectIsOpened ] = useState(false);
        const fieldContext = useContext(ValidationContext) as ValidationContextType | null;

        const [ error, setError ] = useState<string>('');
        const [val, setVal] = useState<SelectSimpleProps['value'] | SelectObjectProps['value']>(
            value ?? (
            !placeholder ? 
                (
                    Array.isArray(options) 
                    ? options[0] 
                    : {slug: Object.keys(options)[0], title : options[Object.keys(options)[0]]}  
                ) : null
            )
        );
        const [is_valid, setIsValid] = useState(!error.length && ( (required && val) || !required ) ? true : false);

        const selectHandle = (option_slug: string | number, option_title: string | number) => {
            let newValue = Array.isArray(options) ? option_title : { slug: option_slug, title: option_title };

            setVal(newValue);

            const [current_valid, current_error] = useFieldValidation(newValue, 'select', required);
            if (error !== current_error) {
                setError(current_error);
            }
            
            if (current_valid !== is_valid) {
                setIsValid(current_valid);
            }

            setSelectIsOpened(false);

            // Call side on change
            if (onChange && newValue) {
                onChange(newValue);
            }
        };

        // Close Select if Clicked out of select 
        useEffect(() => {
            if (is_outside) {
                setSelectIsOpened(false);
            }
        }, [is_outside]);

        // Check Field Validation
        useEffect(() => {
            if ( fieldContext?.registerField ) {
                fieldContext.registerField(name, val, is_valid);
            }
        }, [val, is_valid]);
                            
        const MenuItem : React.FC<{option_slug: string | number, option_title: string | number}> = ({option_slug, option_title}) => (
            <li 
                className={`cursor-pointer text-base text-gray-4a py-2 px-4 duration-300 hover:bg-gray-f8 ${(val == option_title || (val && typeof val == 'object' && val.slug == option_slug)) ? 'text-green-05 font-medium' : ''}`} 
                data-item={option_slug}
                onClick={() => selectHandle(option_slug, option_title)}>                                
                    {option_title}
            </li>
        )

        return (
            <div className={`${styles.field} ${styles.field_select} flex flex-col mt-3 ${className}`}>
                <FieldTitle title={title}/>
            
                <label 
                    htmlFor={name} 
                    className="field__label relative" 
                    ref={selectRef} >
                    
                    <span 
                        onClick={() => setSelectIsOpened(!selectIsOpened)}
                        className={`
                            ${styles['typeable-input']} 
                            ${error.length ? styles['typeable-input_error'] : ''} 
                            cursor-pointer
                            ${placeholder && (placeholder == val || !val) ? styles['typeable-input_placeholder'] : ''}`}>
                        
                        {(val == null && placeholder) 
                            ? placeholder 
                            : ((val !== null && typeof val === 'object') ? val['title'] : val)}
                    </span>

                    <input 
                        type="hidden"
                        name={name}
                        value={!val ? '' : (typeof val === 'object') ? val['slug'] : val}
                        required={required ?? false}
                        placeholder={placeholder ?? ''}        
                        id={field_id}
                    />

                    <div className={`${styles.field__chevron} absolute w-[24px] h-[24px] top-1/2 right-4 pointer-events-none duration-300 translate-y-[-50%] ${selectIsOpened ? 'scale-y-[-1]' : ''}`}>
                        <ChevronDownBlack />
                    </div>

                    <div className={`field__options absolute z-10 bg-white border-[0.5px] border-gray-e5 rounded-[5px] w-full top-[calc(100%+6px)] duration-300 py-2 ${!selectIsOpened ? 'opacity-0 invisible' : ''}`}>
                        <ul>
                            {Object.keys(options).map((key: any) => <MenuItem key={key} option_slug={ Array.isArray(options) ? options[key] : key } option_title={options[key]}/>)}
                        </ul>
                    </div>
                </label>

                <FieldError error={error}/>
            </div>
        );
    }
    return <></>;
}