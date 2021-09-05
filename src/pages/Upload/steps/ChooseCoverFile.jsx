import React, { useContext, useEffect, useState } from "react";
import {MainContext} from "../index.jsx";
import DragAndDrop from "../../../components/DragAndDrop";

const ChooseCoverFile = () => {
	const { form, setForm, setBtnDisabled } = useContext(MainContext);
    const [file, setFile] = useState(form.cover || null)

    useEffect(() => {
        setBtnDisabled(true)
        if (file) {
            setForm({ ...form, cover: file })
            setBtnDisabled(false);
        }
    }, [file])



	return (
		<div className="music__main-upload-container-files">
            <p className="music__main-upload-container-subtitle">Upload file with a cover (drag and drop file or click )</p>
            
            <DragAndDrop description='File should be a jpeg/png' type="image/jpeg, image/png" field='cover' file={file} setFile={setFile}/>
        </div>
	)	
}

export default ChooseCoverFile;

