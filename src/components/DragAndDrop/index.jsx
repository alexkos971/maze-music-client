import React, { useState, createRef, useEffect }  from "react";

const DragAndDrop = ({ description, field, file, setFile, type }) => {
	const [draged, setDraged] = useState(false);
	const fileRef = createRef()	
	const [fileName, setFileName] = useState(null)

	const setFileHandler = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name)
        }
    }

	useEffect(() => {
	    if (fileRef.current) {
	        fileRef.current.addEventListener('dragenter', handleDragIn)
	        fileRef.current.addEventListener('dragleave', handleDragOut)
	        fileRef.current.addEventListener('dragover', handleDrag)
	        fileRef.current.addEventListener('drop', handleDrop)
	    }
	}, [fileRef]);

	const handleDragIn = (e) => {
	    e.preventDefault();
	    e.stopPropagation();
	    setDraged(true)
	}

	const handleDragOut = (e) => {
	    e.preventDefault();
	    e.stopPropagation();
	    setDraged(false)
	}

	// Disable open new window
	const handleDrag = (e) => {
	    e.preventDefault();
	    e.stopPropagation();
	}

	const handleDrop = async (e) => {
	    e.preventDefault();
	    e.stopPropagation();

	    if (e.dataTransfer.files.length > 0) {
	        setDraged(false);
	        setFileName(e.dataTransfer.files[0].name);
	        setFile(e.dataTransfer.files[0]);
	    }
	}

	return (
        <label htmlFor="track" className={`music__main-drag ${draged ? 'active' : ''}`} ref={fileRef}>     
		<input id='track' type="file" name="track" accept={type} required placeholder="track file" onChange={setFileHandler}/>
            <span>
                <i className={`fas fa-folder${draged ? '-open': ''}`}></i>

                <p className="music__main-drag-description">{description}</p>
                {((file && file.name) || fileName) && <p className="music__main-drag-name">{(file && file.name) || fileName}</p>}
            </span>

        </label>
	)
}

export default DragAndDrop;