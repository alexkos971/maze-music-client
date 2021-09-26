import React, { useContext } from "react";
import {MainContext} from "../index.jsx";

import { getMyAlbums, setProfile } from '../../../redux/actions/profileActions';

import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Axios from "../../../core/axios";
import  Button from "../../../components/Button";

import { useMessage } from '../../../hooks/message.hook';

const FinalStep = ({ path, dispatch, mySongs, profile }) => {
	const { form, setLoad, load } = useContext(MainContext);

    const message = useMessage();
    const history = useHistory()

    const uploadHandler = async () => {
        try {
            setLoad(true);
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
            console.log(formData, form);

            switch (form.type) {
                case 'Single track':

                return Axios.post('/api/upload/track', formData)
                    .then(async (data) => {
                        if (data.track) {
                            const songs = profile.songs.push(data.track)
                            await dispatch(setProfile({...profile, songs: songs}));
                        }
                        else {
                            message(data.message);
                        }    
                    })
                    .then(() => {
                        setLoad(false);
                        history.push('/Profile')
                    });

                case 'Album':

                return Axios.post('/api/upload/album', formData)
                    .then(async (data) => {
                        if (data.album) {
                            let albums = profile.albums.push(data.album)
                            return dispatch(setProfile({...profile, albums: albums}));
                        }
                        else {
                            message(data.message);
                        }    
                    })
                    .then(() => {
                        setLoad(false);
                        history.push('/Profile')
                    });
                default: return;
            }

        }
        catch (e) {
            message(e.message);
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

