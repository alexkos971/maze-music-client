import React, { useEffect, useState, useRef, useContext, ChangeEvent, SetStateAction } from "react";
import styles from "./Field.module.scss";
import { MainFieldProps } from "./index";
import { FieldError, FieldTitle } from "./index";
import { useTranslation } from "next-i18next";
import Avatar from "@components/UI/Avatar";

import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";
import classNames from "classnames";

interface AvatarFieldProps extends MainFieldProps {    
	accept?: string;
    value?: File | string | null;    
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const AvatarPicker = ({ 
    id, 
    title,
    className = '',
    name,
    required = false,
    value,
	accept = '*'
} : AvatarFieldProps) => {    
	const {t} = useTranslation('common');

    const context = useContext(ValidationContext) as ValidationContextType;

    const [ error, setError ] = useState<string>('');
    const [file, setFile] = useState<File | Blob | null>(null);

    useEffect(() => {
        if (context?.registerField) {
			context.registerField(name, file ?? value);
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
				styles[`field_file_avatar`],
				isDragged && styles.field_file_dragged, 
				// @ts-ignore
				file?.name && styles.field_file_filled, 
				className
			)}
		>
            <FieldTitle title={title}/>

			<label className={styles.field__label} ref={fileRef}>
				<input type="file" name={name} id={id ?? undefined} onChange={setFileHandler} {...{ required }} accept={accept}/>

                <Avatar
                    size='min(100%, 150px)'
                    textSize="18px"
                    previewText="Upload"
                    img={file ? URL.createObjectURL(file) : (
                        value ?
                            (typeof value == 'string' ? value : URL.createObjectURL(value))
                        : ''
                    )}
                    className={styles.field__avatar}
                    additionalEditContent={file ?
                        <span className="mt-1 mb-1 !text-red-100 text-xs" onClick={(e) => {
                            e.preventDefault();
                            setFile(null);
                        }}>{t("interface.remove")}</span>
                        : <></>
                    }
                    onChange={() => {}}
                />
			</label>				

            <FieldError error={error}/>            
        </div>
    );
};

export { AvatarPicker }