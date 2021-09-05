import React, { useState, useEffect } from "react";

const Button = ({ text, color, type, active, list, mr }) => {
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState(list && list[0] || null);
	const [visible, setVisible] = useState(false);


	if (type === 'button') {
		return (
			<div
				className={`music-button ${mr && 'mr'} ${active && 'active'}`}>
				{text}
			</div>
		)
	}

	else if (type === 'message') {
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
					<span>{current}</span>
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
			<div className="music-button-checkbox " onClick={() => {
					setOpen(!open);
				}}>
				<div className={`music-button-checkbox-check ${open ? "checked" : ""}`}></div>
			</div>
		)
	}

}

export default Button;