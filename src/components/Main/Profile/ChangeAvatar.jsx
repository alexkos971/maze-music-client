import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { setProfile } from "../../../redux/actions"

import Axios from "../../../core/axios"

import { useAuth } from "../../../hooks/auth.hook";
import { useMessage } from "../../../hooks/message.hook";

import DragAndDrop from "../../DragAndDrop";
import Button from "../../Button";
import "./Profile.scss"

const ChangeAvatar = ({ dispatch, profile }) => {
	const message = useMessage();
	const [file, setFile] = useState(null);
	const [load, setLoad] = useState(false)

    const changeAvatar = async () => {
    
    	if (!file) {
    	    return alert('Поле пустое !!!');
    	}
        try {
        	setLoad(true)
        	const formData = new FormData();
        	formData.append('avatar', file)

            return Axios.post('/api/upload/avatar', formData)
            	.then(async data => {
            		if (data.avatar) {
            			message(data.message);	
		            	await dispatch(setProfile({...profile, avatar: data.avatar }))
		            	setLoad(false)
            		}
            	});

        	
        }
        catch (e) {
            message(e.message)
        }
    }

    useEffect(() => {

    }, [file])

	return (
		<div className="music__main-profile-change-avatar">
			<DragAndDrop description='File should be a jpeg/png' type="image/jpeg, image/png" field='cover' file={file} setFile={setFile}/>

			<div onClick={changeAvatar} className="music__main-profile-change-avatar-btn">
				<Button text="Upload" type="button" active={load}/>				
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		profile: state.profile
	}
}

export default connect(mapStateToProps)(ChangeAvatar);
