import React, { useEffect, useState, useRef, useContext, ChangeEvent, SetStateAction } from "react";
import styles from "./Field.module.scss";
import { MainFieldProps } from "./index";
import { FieldError, FieldTitle } from "./index";
import { CloudArrowUpGreen } from "@utils/images";
import { useTranslation } from "next-i18next";

import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";
import classNames from "classnames";

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
		
		// @ts-ignore
		fileRef.current.addEventListener('dragenter', handleDragIn)
		// @ts-ignore
		fileRef.current.addEventListener('dragleave', handleDragOut)
		// @ts-ignore
		fileRef.current.addEventListener('dragover', handleDrag)
		// @ts-ignore
		fileRef.current.addEventListener('drop', handleDrop)
		
		return () => {
			if (fileRef.current) {
				// @ts-ignore
				fileRef.current.removeEventListener('dragenter', handleDragIn)
				// @ts-ignore
				fileRef.current.removeEventListener('dragleave', handleDragOut)
				// @ts-ignore
				fileRef.current.removeEventListener('dragover', handleDrag)
				// @ts-ignore
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

		// @ts-ignore
	    if (e.dataTransfer.files.length > 0) {
			setDraged(false);
			// @ts-ignore
	        setFile(e.dataTransfer.files[0]);
	    }
	}

    return (
        <div className={
			classNames(
				"field flex flex-col mt-3 w-full", 
				styles.field_file, 
				styles[`field_file_default`],
				isDragged && styles.field_file_dragged, 
				// @ts-ignore
				file?.name && styles.field_file_filled, 
				className
			)}
		>
            <FieldTitle title={title}/>

			<label className={styles.field__label} ref={fileRef}>
				<input type="file" name={name} id={id ?? undefined} onChange={setFileHandler} {...{ required }} accept={accept}/>

				{
				// @ts-ignore
				file?.name ?
					<button onClick={() => setFile(null)} type="button" className={styles['field__clear-button']}></button>				
				: ''
				}

				<div className={styles.field__image}>
					<CloudArrowUpGreen/>
				</div>

				<div className={styles.field__info}>
					{ 
						// @ts-ignore
						!file?.name 
						? <div dangerouslySetInnerHTML={{ __html: t('fields.placeholders.file')}} className="text-gray-600 dark:text-gray-300"/>
							// @ts-ignore
							: file.name	
					}								
				</div>
			</label>				
            <FieldError error={error}/>            
        </div>
    );
};

export { FilePicker }