import React, { useContext } from "react";
import {MainContext} from "../index.jsx";

import { setProfile } from '../../../redux/actions/profileActions';
import { uploadSong } from '../../../redux/actions/songsActions';
import { showAlert } from "../../../redux/actions/interfaceActions";

import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Axios from "../../../core/axios";
import  Button from "../../../components/Button";
import { uploadAlbum } from "../../../redux/actions/albumsActions.js";

const FinalStep = ({ dispatch, profile }) => {
	const { form, setLoad, load } = useContext(MainContext);
    const history = useHistory()

    const uploadHandler = async () => {
        try {
            const formData = new FormData();
            
            for (let key in form) {
                if (key === 'album') {
                    form[key].forEach((item, index) => {
                        formData.append('track', form[key][index])
                    })
                }
                if (key === 'genre') {
                    form[key].forEach((item, index) => {
                        formData.append('genre', form[key][index])
                    })
                }
                else {
                    formData.append(key, form[key])
                }
            }

            switch (form.type) {
                case 'Single track':
                    await dispatch(uploadSong(formData));
                    history.push('/Profile')

                case 'Album':
                    await dispatch(uploadAlbum(formData));
                    history.push('/Profile')
                        
                default: return;
            }

        }
        catch (e) {
            dispatch(showAlert({type: 'error', text: e.message}))
        }
    }


	return (
		<div className="music__main-upload-container-final">
            <p className="music__main-upload-container-subtitle">Now, you can send everything</p>
            
            <div onClick={uploadHandler} className="music__main-upload-container-final-btn">
                <Button type="button" text="Upload" active={load}/>
            </div>
        </div>
	)	
}

const mapStateToProps = (state) => {
    return {
        mySongs: state.songs.mySongs,
        profile: state.profile.profile,
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(FinalStep);

