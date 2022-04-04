import React, { useEffect } from "react";
import { hideAlert } from "../../redux/actions/interfaceActions";
import { useDispatch, useStore } from "react-redux";

const Alert = ({ items }) => {
    const dispatch = useDispatch();
    const alerts = useStore().getState().interface.alert;

    useEffect(() => {
        if (alerts?.length) {
            let alertTimeout;
            
            alertTimeout = setTimeout(() => {
                dispatch(hideAlert(alerts.length - 1));
            }, 2000);
        
            return () => clearTimeout(alertTimeout);
        }
    }, [alerts]);


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

