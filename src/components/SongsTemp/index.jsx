import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  connect } from "react-redux";

import { apiUrl } from "../../config/constants";

import { setSavedSongs } from "../../redux/actions/profileActions";
import { deleteSong } from "../../redux/actions/songsActions";
import { onPlay } from "../../redux/actions/playActions";
import Preloader from "../Preloader";

const SongsTemp = ({ 
    dispatch,
    savedSongs,  
    profile, 
    song, 
    start, 
    my, 
    night, 
    loading,
    type, 
    setAlbum, 
    songs }) => {

    const [songsArray, setSongsArray] = useState(null);


    const checkSaved = async (list) => {
        if (savedSongs.length > 0) {
            list.forEach(async item => {
                savedSongs.forEach(elem => {
                    if (item._id === elem._id) {
                        item.saved = true;
                    }
                    else {
                        item.saved = false;
                    }
                })
            })
        }
        else {
            list.forEach(item => {
                item.saved = false;
            });
        }

        setSongsArray(list);
    }

    useEffect(() => {
        if (songs?.length && savedSongs && !songsArray) {
            checkSaved(songs)
        }
    }, [songs, savedSongs, songsArray])



    const onSaveSong = async (item, index) => {

        setSongsArray(prev => {
            let newArr = [...prev];
            newArr[index] = {...item, saved: !item.saved};
            return newArr;
        });

        if (savedSongs && savedSongs.length > 0) {
            const check = await savedSongs.some(el => el._id === item._id);
                if (!check) {
                    dispatch(setSavedSongs([...savedSongs, item]));
                }
                else {
                    const newSongs = await savedSongs.filter(el => el._id != item._id);
                    dispatch(setSavedSongs(newSongs));
                }
        }
        else {
            dispatch(setSavedSongs([...savedSongs, item]));
        }

    }

    if (!songsArray) {
        return (
            <Preloader/>
        )
    }

    if (type && type === 'Album') {
        return (
            <ol className={`music__main-temp-songs-list${!night ? " night" : ""}`}>
                {
                    songs.map((item, index) => 
                        <li key={index}>
                            <i className={`fas fa-${(start && song && song._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                                onClick={() => { 
                                    dispatch(onPlay(item, songs));
                                }}>
                            </i>
                            <span className="music__main-temp-songs-list_name">
                                <span className="music__main-temp-songs-list-link">
                                    <span className="music__main-temp-songs-list_artist-name">
                                        {profile.name}
                                    </span>
                                    <span> - </span>
                                </span>
                                {item.name.substring(0, item.name.length - 4)}
                            </span>

                            <span className="music__main-temp-songs-list-album">{type}</span>

                            <div className="music__main-temp-songs-list_right">
                                <span className="music__main-temp-songs-list_right-trash" 
                                onClick={() => {
                                    const newAlbums = songs.filter((el, ind) => ind !== index);
                                    setAlbum(newAlbums)
                                }}>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                                <span className="music__main-temp-songs-list_right-time_now">0:00 </span>
                            </div>
                        </li>
                    )
                }
            </ol>
        )
    }

    return (
        <ol className={`music__main-temp-songs-list${!night ? " night" : ""}`}>
        
            {!loading &&
                songsArray.map((item, index) => {
                
                return (
                    <li key={index} className={(song && song._id === item._id) ? "now_play" : ''}>
                        <i className={`fas fa-${(start && song && song._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                            onClick={() => { 
                                dispatch(onPlay(item, songs));
                            }}>
                        </i>

                        <div className="music__main-temp-songs-list-avatar">
                            {item.cover ?  <img src={apiUrl + item.cover} alt="" /> : null}
                        </div>

                        <span className="music__main-temp-songs-list_name">
                            <Link to={`/Artist/${item.artist_id}`} className="music__main-temp-songs-list-link">
                                <span className="music__main-temp-songs-list_artist-name">
                                    {item.artist_name}
                                </span>
                                <span> - </span>
                            </Link>
                            {item.name}
                        </span>

                        <span className="music__main-temp-songs-list-album">{item.type ? item.type : "single"}</span>

                        <div className="music__main-temp-songs-list_right">

                            {my &&
                                <span className="music__main-temp-songs-list_right-trash" onClick={() => dispatch(deleteSong(item._id))}>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            }

                            <span className="music__main-temp-songs-list_right-download">
                                <i className="fas fa-arrow-circle-down"></i>
                            </span>

                            <span className="music__main-temp-songs-list_right-save"
                                onClick={() => onSaveSong(item, index)}>
                                
                                <i className={`fa${type == 'Saved' ? 's' :  (item.saved ? 's' : 'r')} fa-heart`}></i>
                            </span>
                            
                            <span className="music__main-temp-songs-list_right-time_now">
                                { item.duration}
                            </span>
                        </div>

                    </li>
                );
                })
            }
    </ol>
    )
}

const mapStateToProps = (state) => {
    return {
        song: state.onPlay.song,
        start: state.onPlay.start,
        night: state.interface.night,
        loading: state.interface.loading,
        mySongs: state.profile.songs,
        savedSongs: state.profile.saved_songs,
        recomendSongs: state.songs.recomendSongs,
        profile: state.profile
    }
}

export default connect(mapStateToProps)(SongsTemp)