import React, { useContext } from 'react';
import { Route, Redirect, Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { Context } from '../context';
import { useMessage } from "../hooks/message.hook";

// Redux
import { setNight, setHeader, changeDir, setProfile } from '../redux/actions'

// Selectors
import FullPlayer from '../components/FullPlayer';
import Albums from './Albums';
import Album from "./Album";
import For from './For';
import Artist from './Artist';
import Playlists from './Playlists';
import Songs from './Songs';
import Upload from './Upload';
import Profile from './Profile';
import Settings from './Settings';
import Search from "./Search";

import image  from '../assets/img/Avatar.svg';
import ChangeAvatar from "./Profile/ChangeAvatar";

const Main = ({ dispatch, onSavePlaylist, night, header, profile, path  }) => {
    
    let { logout, token } = useContext(Context);
    const directory = useLocation()
    const message = useMessage();


    return (
        <div className="music__main">
            <FullPlayer />


            <div className="music__main-header">
            
                <span className={`music__main-header-dir`}>{path}</span>


                <div className="music__main-header-head">
                    <ul className={`music__main-header-head-navbar${directory.pathname === ("/Upload" || "/Profile" || '/Search') || night ? " dark" : ""}`}>
                        <li>
                            <Link to={"/Settings"} onClick={() => dispatch(changeDir("Settings"))}>
                                <span><i className="fas fa-sliders-h"></i></span>
                            </Link>
                        </li>
                        <li onClick={() => dispatch(setNight())}>
                            <span><i className={`fas fa-${!night ? "sun" : "moon"}`}></i></span>
                        </li>

                        <li onClick={() => message("Уведомления вкдючены")}>
                            <span><i className={`fas fa-bell`}></i></span>
                        </li>
                    </ul>

                    <Link to={"/Profile"} onClick={() => dispatch(changeDir("Profile"))}>
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
                    <Link to="/auth" onClick={() => {
                        logout()
                        dispatch(setProfile({profile: null}))
                    }}>
                        <span><i className="fas fa-user-circle"></i></span>
                        <span>Logout</span>
                    </Link>
                </div>

            </div>

            
            {/* {!isAuthenticated && <Redirect to="/auth" />} */}
            
            <Route path="/" exact>
                { token ? 
                    <Redirect to={`/${path}`} />
                    : 
                    <Redirect to="/auth" />
                }
            </Route>


            <Route path={"/Playlists"} exact component={Playlists}/>

            <Route path={"/For you"} exact>
                <For
                    onSavePlaylist={onSavePlaylist}/>
            </Route>

            <Route path={'/Change Avatar'} exact component={ChangeAvatar}/>
            <Route path={"/Artist/:id"} component={Artist}/>
            <Route path={"/Album/:id"} component={Album} />
            <Route path={"/Albums"} exact component={Albums}/>
            <Route path={"/Songs"} exact component={Songs}/>
            <Route path={"/Upload"} component={Upload}/>
            <Route path="/Search" exact component={Search}/>
            <Route path={"/Profile"} exact component={Profile}/>
            <Route path="/Settings" component={Settings}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return {
        start: state.onPlay.start,
        song: state.songs.song,
        night: state.interface.night,
        header: state.interface.header,
        profile: state.profile,
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(Main);