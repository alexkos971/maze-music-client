import React, { useContext, useEffect, useState } from "react";
import {MainContext} from "../index.jsx";
import DragAndDrop from "../../../../DragAndDrop";

const ChooseTrackFile = () => {
	const { form, setForm, setBtnDisabled } = useContext(MainContext);
    const [file, setFile] = useState(form.track || null)


    useEffect(() => {
        setBtnDisabled(true)
        if (file) {
            setForm({ ...form, track: file })
            console.log(file)
            setBtnDisabled(false);
        }
    }, [file])

	return (
		<div className="music__main-upload-container-files">
            <p className="music__main-upload-container-subtitle">Upload file with a track (drag and drop file or click )</p>
            
            <DragAndDrop description='File should be a wave/mp3' type="audio/wav, audio/mp3" field='track' file={file} setFile={setFile}/>
		</div>
	)	
}

export default ChooseTrackFile;

