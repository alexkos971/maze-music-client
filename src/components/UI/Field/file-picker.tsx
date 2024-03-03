import React, { useEffect, useId, useState, useRef, useContext, ChangeEvent, SetStateAction } from "react";
import styles from "./Field.module.scss";
import { MainFieldProps } from "./index";
import { FieldError, FieldTitle } from "./index";
import { CloudArrowUpGreen } from "@helpers/images";
import { useTranslation } from "next-i18next";

import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";

interface FileFieldProps extends MainFieldProps {    
	accept?: string;
    value?: File | SetStateAction<EventTarget> | EventTarget | null | undefined;    
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const FilePicker = ({ 
    id, 
    title,
    className = '',
    name,
    required = false,
	accept = '*'
} : FileFieldProps) => {    
	const {t} = useTranslation('common');

    const context = useContext(ValidationContext) as ValidationContextType;
    const field_id = id ? id : useId();

    const [ error, setError ] = useState<string>('');
    const [file, setFile] = useState<FileFieldProps['value']>(null);
    const [is_valid, setIsValid] = useState(!error.length && ( (required  && file) || !required ) ? true : false);

    useEffect(() => {
        if (context?.registerField) {
			context.registerField(name, file);
		}
    }, [file]);
	
    const [isDragged, setDraged] = useState(false);
	const fileRef = useRef(null);	
	
	const setFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget && e.currentTarget.files?.length) {
			setFile(e.currentTarget.files[0]);
		}
    }

	useEffect(() => {
	    if (!fileRef.current) return;
		
		fileRef.current.addEventListener('dragenter', handleDragIn)
		fileRef.current.addEventListener('dragleave', handleDragOut)
		fileRef.current.addEventListener('dragover', handleDrag)
		fileRef.current.addEventListener('drop', handleDrop)
		
		return () => {
			if (fileRef.current) {
				fileRef.current.removeEventListener('dragenter', handleDragIn)
				fileRef.current.removeEventListener('dragleave', handleDragOut)
				fileRef.current.removeEventListener('dragover', handleDrag)
				fileRef.current.removeEventListener('drop', handleDrop)
			}
		}
	}, [fileRef]);

	const handleDragIn = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
	    e.stopPropagation();
	    setDraged(true);
	}
	
	const handleDragOut = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
	    e.stopPropagation();
		setDraged(false);
	}

	// Disable open new window
	const handleDrag = (e: ChangeEvent<HTMLInputElement>) => {
	    e.preventDefault();
	    e.stopPropagation();
	}

	const handleDrop = async (e: ChangeEvent<HTMLInputElement>) => {
	    e.preventDefault();
	    e.stopPropagation();

	    if (e.dataTransfer.files.length > 0) {
	        setDraged(false);
	        setFile(e.dataTransfer.files[0]);
	    }
	}

    return (
        <div className={`field ${styles.field_file} ${isDragged ? styles.field_file_dragged : ''} ${file?.name ? styles.field_file_filled : ''} flex flex-col mt-3 w-full ${className}`}>
            <FieldTitle title={title}/>

            <label className={styles.field__label} ref={fileRef}>
                <input type="file" name={name} id={field_id} onChange={setFileHandler} {...{ required }} accept={accept}/>

                <div className={styles.field__image}>
                    <CloudArrowUpGreen/>
                </div>

				<div className={styles.field__info}>
					<span className={styles.field__text}>
						{ !file?.name 
							? <div dangerouslySetInnerHTML={{ __html: t('fields.placeholders.file')}} />
							: file.name	
						}
						
					</span>
					
					{file?.name ?
						<button onClick={() => setFile(null)} type="button" className={styles['field__clear-button']}></button>				
					: ''}
				</div>
            </label>

            <FieldError error={error}/>            
        </div>
    );
};

export { FilePicker }