import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import { hideModal } from "../../redux/actions/interfaceActions";

import Button from "../Button";    

const Modal = ({ dispatch, type, placeholder, value, onSubmit }) => {
    const [localValue, setLocalValue] = useState(value || '');
    const textRef = useRef();

    const submitHandler = (val) => {
        onSubmit(val);
        dispatch(hideModal());
    }

    return (
        <div className={`music__main-modal ${type == 'hidden' ? 'hidden': ''}`}>
            <div className="music__main-modal-bcg" onClick={() => type !== 'input' ? dispatch(hideModal()) : (textRef.current !== document.activeElement) ? dispatch(hideModal()) : false}></div>  

            <div className="music__main-modal-view">
            {
                (type == 'input') ?
                        <input 
                            type="text" 
                            name="name" 
                            required 
                            ref={textRef}
                            className="music__main-modal-view-input-text"
                            onChange={e => setLocalValue(e.target.value)} 
                            placeholder={placeholder ?? value} 
                            value={localValue}
                        />
                        : (type == 'confirm') ?
                        <input/>
                : null
            }

                <div className="music__main-modal-view-btns">
                    <Button 
                        text="Cancel" 
                        onClick={() => dispatch(hideModal())}/>
                    <Button 
                        className={'green'}
                        text="Submit" 
                        onClick={() => submitHandler(localValue)}/>
                </div>
            </div>
        </div>     
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Modal);