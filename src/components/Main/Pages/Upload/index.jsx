import React, { useState, createContext, useEffect } from 'react';

import ChooseLength from "./steps/ChooseLength";
import ChooseGenre from "./steps/ChooseGenre";
import ChooseName from "./steps/ChooseName";
import ChooseTrackFile from "./steps/ChooseTrackFile";
import ChooseCoverFile from "./steps/ChooseCoverFile";
import FinalStep from "./steps/FinalStep"

import Preloader from "../../../Preloader";
import './Upload.scss';

export const MainContext = createContext();

const Upload = () => {

    const [load, setLoad] = useState(false);

    const [animateLoading, setAnimateLoading] = useState(false);
    const [form, setForm] = useState()
    const [btnDisabled, setBtnDisabled ] = useState(true);

    const [scrollSteps, setScrollSteps] = useState(['Type', 'Genre', "Upload files", "Upload Cover", 'Final']);
    
    const [steps, setSteps] = useState([
        ChooseLength,  
        ChooseGenre,  
        ChooseName,
        ChooseTrackFile, 
        ChooseCoverFile, 
        FinalStep
    ]);

    const [step, setStep] = useState(0);
    const Step = steps[step];

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    useEffect(() => {
        setAnimateLoading(true)
        setTimeout(() => setAnimateLoading(false), 2000);
    }, [step])


    if (load) {
        return ( 
            <Preloader/>
        )
    }

    return (
        <MainContext.Provider value={{ setLoad, setForm, form, setBtnDisabled, setSteps, steps, scrollSteps, setScrollSteps }}>         
            <div className="music__main-upload">
                <div className={`music__main-upload-bg`}></div>

                {!animateLoading && (
                    <>
                        
                        <div className="music__main-upload-container">
                    
                            <h2 className="subtitle">Step {step + 1}</h2>
        
                            <Step/>

                            <div className="music__main-upload-container-btns">
                                {step > 0 && <button onClick={prevStep}>Back</button>}
                                {(step + 1 !== steps.length) && <button onClick={nextStep} disabled={btnDisabled}>Next</button>}
                            </div>

                        </div>

                    </>
                )}
                        <div className={`music__main-upload-scroll ${(step === 3 && form.type !== "Single track" && !animateLoading ) ? 'relative' : ''}`}>
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
        </MainContext.Provider>
    );
}

export default Upload;