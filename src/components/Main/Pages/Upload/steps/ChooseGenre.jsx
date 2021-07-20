import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../index.jsx";
import Button from "../../../../Button"
import "../Upload.scss";

const ChooseGenre = () => {
	const { setBtnDisabled, form, setForm } = useContext(MainContext);

	const genres = ['Pop music', 'EDM', 'Lo-Fi', 'Rock', 'Pop punk', 'Future House', 'Deep House', 
	'Alternative', 'Classic', 'Orchestral', 'Funk', 'Heavy Metal', 'R & B', 'Jazz', 'Indie', 'Folk',
	'Dubstep', 'Industrial', 'Techno', 'Progressive House', 'Acoustic'];
	const [selected, setSelected] = useState(form.genre || [])


	let genreLimit = (selected.length < 3);

	useEffect(() => {
		setBtnDisabled(true)
		
		if (selected.length <= 3 && selected.length >= 1) {
			setForm({...form, genre: selected})
			setBtnDisabled(false)
		}
	}, [selected])



	const checkBtn = item => { 
		const includesElem = selected.includes(item);

		if (!includesElem && genreLimit) {
			setSelected([...selected, item]);
		}

		if (includesElem && (genreLimit || !genreLimit)){
			const newSelected = selected.filter(e => e !== item);
			setSelected(newSelected);
		}
	}

	return (
		<div className="music__main-upload-container-genres">
			<p className="music__main-upload-container-subtitle">Select a genres of your {form.type} (max 3 points)</p>
			<div className="music__main-upload-container-genres-wrap">
				{
					genres.map(item => 
						<div key={item} className={"music__main-upload-container-genres-wrap-button"} onClick={() => checkBtn(item)} >
							<Button type="select" text={item} active={selected.includes(item)}/>
						</div>
					)
				}
			</div>
		</div>
	)	
}

export default ChooseGenre;

