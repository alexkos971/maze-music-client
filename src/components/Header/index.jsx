import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeDir, setNight, showAlert  } from "../../redux/actions/interfaceActions";
import image  from '../../assets/img/Avatar.svg';
import { apiUrl } from "../../config/constants";

const Header = ({ dispatch, profile, night, path }) => {
    
    const avatarRef = useRef(null)
    
    useEffect(() => {
        if (avatarRef) {
            avatarRef.current.setAttribute('data-nick', profile.avatarNick)
        }
    }, [profile.name])
    
    return (
    <div className="music__main-header">
                
        <span className={`music__main-header-dir`}>{path.name}</span>

        <div className="music__main-header-head">
            <ul className={`music__main-header-head-navbar${night ? " dark" : ""}`}>
                <li onClick={() => dispatch(showAlert({ type: 'warning', text: 'Вы переходите в настройки !' }))}>
                    {/* <Link to={"/settings"} onClick={() => dispatch(changeDir({name: "Settings", path: '/settings'}))}> */}
                        <span><i className="fas fa-sliders-h"></i></span>
                    {/* </Link> */}
                </li>
                <li onClick={() => dispatch(setNight())}>
                    <span><i className={`fas fa-${!night ? "sun" : "moon"}`}></i></span>
                </li>

                <li onClick={() => dispatch(showAlert({ type: 'success', text: 'Уведомления включены' }))}>
                    <span><i className={`fas fa-bell`}></i></span>
                </li>
            </ul>

            <Link to={"/profile"} onClick={() => dispatch(changeDir({name: "Profile", path: '/profile'}))}>
                <div className="music__main-header-head-avatar" ref={avatarRef}>
                    <img src={apiUrl + profile.avatar || image} alt=""/>
                </div>
            </Link>
            <h3>{profile.name}</h3>

        </div>
    </div>
    )
}


const mapStateToProps = state => ({
    header: state.interface.header,
    night: state.interface.night,
    path: state.interface.path,
    profile: state.profile,
})

export default connect(mapStateToProps)(Header)