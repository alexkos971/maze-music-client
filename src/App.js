import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';

import 'materialize-css';
import { connect } from 'react-redux';
import { onPlay, setProfile } from './redux/actions';

import './index.scss';
import { useAuth } from './hooks/auth.hook';
import { useHttp } from './hooks/http.hook';
import { Context } from './context';

import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Player from './components/Player';
import AuthPage from './components/AuthPage';

function App({ dispatch, start, songs, saved_songs, song, dir, night, profile }) {

  const { request, loading } = useHttp();
  const { login, logout, token } = useAuth();

  let { sidebar } = useContext(Context);
  
  const [prevSong, setPrevSong] = useState({});
  const [nextSong, setNextSong] = useState({});
  const [fullScreen, setFullScreen] = useState(false);


  const getProfile = useCallback(async () => {
    try {
      dispatch(setProfile(await request('/api/data/profile', 'GET', null, {
        Authorization: `Bearer ${token}`
      })));
    }  
    catch (e) {
      console.log("Не удалось загрузить профиль")
    }
  }, [token])

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token, getProfile, dispatch]);


  const onSaveSong = async (item) => {
    // try {
      // if (item.save) {
      saved_songs.map((elem, index) => {
        if (item._id === elem._id) {
          saved_songs.splice(index, 1)
        }
        else {
          saved_songs.push(item)
        }
      })
        // dispatch(getRecomendSongs(songs))
      // }


      // if (item.saved) {
      //   const removeSong = await request(`/api/songs/delete/${item._id}`, 'POST', null, {
      //     Authorization: `Bearer ${token}`
      //   });
      //   if (removeSong.message == "deleted") {

      //     return item.saved = false
      //   }
      //   else {
      //     const saveSong = await request(`/api/songs/save/${item._id}`, 'POST', null, {
      //       Authorization: `Bearer ${token}` 
      //     });

      //     if (saveSong.message == "saved") {
      //       return item.saved = true
      //     }
      //   }
      // }
    // catch (e) {
    //   console.log(e);
    // }
  }



  const onSavePlaylist = (save, props) => {
    console.log(save, props);
  }



  document.addEventListener('keydown', e => {
    switch (e.code) {
      case 'Space':
        dispatch(onPlay(song, start))
        return;
      // case 'KeyF':
      //   setFullScreen(!fullScreen);
      //   return;
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
      <h1 className="load_title">Loading...</h1>
    );
  } 
  
  return (
    <Context.Provider value={{
      login, logout, sidebar
    }}>

    {!token ? 
      <>
        <Redirect to="/auth/login" />
        
        <Route path="/auth" >
          <AuthPage/>
        </Route>
      </> :
      
      <>
       <Redirect to={`/${dir}`}/>
      
        <div className={ !night ? "music-night" : "music"}>

          {sidebar ? (<Sidebar/>) : (<h1 className="load_title">Loading...</h1>)}
          {profile ? 
          (<Main 
            setPrevSong={setPrevSong}
            setNextSong={setNextSong}W
            
            onSaveSong={onSaveSong} 
            onSavePlaylist={onSavePlaylist} />
            ) : (<h1 className="load_title">Loading...</h1>)}
        
        {song &&
          <Player
          prevSong={prevSong}
          nextSong={nextSong}
          onSaveSong={onSaveSong} 
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}/>
        }
        </div>
        </>
    }
    </Context.Provider>
    );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    start: state.onPlay.start,
    songs: state.songs.recomendSongs,
    saved_songs: state.profile.profile.saved_songs,
    song: state.onPlay.song,
    dir: state.changeDir.dir,
    night: state.interface.night,
    header: state.interface.header
  }
}

export default connect(mapStateToProps)(App);
 