import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { changeProfileAvatar } from "../../redux/actions/profileActions"

import DragAndDrop from "../../components/DragAndDrop";
import Button from "../../components/Button";

const ChangeAvatar = ({ dispatch }) => {
	const [file, setFile] = useState(null);
	const history = useHistory()

	return (
		<div className="music__main-profile-change-avatar">
			<DragAndDrop description='File should be a jpeg/png' type="image/jpeg, image/png" field='cover' file={file} setFile={setFile}/>

			<div onClick={() => dispatch(changeProfileAvatar(file, history))} className="music__main-profile-change-avatar-btn">
				<Button text="Upload" type="button" active={file?.length}/>				
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
