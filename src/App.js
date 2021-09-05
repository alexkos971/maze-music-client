import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';

import 'materialize-css';
import { connect } from 'react-redux';
import { onPlay, setProfile } from './redux/actions';

import './index.scss';
import { useAuth } from './hooks/auth.hook';
import { useHttp } from './hooks/http.hook';
import { useMessage } from './hooks/message.hook';
import Message from "./hooks/Message";
import { Context } from './context';

import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Player from './components/Player';
import AuthPage from './components/AuthPage';
import Preloader from "./components/Preloader"

function App({ dispatch, start, song, night, profile, path }) {

  const { request } = useHttp();
  const { login, logout, token } = useAuth();
  const { message, isVisible } = useMessage();
  let { sidebar } = useContext(Context);
    
  const [fullScreen, setFullScreen] = useState(false);


  const getProfile = useCallback(async () => {
    try {
      let data = await request('/api/users/profile', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      if (data) {
        dispatch(setProfile({...data, description_large: data.description.substr(0, 130) + '...'}));
      }
    }  
    catch (e) {
      console.log("Не удалось загрузить профиль", e)
    }
  }, [token, dispatch, request])

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token, getProfile, dispatch]);


  const onSavePlaylist = (save, props) => {
    console.log(save, props);
  }


  let allowed = true;
  document.addEventListener('keydown', e => {

    if (e.repeat !== undefined) {
      allowed = !e.repeat;
    }
    if (!allowed) {
      allowed = false;

      if (e.code === 'Space') {
        dispatch(onPlay(song, start))
    }
    }
  });
  
  // Clicks out of element for close
  document.addEventListener('click', (e) => {
    if (e.target.closest('.music__main-header-head') !== null) {
      // dispatch(setHeader(false));
    }
  });

  // Save last song before close window
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('lastSong', JSON.stringify(song))
  });
  
  
  
  if (!profile) {
    return (
      <Preloader/>
    )
  } 
  
  return (
    <Context.Provider value={{
      login, logout, sidebar
    }}>

    {isVisible && <Message text={ message } />}

    {!token ? 
      <>
        <Redirect to="/auth/login" />
        
        <Route path="/auth" >
          <AuthPage/>
        </Route>
      </> :
      
      <>
       <Redirect to={`/${path}`}/>
      
        <div className={ !night ? "music-night" : "music"}>

          {sidebar ? (<Sidebar/>) : (<h1 className="load_title">Loading...</h1>)}
          {profile ? 
          (<Main 
            onSavePlaylist={onSavePlaylist} />
            ) : (<h1 className="load_title">Loading...</h1>)}
        
      
          <Player
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}/>
        </div>
        </>
    }
    </Context.Provider>
    );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    start: state.onPlay.start,
    songs: state.songs.recomendSongs,
    saved_songs: state.profile.saved_songs,
    song: state.onPlay.song,
    night: state.interface.night,
    header: state.interface.header,
    path: state.interface.path
  }
}

export default connect(mapStateToProps)(App);
 