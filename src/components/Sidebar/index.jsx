import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { changeDir } from "../../redux/actions/interfaceActions"
 
import { Context } from '../../context';
import { NavLink} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/Logo.svg';
import { ReactComponent as LogoTablet } from '../../assets/img/Logo_tablet.svg';

const Sidebar = ({ dispatch, path }) => {
    let { sidebar } = useContext(Context);
 
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