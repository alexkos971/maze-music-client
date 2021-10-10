import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeDir, setNight, setHeader, showAlert  } from "../../redux/actions/interfaceActions";
import {logout } from "../../redux/actions/profileActions";

import image  from '../../assets/img/Avatar.svg';

const Header = ({ dispatch, header, profile, night, path }) => {
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
                <div className="music__main-header-head-avatar">
                    <img src={profile.avatar || image} alt="avatar"/>
                </div>
            </Link>

            <h3>{profile.name}</h3>

            <span onClick={() => dispatch(setHeader(!header))}>
                <i className={`fas fa-chevron-${!header ? "down" : "up"}`}></i>
            </span>
        </div>
    
        <div className={`music__main-header-menu${header ? '-active' : ""}`}>
            <Link to="/auth" onClick={async () => {
                    dispatch(logout())
                }}>
                <span><i className="fas fa-user-circle"></i></span>
                <span>Logout</span>
            </Link>
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