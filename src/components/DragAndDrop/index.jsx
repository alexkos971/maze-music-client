import React, { useState, useRef, useEffect }  from "react";
import { connect } from "react-redux";

const DragAndDrop = ({ description, field, file, setFile, type, night }) => {
	const [draged, setDraged] = useState(false);
	const fileRef = useRef()	

	const setFileHandler = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

	useEffect(() => {
	    if (fileRef.current) {
	        fileRef.current.addEventListener('dragenter', handleDragIn)
	        fileRef.current.addEventListener('dragleave', handleDragOut)
	        fileRef.current.addEventListener('dragover', handleDrag)
	        fileRef.current.addEventListener('drop', handleDrop)
			
			return () => {
				fileRef.current.removeEventListener('dragenter', handleDragIn)
				fileRef.current.removeEventListener('dragleave', handleDragOut)
				fileRef.current.removeEventListener('dragover', handleDrag)
				fileRef.current.removeEventListener('drop', handleDrop)
			}
	    }
	}, [fileRef]);

	const handleDragIn = (e) => {
		e.preventDefault();
	    e.stopPropagation();
	    setDraged(true);
		// console.log('drag in', e, fileRef);
	}
	
	const handleDragOut = (e) => {
		e.preventDefault();
	    e.stopPropagation();
		setDraged(false);
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
	        setFile(e.dataTransfer.files[0]);
	    }
	}

	return (
        <label htmlFor="track" className={`music__main-drag ${draged ? 'active' : ''} ${!night ? 'night': ''}`} ref={fileRef}>     
			<input id='track' type="file" name="track" accept={type} required placeholder="track file" onChange={setFileHandler}/>
            <div className="music__main-drag-wrap">
                <i className={`fas fa-folder${draged ? '-open': ''} music__main-drag-folder-icon`}></i>
				<h5>Drag your files, or click to browse</h5>

                <p className="music__main-drag-description">{description}</p>
                {file?.name && 
					<div className="music__main-drag-file">
						<p className="music__main-drag-file-name">{file.name}</p>

						<div className="music__main-drag-file-clear" onClick={() => setFile(null)}>
							<i className="fa-solid fa-xmark"></i>
						</div>
					</div>
				}
            </div>

        </label>
	)
}

const mapStateToProps = state => {
	return {
		night: state.interface.night
	}
}

export default connect(mapStateToProps)(DragAndDrop);