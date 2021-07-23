import React, { useContext, useEffect, useState } from "react";
import {MainContext} from "../index.jsx"

const ChooseName = () => {
	const { form, setForm, setBtnDisabled } = useContext(MainContext);
	const [name, setName] = useState(form.name || null)

    useEffect(() => {
        setBtnDisabled(true)
        if (!name) {
            setBtnDisabled(false)
        }
    }, [name])

    const changeHandler = (event) => {
        // setName(event.target.value)
        setForm({ ...form, name: event.target.value })
    }



	return (
		<div className="music__main-upload-container-name">
			<p className="music__main-upload-container-subtitle">Please select name of {form.type}</p>
            <input type="text" name="name" required onChange={changeHandler} placeholder="name" value={name}/> 
		</div>
	)	
}

export default ChooseName;

