import React from "react";
import { useHistory } from "react-router-dom";

const PrevPage = ({ classNames }) => {
    const history = useHistory();
    
    return (
        <span className={`music__main-page-go-back ${classNames}`} onClick={() => history.goBack()}>
            <i className='fas fa-chevron-left'></i>
        </span>
    );
}

export default PrevPage;