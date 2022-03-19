import React, { useRef, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
import MainBcg from "../components/MainBcg";
import Preloader from "../components/Preloader";

import { userToken } from "../config/constants";

const Main = ({ onSavePlaylist, defaultPath, alert, pathName, profileName  }) => {
    const token = userToken(),
        viewWrap = useRef(null),
        [isFilled, setIsFilled] = useState(false);

    const handleScroll = e => {
        if (e.target.scrollTop >= 40) {
            setIsFilled(true);
        }
        else {
            setIsFilled(false);
        }
    }

    const toStartPage = () => {
        viewWrap.current.scroll({top: 0, left: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        viewWrap.current.addEventListener('scroll', handleScroll);
    }, [isFilled]);

    return (
        <div className="music__main" ref={viewWrap}>
            <FullPlayer />

            <Header {...{isFilled, toStartPage}} />

            {
                profileName ? 
                <div className="music__main-wrap">
                    {
                        (pathName === 'Search' || pathName === 'Upload') && 
                        <MainBcg/>
                    }

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
                :
                <Preloader/>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return {
        start: state.onPlay.start,
        song: state.songs.song,
        defaultPath: state.interface.defaultPath,
        profileName: state.profile.name,
        alert: state.interface.alert,
        pathName: state.interface.path.name
    }
}

export default connect(mapStateToProps)(Main);