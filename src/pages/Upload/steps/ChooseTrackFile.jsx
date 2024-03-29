import React, { useContext, useEffect, useState } from "react";
import {MainContext} from "../index.jsx";
import DragAndDrop from "../../../components/DragAndDrop";
import SongsTemp from "../../../components/SongsTemp";
import { connect } from "react-redux";
import { showAlert } from "../../../redux/actions/interfaceActions";

const ChooseTrackFile = ({ dispatch, name }) => {
	const { form, setForm, setBtnDisabled } = useContext(MainContext);
    const [file, setFile] = useState(form.track || null);
    const [album, setAlbum] = useState(form.album || [])

    useEffect(() => {
        setBtnDisabled(true)

        if (file) {
            if (form.type === 'Album') {
                const check = album.some(i => i.name === file.name);
                if (check) {
                    dispatch(showAlert({type: 'error', text: 'Вы уже добавили этот трек !'}))
                }
                else {
                    setAlbum([...album, file])
                }

            }
            else if (form.type === 'Single track') {
                setForm({ ...form, track: file })
                setBtnDisabled(false);
            }
        }
    }, [file])

    useEffect(() => {
        if (form.type !== 'Single track') {
            setForm({...form, album: album})
            if (album.length > 4) {
                setBtnDisabled(false);
            }
            else {
                setBtnDisabled(true)
            }
        }
    }, [album])

	return (
		<div className="music__main-upload-container-files">
            <p className="music__main-upload-container-subtitle">Upload file with a track (drag and drop file or click )</p>
            {form.type !== 'Single track' && <p className="music__main-upload-container-description">The files must be uploaded in the order in which they will be displayed</p>}
            
            <DragAndDrop description='File should be a wave/mp3' type="audio/wav, audio/mp3" field='track' file={file} setFile={setFile}/>

            {form.type !== 'Single track' && album.length 
                ? <div>
                    <SongsTemp songs={album} type="Album" setAlbum={setAlbum}/>
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

