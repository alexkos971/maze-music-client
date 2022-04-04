import React, { useContext, useEffect, useState } from "react";
import {MainContext} from "../index.jsx";
import DragAndDrop from "../../../components/DragAndDrop";
import SongsTemp from "../../../components/SongsTemp";
import { connect } from "react-redux";
import { showAlert, showModal } from "../../../redux/actions/interfaceActions";

const ChooseTrackFile = ({ dispatch, name }) => {
	const { form, setForm, setBtnDisabled } = useContext(MainContext);
    const [file, setFile] = useState(form.track || null);
    const [album, setAlbum] = useState(form.album || []);
    const [edited, wasEdited] = useState(false);

    const editSong = (item, index) => {
        let prevName = {
            name: item.name.split('.')[0],
            ext: item.name.split('.')[1]
        }

        dispatch(showModal({
            type: 'input',
            value: prevName.name,
            onSubmit: (newName) => {
                let newFile = new File(
                    [file],
                    `${newName}.${prevName.ext}`,
                    {type: file.type});

                wasEdited(index);
                setFile(newFile)
            }
        }))
    }

    useEffect(() => {
        setBtnDisabled(true);

        if (file) {
            if (form.type !== 'single') {
                const check = album.some(i => i.name === file.name);

                if (check) {
                    dispatch(showAlert({type: 'error', text: 'Вы уже добавили этот трек !'}))
                }
                else {
                    if (edited === false) {
                        setAlbum([...album, file]);
                    }
                    else {
                        let newAlbum = [...album];
                        newAlbum[edited] = file;
                        setAlbum(newAlbum);
                        wasEdited(false);
                    }
                }
            }
            else {
                setBtnDisabled(false);
                setForm({ ...form, track: file });
            }
        }
        else {
            if (album.length) {
                setAlbum(album.filter(el => el.lastModified !== album[album.length - 1].lastModified))            
            }
        }
    }, [file]);

    useEffect(() => {

        if (form.type !== 'single') {
            setForm({...form, album: album});
                    
            if (form.type == 'ep' && album.length <= 5 && album.length >= 2) {
                setBtnDisabled(false);
            }
            else if (form.type == 'album' && album.length > 4) {
                setBtnDisabled(false);
            }

            else {
                if (!album.length) {
                    setFile(null);
                }
                setBtnDisabled(true);
            }
        }
    }, [album]);

	return (
		<div className="music__main-upload-container-files">
            <p className="music__main-upload-container-subtitle">Upload file with a track (drag and drop file or click )</p>
            {form.type !== 'single' ? 
                <>
                    <p className="music__main-upload-container-description">{form.type == 'ep' ? '' : ''}</p>
                    <p className="music__main-upload-container-description">The files must be uploaded in the order in which they will be displayed</p>
                </>
                : null
            }
            
            <DragAndDrop description='File should be a wave/mp3' type="audio/wav, audio/mp3" field='track' file={file} setFile={setFile}/>

            {form.type !== 'single'
                ? <div>
                    <SongsTemp songs={album} type="Upload" editSong={editSong} setSongs={setAlbum}/>
                </div>
                : null
            }
		</div>
	)	
}

const mapStateToProps = (state) => {
    return {
        name: state.profile.name
    }
}

export default connect(mapStateToProps)(ChooseTrackFile);

