import React, { useContext, useEffect } from "react";
import {MainContext} from "../index.jsx";
import { getMySongs, getMyAlbums } from '../../../../../redux/actions';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Axios from "../../../../../core/axios";

import { useMessage } from '../../../../../hooks/message.hook';

const FinalStep = ({ path, dispatch, mySongs, myAlbums }) => {
	const { form, setLoad } = useContext(MainContext);

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
                else {
                    formData.append(key, form[key])
                }
            }

            switch (form.type) {
                case 'Single track':

                return Axios.post('/api/upload/track', formData)
                    .then(async (data) => {
                        if (data.track) {
                            await dispatch(getMySongs([...mySongs, data.track]));
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
                            await dispatch(getMyAlbums([...myAlbums, data.album]));
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

    useEffect(() => {
        console.log(form)
    }, [])


	return (
		<div className="music__main-upload-container-final">
            <p className="music__main-upload-container-subtitle">Now, you can send everything</p>
            
            <button onClick={uploadHandler}>Upload</button>
        </div>
	)	
}

const mapStateToProps = (state) => {
    return {
        mySongs: state.songs.mySongs,
        myAlbums: state.albums.myAlbums,
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(FinalStep);

