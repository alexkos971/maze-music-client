import React, { useState, createContext, useEffect } from 'react';
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";

import ChooseLength from "./steps/ChooseLength";
import ChooseName from "./steps/ChooseName";
import ChooseGenre from "./steps/ChooseGenre";
import ChooseTrackFile from "./steps/ChooseTrackFile";
import ChooseCoverFile from "./steps/ChooseCoverFile";
import FinalStep from "./steps/FinalStep"

import Preloader from "../../components/Preloader";
import Button from "../../components/Button";

import { uploadSong } from '../../redux/actions/songsActions';
import { uploadAlbum } from "../../redux/actions/albumsActions.js";
import { showAlert, changeDir } from "../../redux/actions/interfaceActions";

export const MainContext = createContext();

const Upload = ({ dispatch }) => {

    const [load, setLoad] = useState(false);

    const [animateLoading, setAnimateLoading] = useState(false);
    const [form, setForm] = useState({type: 'single'});
    const [btnDisabled, setBtnDisabled ] = useState(true);
    const history = useHistory();

    const [scrollSteps, setScrollSteps] = useState(['Type', 'Name', 'Genre', "Upload files", "Upload Cover", 'Final']);
    
    const [steps, setSteps] = useState([
        ChooseLength,
        ChooseName,  
        ChooseGenre,
        ChooseTrackFile, 
        ChooseCoverFile, 
        FinalStep
    ]);

    
    const [step, setStep] = useState(0);
    const Step = steps[step];
        
    const changeStep = (dest) => {
        setAnimateLoading(true);
        dest == 'next' ? setStep(step + 1) : setStep(step - 1);
    }

    const uploadHandler = async () => {
        try {
            setLoad(true);

            const formData = new FormData();
            
            for (let key in form) {
                if (key === 'album') {
                    form[key].forEach((item, index) => {
                        formData.append('track', form[key][index])
                    })
                }
                if (key === 'genre') {
                    form[key].forEach((item, index) => {
                        formData.append('genre', form[key][index])
                    })
                }
                else {
                    formData.append(key, form[key])
                }
            }

            if (form.type == 'single') {
                await dispatch(uploadSong(formData));
            }
            else {
                await dispatch(uploadAlbum(formData));
            }

            setLoad(false)
            dispatch(changeDir({
                name: 'Profile',
                path: '/profile'
            }));
            history.push('/profile');
            
        }
        catch (e) {
            dispatch(showAlert({type: 'error', text: e.message}))
        }
    }
    
    useEffect(() => {
        setAnimateLoading(true);
        setTimeout(() => setAnimateLoading(false), 2000);
    }, [step]);


    if (load) {
        return ( 
            <Preloader/>
        )
    }

    return (
        <MainContext.Provider value={{ setLoad, setForm, form, setBtnDisabled, setSteps, steps, scrollSteps, setScrollSteps }}>         
            {!animateLoading && (
                <div className={`music__main-upload ${animateLoading ? 'hidden': ''}`}>
        
                    <div className="music__main-upload-container">        
                        <h2 className="subtitle">Step {step + 1}</h2>
                        <Step/>

                        <div className="music__main-upload-container-btns">
                            {step > 0 && <Button text="Back" type="button" onClick={() => changeStep('prev')} />}
                            {(step + 1 !== steps.length) && <Button text="Next" type="button" onClick={() => changeStep('next')} disabled={btnDisabled}/>}
                            {step == steps.length - 1 && <Button className="music__main-upload-container-final-btn" onClick={uploadHandler} type="button" text="Upload" active={load}/>}
                        </div>

                    </div>

                
                    <div className={`music__main-upload-scroll `}>
                        {
                            scrollSteps.map((item, index) => 
                            <div key={item} className="music__main-upload-scroll-wrap">   
                                <div className={`music__main-upload-scroll-wrap-circle ${(index <= step) && "active"}`} onClick={() => index <= step && setStep(index)}></div>
                                <span>{item}</span>
                                {(index + 1 !== scrollSteps.length) && <div className="music__main-upload-scroll-wrap-line"></div>}
                            </div>
                            )
                        }
                    </div>
                </div>
            )}
        </MainContext.Provider>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Upload);