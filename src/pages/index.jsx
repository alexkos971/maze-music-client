import React, { useContext } from 'react';
import { Route, Redirect,  } from 'react-router-dom';
import { connect } from 'react-redux';

import { Context } from '../context';
import { useMessage } from "../hooks/message.hook";

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

const Main = ({ onSavePlaylist, path  }) => {
    
    let { logout, token } = useContext(Context);
    const message = useMessage();


    return (
        <div className="music__main">
            <FullPlayer />

            <Header logout={logout} message={message} />
            
            <Route path="/" exact>
                { token ? 
                    <Redirect to={path.path} />
                    : 
                    <Redirect to="/auth" />
                }
            </Route>


            <Route path={"/playlists"} exact component={Playlists}/>

            <Route path={"/for-you"} exact>
                <For onSavePlaylist={onSavePlaylist}/>
            </Route>

            <Route path={'/change-avatar'} exact component={ChangeAvatar}/>
            <Route path={"/artist/:id"} component={Artist}/>
            <Route path={"/album/:id"} component={Album} />
            <Route path={"/albums"} exact component={Albums}/>
            <Route path={"/songs"} exact component={Songs}/>
            <Route path={"/upload"} component={Upload}/>
            <Route path="/search" exact component={Search}/>
            <Route path={"/profile"} exact component={Profile}/>
            <Route path="/settings" component={Settings}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return {
        start: state.onPlay.start,
        song: state.songs.song,
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(Main);