import React, { useState, useContext } from "react";
import { MainContext } from "../index.jsx";
import "../Upload.scss";

import ChooseName from "./ChooseName";

const ChooseLength = () => {
	const { setBtnDisabled, setForm, form, setSteps, steps } = useContext(MainContext);
	const [open, setOpen] = useState(false);

	const list = ["Single track", 'Album', "EP"]
	const [active, setActive] = useState((form && form.type) || list[0]);

	const handleLength = (item) => {

		if (item == list[0]) {
			const newSteps = steps.filter(i => i !== ChooseName)
			console.log(newSteps)
			setSteps(newSteps)
		}
		setActive(item)
		setOpen(false);
		setForm({ ...form, type: item })
		setBtnDisabled(false)
	}

	return (
		<div className="music__main-upload-container-length">
			<p className="music__main-upload-container-subtitle">Please select the type of uploaded content, single track, Album or EP.</p>

			<div  className="music__main-upload-container-length-dropdown">	
				<div className="music__main-upload-container-length-dropdown-input" onClick={() => setOpen(!open)}>
					<span className="music__main-upload-container-length-dropdown-input-value">{active}</span>
	
					<span className="music__main-upload-container-length-dropdown-input-carret">
						<i className={`fas fa-chevron-${open ? "up" : "down"}`}></i>
					</span>	
				</div>
	
				<div className={`music__main-upload-container-length-dropdown-list ${open ? 'visible': ""}`}>
					<ul>
						{
							list.map(item => 
								<li key={item} onClick={() => handleLength(item)}>{item}</li>
							)
						}
					</ul>
				</div>
			</div>

		</div>
	)	
}

export default ChooseLength;

