import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../index.jsx";

import ChooseName from "./ChooseName";

const ChooseLength = () => {
	const { setBtnDisabled, setForm, form, setSteps, steps, setScrollSteps, scrollSteps } = useContext(MainContext);
	const [open, setOpen] = useState(false);

	const list = ["Single track", 'Album', "EP"]
	const [active, setActive] = useState((form?.type) ?? list[0]);

	const handleLength = (item) => {

		if (item === list[0]) {

			if (steps.includes(ChooseName)) {
				const newSteps = steps.filter(i => i !== ChooseName);
				setSteps(newSteps)
			}
			setScrollSteps(scrollSteps.filter(i => i !== 'Name'));
		}
		else {
			if (!steps.includes(ChooseName)) {
				steps.splice(2, 0, ChooseName)
				setSteps(steps);
			}

			if (!scrollSteps.includes('Name')) {
				scrollSteps.splice(2, 0, 'Name');
				setScrollSteps(scrollSteps)
			}
		}

		setActive(item)
		setOpen(false);
		setForm({ ...form, type: item })
	}
	
	useEffect(() => {
		setBtnDisabled(false);
	}, [handleLength])

	return (
		<div className="music__main-upload-container-length">
			<p className="music__main-upload-container-subtitle">Please select the type of uploaded content, single track, album or EP.</p>

			<div  className="music__main-upload-container-length-dropdown">	
				<div className="music__main-upload-container-length-dropdown-input" onClick={() => setOpen(!open)}>
					<span className="music__main-upload-container-length-dropdown-input-value">{active}</span>
	
					<span className={`music__main-upload-container-length-dropdown-input-carret${open ? ' active': ''}`}>
						<i className={`fas fa-chevron-down`}></i>
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

