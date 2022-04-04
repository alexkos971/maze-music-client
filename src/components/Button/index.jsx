import React, { useState } from "react";

const Button = ({ onClick, disabled, text, color, type, active, list, className = "" }) => {
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState(list && list[0] || null);
	const [visible, setVisible] = useState(false);

	if (type === 'message') {
		if (visible) {
			return (
				<div className="music-button message">{text}</div>
				)
			}
	}

	else if (type === 'select') {
		return (
			<div className="music-button-select">
				<div className="music-button-select-input" onClick={() => setOpen(!open)}>
					<p>{current}</p>
					<i className={`fas fa-chevron-${open ? "up" : "down"}`}></i>
				</div>

				<div className={`music-button-select-list ${open ? 'active': ''}`}>
					<ul>
						{
							list.map((item, index) => 
								<li onClick={() => {
									setCurrent(item)
									setOpen(false)
								}} key={index}>{item}</li>
							)
						}
					</ul>
				</div>
			</div>
		)
	}

	else if (type === 'checkbox') {
		return (
			<div className={`music-button-checkbox ${open ? "checked" : ""}`} onClick={() => {
					setOpen(!open);
				}}>
				<div className={`music-button-checkbox-check`}></div>
			</div>
		)
	}

	else {
		return (
			<button {...{ onClick, disabled }}
				className={`music-button${active ? ' active': ''} ${className}`}>
				{text}
			</button>
		)
	}

}

export default Button;