import React, { useEffect, useState } from "react";
import { hideAlert } from "../../redux/actions/interfaceActions";
import { useDispatch, useStore } from "react-redux";

const Alert = ({ items }) => {
    const dispatch = useDispatch();
    const alerts = useStore().getState().interface.alert;
    const [canRemove, setCanRemove] = useState(true);

    useEffect(() => {
        if (alerts.length && canRemove) {
            setCanRemove(false)

            setTimeout(() => {
                dispatch(hideAlert(alerts.length - 1))
                setCanRemove(true)
            }, 2000)
        }
    }, [alerts, canRemove])


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

