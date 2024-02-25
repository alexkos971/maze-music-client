import React, { useEffect, useId, useState } from "react";
import styles from "./Field.module.scss";
import { MainFieldProps } from "./index";
import { FieldError, FieldTitle } from "./index";
import { CloudArrowUpGreen } from "@helpers/images";

import { useFormValidation } from "@components/UI/Form/validation";
import { useFieldValidation } from "@hooks";

interface FileFieldProps extends MainFieldProps {    
    value?: string | number;    
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const FilePicker = ({ 
    id, 
    title,
    value = '',
    placeholder,
    onChange,
    className = '',
    name,
    required = false
} : FileFieldProps) => {    

    const {  registerField } = useFormValidation();
    const field_id = id ? id : useId();

    const [ error, setError ] = useState<string>('');
    const [val, setVal] = useState<FileFieldProps['value']>(value);
    const [is_valid, setIsValid] = useState(!error.length && ( (required  && val) || !required ) ? true : false);

    useEffect(() => {
        if (registerField) {
            registerField(name, is_valid);
        }
    }, [is_valid]);

    return (
        <div className={`field ${styles.field_file} flex flex-col mt-3 w-full ${className}`}>
            <FieldTitle title={title}/>

            <label className={styles.field__label}>
                <input type="file" name={name} id={field_id}/>

                <div className={styles.field__image}>
                    <CloudArrowUpGreen/>
                </div>

                <span className={styles.field__text}>Drag and drop file or <span>select file</span></span>
            </label>

            <FieldError error={error}/>            
        </div>
    );
};

export { FilePicker }