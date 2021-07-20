import React, {useState} from "react";
import "./Button.scss";


const Button = ({ text, color, type, сondition, active }) => {

	if (type === 'select') {
		return (
			<div
				className={`music-button ${active && 'active'}`}>
			{text}
			</div>
		)
	}

	else if (type === 'message') {
		return (
			<div className="music-button message">{text}</div>
		)
	}

}

export default Button;