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
        setForm({ ...form, name: event.target.value })
    }

    // const setFile = (e) => {
    //     if (!e.target.length) {
    //         setForm({...form, [e.target.name]: e.target.files[0]})        
    //     }
    //     console.log(form)
    // }

	return (
		<div className="music__main-upload-container-name">
			<p className="music__main-upload-container-subtitle">Please select name of track</p>
            <input type="text" name="name" required onChange={changeHandler} placeholder="name" value={name && name}/> 

            {/*<p className="music__main-upload-container-subtitle">Upload file with a track</p>*/}
			
        {/*    <div className="music__main-upload-container-name-drag">
                <input type="file" name="track" accept="audio/wav, audio/mp3" required onChange={setFile} placeholder="track file"/>
                
                <span>
                    <i className="fas fa-file-alt"></i>
                </span>
                <p>File should be a wave/mp3</p>

            </div> */}

            {/*<div className="music__main-upload-fields">*/}
                    {/*<p>Fill the fields</p>*/}
                                        {/**/}
                    {/*<div className="music-form">*/}
                            {/**/}
                        {/*<p className="music-form-required">Required field</p>*/}
                        {/*<input type="text" name="name" required={true} onChange={changeHandler} placeholder="name of track"/>*/}
                        {/**/}
                        {/*<input type="text" name="album_id" onChange={changeHandler}  placeholder="track album link"/>*/}
                        {/**/}
                        {/*<p className="music-form-required">Required field</p>*/}
                        {/**/}
                        {/*<input type="text" name="lyrics" onChange={changeHandler} placeholder="track lyrics"/>*/}
                        {/**/}
                        {/*<p className="music-form-required">Required field</p>*/}
                        {/*<input type="file" name="cover" accept="image/jpeg, image/png" onChange={setFile} placeholder="track cover"/>*/}
{/**/}
                        {/*<div  className="music-form-btns">*/}
                            {/*<button type="submit" onClick={uploadHandler} disabled={!btnDisable}>Upload</button> */}
                        {/*</div>   */}
                    {/*</div>*/}
                        {/**/}
                {/*</div>*/}
		</div>
	)	
}

export default ChooseName;

