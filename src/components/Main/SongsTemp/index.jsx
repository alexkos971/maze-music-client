import React from "react";
import { Link } from "react-router-dom";

import "./SongsTemp.scss";
import {  connect } from "react-redux";
import { onPlay, getMySongs, getRecomendSongs } from "../../../redux/actions";


import { useHttp } from "../../../hooks/http.hook";
import { useAuth } from "../../../hooks/auth.hook";
import { useMessage } from "../../../hooks/message.hook";
import { downloadIcon } from '../images';

const SongsTemp = ({ dispatch, songs, mySongs, recomendSongs, profile, song, start, my, night, type, setSongs }) => {

    const { loading, request, error } = useHttp();
    const { token } = useAuth();
    const message = useMessage();

    const deleteSong = async (id) => {  
        let qustion = window.confirm("Вы точно хотите удалить этот трек ?");
        
        if (qustion) {

            let data = await request(`/api/songs/delete/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            
            
            if (error) {
                alert(error)
            }
            
            if (data) {
                const newSongs = mySongs.filter(item => {
                    return item._id !== id;
                })
                const newRecomendSongs = recomendSongs.filter(item => {
                    return item._id !== id;
                })
                await dispatch(getMySongs(newSongs))
                await dispatch(getRecomendSongs(newRecomendSongs))
                message(data.message)
            }
        }
        else {
            return;
        }
    }

    if (type && type === 'Album') {
        return (
            <ol className={`music__main-temp-songs-list${!night ? " night" : ""}`}>
                {
                    songs.map((item, index) => 
                        <li key={index}>
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
                                    setSongs(newAlbums)
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
            
            <span className="music__main-temp-songs-view">View all</span>
        
            {!loading &&
                songs.map((item, index) => {
                
                return (
                    <li key={index} id={(song && song._id === item._id) ? "now_play" : ''}>
                        <i className={`fas fa-${(start && song && song._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                            onClick={() => { 
                                dispatch(onPlay(item, songs));
                            }}>
                        </i>

                        <div className="music__main-temp-songs-list-avatar">
                            <img src={item.cover} alt="avatar" />
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
                                <span className="music__main-temp-songs-list_right-trash" onClick={() => deleteSong(item._id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            }

                            <a href={item.src} download>
                                <span className="music__main-temp-songs-list_right-download">
                                    <img src={downloadIcon} alt=""/>
                                </span>
                            </a>

                            <span className="music__main-temp-songs-list_right-save"
                                onClick={() => alert("saved")}>
                                <i className={`fa${item.saved ? 's' : 'r'} fa-heart`}></i>
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
        mySongs: state.songs.mySongs,
        recomendSongs: state.songs.recomendSongs,
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps)(SongsTemp)