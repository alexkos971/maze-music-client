import React, { useState, useRef, useEffect, useId } from "react";
import Image from "next/image";
import { ChevronDownBlack } from "@helpers/images";
import { useOutsideClick } from "@hooks/interface";
import { MainFieldProps } from "./index";
import styles from "./Field.module.scss";
import { useFieldValidation } from "@hooks";
import { FieldError, FieldTitle } from "./index";

interface SelectProps extends MainFieldProps {
    value?: string | number | {slug: string | number, title : string | number};
    options: string[] | number[] | {[key: string | number]: string | number};
    onChange?: (val: string | number | {slug: string | number, title : string | number}) => void;
};

export const Select = ({
    id, 
    value,
    placeholder,
    options,
    onChange,
    name,
    required = false,
    title
} : SelectProps) => {
    if (options) {
        const field_id = id ? id : useId();
        const selectRef = useRef(null);
        const is_outside = useOutsideClick(selectRef);
        const [ selectIsOpened, setSelectIsOpened ] = useState(false);

        const [ error, setError ] = useState<string>('');
        const [val, setVal] = useState<SelectProps['value']>(
            value 
            ?? placeholder 
            ?? ( 
                Array.isArray(options) 
                ? options[0] 
                : {slug: Object.keys(options)[0], title : options[Object.keys(options)[0]]}  )
        );

        useEffect(() => {
            const [is_valid, current_error] = useFieldValidation(val, 'select', required);
            if (error !== current_error) {
                setError(current_error);
            }
            // Call side on change
            if (onChange && val) {
                onChange(val);
            }
        }, [val]);

        // Close Select if Clicked out of select 
        useEffect(() => {
            if (is_outside) {
                setSelectIsOpened(false);
            }
        }, [is_outside]);
                            
        const MenuItem : React.FC<{option_slug: string | number, option_title: string | number}> = ({option_slug, option_title}) => (
            <li 
                className={`cursor-pointer text-base text-gray-4a py-2 px-4 duration-300 hover:bg-gray-f8 ${(val == option_title || (typeof val == 'object' && val.slug == option_slug)) ? 'text-green-05 font-medium' : ''}`} 
                data-item={option_slug}
                onClick={() => {
                    setVal(Array.isArray(options) ? option_title : { slug: option_slug, title: option_title })
                    setSelectIsOpened(false);
                }}>                                
                    {option_title}
            </li>
        )

        return (
            <div className={`field field_select flex flex-col mt-3 max-w-sm`}>
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
                        
                        {(val !== null && typeof val === 'object') ? val['title'] : val}
                    </span>

                    <input 
                        type="hidden"
                        name={name}
                        value={(val !== null && typeof val === 'object') ? val['slug'] : val}
                        required={required ?? false}
                        placeholder={placeholder ?? ''}        
                        id={field_id}
                    />

                    <div className={`absolute w-[24px] h-[24px] top-1/2 right-4 pointer-events-none duration-300 translate-y-[-50%] ${selectIsOpened ? 'scale-y-[-1]' : ''}`}>
                        <Image alt="Chevron Down Icon" src={ChevronDownBlack} width={0} height={0} className="w-full h-full object-contain"/>
                    </div>

                    <div className={`field__options absolute bg-white border-[0.5px] border-gray-e5 rounded-[5px]  w-full top-[calc(100%+6px)] duration-300 py-2 ${!selectIsOpened ? 'opacity-0 invisible' : ''}`}>
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