import React, { useContext, useEffect, createRef, useState } from "react";
import {MainContext} from "../index.jsx";
import { getMySongs } from '../../../../../redux/actions';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import { useHttp } from '../../../../../hooks/http.hook';
import { useMessage } from '../../../../../hooks/message.hook';
import { useAuth } from '../../../../../hooks/auth.hook';

const FinalStep = ({ path, dispatch, mySongs }) => {
	const { form, setForm, setBtnDisabled, setLoad } = useContext(MainContext);

    const { request } = useHttp();
    const message = useMessage();
    const { token } = useAuth();
    const history = useHistory()

    useEffect(() => {
        console.log(form)
    }, [])

    const uploadHandler = async () => {
        try {
            setLoad(true);
            console.log(form)
            let data = await request('api/upload/track', 'POST', {...form}, {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            });
            
            if (data.track) {
                await dispatch(getMySongs([...mySongs, data.track]))
                history.push('/Profile');
            }
            setLoad(false);
        }
        catch (e) {
            message(e.message);
        }
    }



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
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(FinalStep);

