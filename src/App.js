import React, { useState, useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import { setProfile } from './redux/actions/profileActions';

import './index.scss';

import Sidebar from './components/Sidebar';
import Main from './pages';
import Player from './components/Player';
import AuthPage from './pages/AuthPage';
import Preloader from "./components/Preloader"
import { userToken } from "../src/config/constants";

function App({ dispatch, song, night, profile, defaultPath }) {

  const [fullScreen, setFullScreen] = useState(false);
  const token = userToken();

  useEffect(() => {
    if (token && !profile.name) {
      dispatch(setProfile());
    }
      // if (!token) {
      //   history.push('/auth')
      // }
      // else {
      //   history.push('for-you');
      // }
  }, [token, profile, dispatch]);

  // Save last song before close window
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('lastSong', JSON.stringify(song))
  });
  
  
  return (
    <>
      {!token ?
        <>
          <Redirect to="/auth/login" />      

          <Route path="/auth" >
            <AuthPage/>
          </Route>
        </>
        :
        <>
          <Redirect to={defaultPath.src}/>
          <div className={ !night ? "music-night" : "music"}>
            <Sidebar/>
            
            { profile.name ? 
              <Main />
              : 
              <Preloader/>
            }
        
            <Player {...{setFullScreen, fullScreen}} />
          </div>
        </>
      }
      </>
    );
  }
  
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    song: state.onPlay.song,
    night: state.interface.night,
    defaultPath: state.interface.defaultPath
  }
}

export default connect(mapStateToProps)(App);
 