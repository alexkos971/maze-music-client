import React from 'react';
import { Route, Redirect,  } from 'react-router-dom';
import { connect } from 'react-redux';

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
import ChangeAvatar from "./Profile/ChangeAvatar";

import Header from "../components/Header";
import Alert from "../components/Alert";

import { userToken } from "../config/constants";

const Main = ({ onSavePlaylist, defaultPath, alert  }) => {
    const token = userToken()

    return (
        <div className="music__main">
            <FullPlayer />

            <Header />

            <Route path={"/playlists"} exact component={Playlists}/>

            <Route path={"/for-you"} exact>
                <For onSavePlaylist={onSavePlaylist}/>
            </Route>

            <Route path="/">
            {
                token ? <Redirect to={defaultPath.src}/> : <Redirect to='/auth/login' />
            }
            </Route>
            
            <Route path={'/change-avatar'} exact component={ChangeAvatar}/>
            <Route path={"/artist/:id"} component={Artist}/>
            <Route path={"/album/:id"} component={Album} />
            <Route path={"/albums"} exact component={Albums}/>
            <Route path={"/songs"} exact component={Songs}/>
            <Route path={"/upload"} component={Upload}/>
            <Route path={"/search"} exact component={Search}/>
            <Route path={"/profile"} exact component={Profile}/>
            <Route path="/settings" component={Settings}/>

            {alert.length ? <Alert items={alert}/> : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return {
        start: state.onPlay.start,
        song: state.songs.song,
        defaultPath: state.interface.defaultPath,
        alert: state.interface.alert
    }
}

export default connect(mapStateToProps)(Main);