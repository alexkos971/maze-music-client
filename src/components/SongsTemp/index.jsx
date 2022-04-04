import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {  connect } from "react-redux";

import { apiUrl } from "../../config/constants";

import { saveSong } from "../../redux/actions/profileActions";
import { deleteSong } from "../../redux/actions/songsActions";
import { onPlay, setCurrentPlaylist } from "../../redux/actions/playActions";

const SongsTemp = ({ 
    dispatch,
    song,  
    start, 
    my, 
    night, 
    type, 
    setAlbum, 
    editSong,

    currentPlaylist,
    currentAlbum,

    savedSongs,

    songs, //songs
    setSongs // redux action to set songs array
}) => {

    useEffect(() => {
        dispatch(setCurrentPlaylist(songs))
    }, [songs]);


    const onSaveSong = async (item, index) => {
        let newSongs = songs;
        await dispatch(saveSong(item));
        
        if (type !== 'Saved') {     
            newSongs[index].saved = !item.saved;
            
            if (type !== 'Album') {
                await dispatch(setSongs(newSongs));
            }
            else {
                let newAlbum = currentAlbum;
                newAlbum.songs = [...newSongs];
                await dispatch(setAlbum(currentAlbum._id, newAlbum));
            }

            dispatch(setCurrentPlaylist(newSongs));
        }
        else {
            dispatch(setCurrentPlaylist(savedSongs));
        }

    }

    return (
        <ol className={`music__main-temp-songs-list${!night ? " night" : ""}`}>
            {currentPlaylist.map((item, index) => {
                return (
                    <li key={index} className={(song._id === item._id) ? "now_play" : ''}>
                        {type && type !== 'Upload' ?
                            <i className={`fas fa-${(start && song && song?._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                                onClick={() => { 
                                    dispatch(onPlay(item, songs));
                                }}>
                            </i>
                            : null
                        }

                        {type && type !== "Upload" &&
                            <div className="music__main-temp-songs-list-avatar">
                                {item.cover ? <img src={apiUrl + item.cover} alt="" /> : null}
                            </div>
                        }

                        <span className="music__main-temp-songs-list_name">
                            <Link to={`/Artist/${item.artist_id}`} className="music__main-temp-songs-list-link">
                                <span className="music__main-temp-songs-list_artist-name">
                                    {item.artist_name}
                                </span>
                            </Link>
                            
                            <span className="music__main-temp-songs-list-defis"> - </span>

                            {item.name?.length > 20 ?
                                <marquee scrollamount="2" className="music__main-temp-songs-list_track-name">
                                    <span className="music__main-temp-songs-list_track-name-wrap">
                                        {item.name}
                                    </span>
                                </marquee>
                                :
                                <span className="music__main-temp-songs-list_track-name">
                                    <span className="music__main-temp-songs-list_track-name-wrap">
                                        {item.name}
                                    </span>
                                </span>
                            }
                        </span>

                        <span className="music__main-temp-songs-list-album">{item.type ? (item.type == "single" ? item.type : item.album_name) : ''}</span>

                        <div className="music__main-temp-songs-list_right">

                            {type == 'Upload' &&
                                <span className="music__main-temp-songs-list_right-delete" onClick={() => editSong(item, index)}>
                                    <i className="fas fa-pencil-alt"></i>
                                </span>
                            }
                            
                            {my && item.type == 'single' &&
                                <span className="music__main-temp-songs-list_right-trash" onClick={() => dispatch(deleteSong(item._id))}>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            }

                            {type == 'Upload' ?
                                <span className="music__main-temp-songs-list_right-trash" 
                                    onClick={() => {
                                        const newAlbums = currentPlaylist.filter((el, ind) => ind !== index);
                                        setSongs(newAlbums);
                                    }}>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                                : null
                            }

                            <span className="music__main-temp-songs-list_right-download">
                                <i className="fas fa-arrow-circle-down"></i>
                            </span>

                            {type && type !== 'Upload' &&
                                <span className="music__main-temp-songs-list_right-save"
                                    onClick={() => onSaveSong(item, index)}>
                                    
                                    <i className={`fa${item.saved ? 's' : 'r'} fa-heart`}></i>
                                </span>
                            }
                            
                            <span className="music__main-temp-songs-list_right-time_now">
                                { type !== 'Upload' ? item.duration : '0:00'}
                            </span>
                        </div>

                    </li>
                );
            })}
    </ol>
    );
}

const mapStateToProps = (state) => {
    return {
        song: state.onPlay.song,
        start: state.onPlay.start,
        night: state.interface.night,
        loading: state.interface.loading,
        savedSongs: state.profile.saved_songs,
        
        currentPlaylist: state.onPlay.currentPlaylist,
        currentAlbum: state.albums.currentAlbum,
        
        recomendSongs: state.songs.recomendSongs,
    }
}

export default connect(mapStateToProps)(SongsTemp)