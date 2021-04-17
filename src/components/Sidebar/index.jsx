import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { changeDir } from '../../redux/actions';

import { Context } from '../../context';
import './Sidebar.scss';
import { NavLink} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/Logo.svg';
import { ReactComponent as LogoTablet } from '../../assets/img/Logo_tablet.svg';

const Sidebar = ({ directory, dispatch }) => {
    let { sidebar } = useContext(Context);

    return (
        <div className="music__sidebar">
            
            <div className="music__sidebar-logo">
                <Logo className="music__sidebar-logo-main" alt="erte"/>

                <LogoTablet className="music__sidebar-logo-tablet" alt="erte"/>
            </div>
                {/* <h4 className="music__sidebar-title">Library</h4> */}
                
            <ul>
                {sidebar && sidebar.map(item => {
                    return (
                        <li 
                            key={item.id} 
                            onClick={() => {
                                dispatch(changeDir(item.name))
                            }} 
                            className={item.name === directory ? "active" : ""}>
                            
                            <NavLink to={item.name}>
                                <span className="music__sidebar-item-icon">
                                    <i className={`fas fa-${item.icon}`}></i>
                                </span>
                                <span className="music__sidebar-item-text">{item.name}</span>
                            </NavLink>
                        </li>);
                })}   
            </ul>
            

      
            {/* {data.footer.map(item => {
                return (
                    <div className="music__sidebar-footer" key={item}>
                        <h5>Current version {item.v}</h5>
                        <span>Update {item.update}</span>
                    </div>
                );
            })}   */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        directory: state.changeDir.dir
    }
}

export default connect(mapStateToProps)(Sidebar);