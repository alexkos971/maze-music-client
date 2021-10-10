import React from 'react';
import { connect } from "react-redux";
import { changeDir } from "../../redux/actions/interfaceActions"
 
import { NavLink} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/Logo.svg';
import { ReactComponent as LogoTablet } from '../../assets/img/Logo_tablet.svg';

const Sidebar = ({ dispatch, path }) => {
    let sidebar = [
        {
          "name": "For you",
          "path": "/for-you",
          "icon": "heartbeat",
          "id": 1
        },
        {
          "name": "Artists",
          "path": "/artist",
          "icon": "users",
          "id": 2
        },
        {
          "name": "Albums",
          "path": "/albums",
          "icon": "compact-disc",
          "id": 3
        },
        {
          "name": "Songs",
          "path": "/songs",
          "icon": "music",
          "id": 4
        },
        {
          "name": "Playlists",
          "path": "/playlists",
          "icon": "stream",
          "id": 5
        },
        {
          "name": "Search",
          "path": "/search",
          "icon": "search",
          "id": 6
        },
        {
          "name": "Upload",
          "path": "/upload",
          "icon": "cloud-upload-alt",
          "id": 7
        }];
 
    return (
        <div className="music__sidebar">
            
            <div className="music__sidebar-logo">
                <Logo className="music__sidebar-logo-main" alt="erte"/>

                <LogoTablet className="music__sidebar-logo-tablet" alt="erte"/>
            </div>
                
            <ul>
                {
                sidebar.map(item => {
                    return (
                        <li 
                            key={item.id}
                            className={item.path === path.path ? "active" : ""}>
                            
                            <NavLink 
                                to={`${item.path}`} 
                                onClick={() => {
                                    dispatch(changeDir({name: item.name, path: item.path}))
                                }}>
                                <span className="music__sidebar-item-icon">
                                    <i className={`fas fa-${item.icon}`}></i>
                                </span>
                                <span className="music__sidebar-item-text">{item.name}</span>
                            </NavLink>
                        </li>);
                })}   
            </ul>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(Sidebar);