import React, { useState,  useEffect } from 'react';
import { connect } from 'react-redux';
import { setDuration, setStart, onPlay, setCurrentPlaylist } from '../../redux/actions/playActions';
import { setFullPlayer } from '../../redux/actions/interfaceActions';
import { saveSong } from '../../redux/actions/profileActions';

import { apiUrl } from '../../config/constants'

let audio;

const Player = ({ 
    dispatch, 
    start, 
    full, 
    song, 
    currentDuration, 
    recomendSongs,
    savedSongs,
    currentPlaylist,
    fullScreen
}) => { 
    const [stateVolume, setStateVolume] = useState(50);
    const [inputDuration, setInputDuration] = useState(0);
    const [isFirstStart, setIsFirstStart] = useState(true);

    const setAudio = () => {
        if (song) {
            audio.src = apiUrl + song.src;
            audio.volume = stateVolume / 100; 

            audio.ontimeupdate = () => {
                setInputDuration((audio.currentTime * 100) / audio.duration)
                dispatch(setDuration((audio.currentTime)));
            }

            audio.onended = () => {
                setInputDuration(0)
                onStartPlay()
            }
        }    
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                // dispatch(setStart(!start));
                playSong();
            }
        })
    }, []);
        
    let onStartPlay = () => {
        return start ? audio.play() : audio.pause();  
    }
    

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        }
        else {
            setInputDuration(0);
            setAudio();
            onStartPlay()
        }
    }, [song.src, isFirstStart])
    
    

    useEffect(() => {
        onStartPlay()
    }, [start, dispatch, onStartPlay])

    
    const handleProgress = e => { 
        if (song.src) {
            let compute = (e.target.value * audio.duration) / 100;
            dispatch(setDuration(compute))
            setInputDuration(e.target.value)
            audio.currentTime = compute;
        }
    }

    useEffect(() => {
        audio.volume = stateVolume / 100
    }, [stateVolume]);
      
    
    const playSong = () => {
        if (song?.src) {
            if (isFirstStart) {
                dispatch(onPlay(song, recomendSongs));
                setIsFirstStart(false);
            }
            else {
                dispatch(setStart(!start));
            }
        }
    }
    
    const mouseWheel = elem => {
        if (elem.deltaY > 9.8 * 100 || elem.deltaY < 0.2 * 100) {
            return false;
        }
            setStateVolume(elem.deltaY/stateVolume* 100)
    }
        
    const repeatTrack = () => {
        setInputDuration(0)
        audio.currentTime = 0;
            
        if (start) {
            audio.play();
        }
    }

    const onSaveSong = async (item) => {  
        await dispatch(saveSong(item));

        let checkOnCurrentPlaylist = await currentPlaylist.find(el => el._id == item._id);
        if (checkOnCurrentPlaylist) {
            if (currentPlaylist !== savedSongs) {
                let newSongs = await currentPlaylist.map(elem => {
                    if (elem._id == item._id) {
                        elem.saved = !item.saved;
                    }
                    return elem;
                });
                dispatch(setCurrentPlaylist(newSongs));
            }
        }
    }

    return (
        <div className="music__player">
            <div className="music__player-controls">
                <i className="fas fa-backward play-prev" id="play_prev" onClick={() => console.log(song)}></i>

                <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`} 
                    onClick={() => playSong()}>
                </i>
                
                <i className="fas fa-forward play-prev" id="play_next" onClick={() => console.log(song)}></i>
            </div>

            <div className="music__player-song-desk">
                <span className="music__player-song-desk-name">{song && song.name}</span>
                <span className="music__player-song-desk-artist">{song && song.artist_name}</span>
            </div>

            <span className="music__player-toFull">
                <i className={`fas fa-chevron-${!full ? "up" : "down"}`} onClick={() => {
                    song && song.hasOwnProperty("src") && dispatch(setFullPlayer(!full))
                }}></i>
            </span>

            <div className="music__player-timeline">
                <span id="music-time_now">{ currentDuration }</span>

                <input 
                    type="range" 
                    name="progressBar" 
                    id="music-range" 
                    disabled={!song && true}
                    value={inputDuration}
                    onChange={handleProgress} />

                <span id="music-time_total">{song && song.duration}</span>
            </div>  

            <div className="music__player-bar">

                <span className="music__player-volume">
                    <i className={`fas fa-volume-${(stateVolume > 0) ? `up` : `off`}`} onClick={() => (stateVolume === 0) ? setStateVolume(50) : setStateVolume(0)}></i>
                    
                    <input 
                        type="range" 
                        value={stateVolume} 
                        className="music__player-volume-range" 
                        onWheel={e => mouseWheel(e)}
                        onChange={(e) => setStateVolume(e.target.value)} />
                </span>
                
                <span onClick={() => onSaveSong(song)}>
                    <i className={`fa${song?.saved ? "s" : "r"} fa-heart`}></i>
                </span>

                <span  className="music__player-full">
                    {/* <img src={repeatIcon} alt="repeat all" id="repeat_all"/> */}
                    <i className={`fas fa-${!fullScreen ? "expand" : "compress"}`}></i>
                </span>

                <span onClick={repeatTrack}>
                    <i className="fas fa-redo-alt"></i>
                </span>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        start: state.onPlay.start,
        song: state.onPlay.song,
        recomendSongs: state.songs.recomendSongs,
        savedSongs: state.profile.saved_songs,
        currentPlaylist: state.onPlay.currentPlaylist,
        currentDuration: state.onPlay.currentDuration,
        full: state.interface.fullPlayer
    }
}

export default connect(mapStateToProps)(Player);