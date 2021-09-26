import React from "react";
import { hideAlert } from "../../redux/actions/interfaceActions";
import { useDispatch } from "react-redux";

const Alert = ({ items }) => {
    const dispatch = useDispatch();
    
    return (
        <div className="music__main-alerts">
        {
            items.map((item, index) => (
                <div className={`music__main-alert ${item.type}`} key={index}>
                    <span>{item.text}</span>    
                    <i onClick={() => dispatch(hideAlert(index))} className="fas fa-times"></i>
                </div>
            
            ))
        }
        </div>
    )
}

export default Alert;

