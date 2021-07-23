import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMySongs, setProfile } from '../../../redux/actions';

import { useHttp } from '../../../hooks/http.hook';
import { useAuth } from "../../../hooks/auth.hook";
import { useMessage } from "../../../hooks/message.hook";

import "./Profile.scss"

import SongsTemp from "../SongsTemp";
import CardsTemp from "../CardsTemp";
import Preloader from "../../Preloader";
import Button from "../../Button";

const Profile = ({ dispatch, profile, mySongs, myAlbums, savedSongs, song, start, night }) => {
    const { loading, request } = useHttp();
    const { token } = useAuth();

    const [checked, setChecked] = useState(false)

    const frequent = {
        artists: [
            { 
                "name": "Валентин Стрыкало",
                "link": "#"
            },
            { 
                "name": "Alex Kos",
                "link": "601d8286665abe1cf86c40f6"
            },
            { 
                "name": "Grandson",
                "link": "#"
            }
        ],
        genres: [
            {
                "name": "EDM",
                "link": "#"
            },
            { 
                "name": "Lo-Fi",
                "link": "#"
            },
            { 
                "name": "Post Punk",
                "link": "#"
            }
        ]
    }

    const message = useMessage();

    const changeAvatar = async () => {
        let link = prompt('Paste the link of new avatar');
        
        if (!link) {
            return alert('Поле пустое !!!');
        }

        try {
            const avatar = await request('/api/changes/avatar', 'POST', { avatar: link }, {
                Authorization: `Bearer ${token}`
            })

            if (avatar) {
                message(avatar.message);
                dispatch(setProfile({...profile, avatar: avatar.avatar }))
            }
        }
        catch (e) {
            message(e.message)
        }
    }

    const changeName = async () => {
        let name = prompt('Paste the new name', profile.name);
        
        if (!name) {
            return alert('Поле пустое !!!');
        }

        try {
            const newName = await request('/api/changes/name', 'POST', { name: name }, {
                Authorization: `Bearer ${token}`
            })

            if (newName) {
                message(newName.message);
                dispatch(setProfile({...profile, name: newName.name}))
            }
        }
        catch (e) {
            message(e.message)
        }
    }

     // Get list of songs
     const getSongs = useCallback(async (list) => {
        try {
            if (!list.length) {

                let data = await request(`/api/songs/mySongs`, 'GET', null, {
                    Authorization: `Bearer ${ token }`
                });
                    if (data && data.length > 0) {
                        dispatch(getMySongs(data))
                    }
                    else if (data.message === '404 not found') {
                        dispatch(getMySongs([]));
                    }
                }
                else {
                dispatch(getMySongs(list))
            }
        }
        catch (e) { console.error(e) }
    }, [request, dispatch, token, mySongs ]);
    
    useEffect(() => {
        if (token) {
            getSongs(mySongs);
        }
    }, [dispatch, token, getSongs, mySongs])


    if (loading && profile) {
        return (
            // <h1 className="load_title">Loading...</h1>
            <Preloader/>
        );
    } 

    return (
        <div className={`music__main-profile ${!night ? "night" : ""}`}>
            <div className="music__main-profile-header">
                
                <div className="music__main-profile-header-wrap">
                    
                    <div className="music__main-profile-header-wrap-avatar">

                        <div className="music__main-profile-header-wrap-avatar-img">
                            <img src={profile.avatar} alt=""/>
                            
                            <div className="music__main-profile-header-wrap-avatar-img-change">
                                <span onClick={changeAvatar}>Change</span>
                            </div>
                        
                        </div>
                    </div>          

                    <div className="music__main-profile-header-wrap-nick">
                        <div className="music__main-profile-header-wrap-nick-name">
                            <h1>{profile.name}</h1>

                            <span>
                                <i className="fas fa-pencil-alt" onClick={changeName}></i>
                            </span>
                        </div>
                        <span>listener</span>
                    </div>
                </div>
            
            {frequent &&
                <div className="music__main-profile-header-frequents">
                    <div className="music__main-profile-header-frequents-frequent">
                        <span>Frequent artists:</span>

                        {
                            frequent.artists.map((item, index) => {
                                return (
                                    <Link className="music__main-profile-header-frequents-frequent-item" to={`Artist/${item.link}`} key={index}>
                                        {item.name}
                                    </Link>
                                )
                            })
                        }                            
                    </div>

                    <div className="music__main-profile-header-frequents-frequent">
                        <span>Frequent genres:</span>

                        {
                            frequent.genres.map((item, index) => {
                                return (
                                    <Link className="music__main-profile-header-frequents-frequent-item" to={`Genre/${item.link}`} key={index}>
                                        {item.name}
                                    </Link>
                                )
                            })
                        } 
                    </div>
                </div>
            }
            </div>

            <div className="music__main-profile-settings">
                <h2 className="subtitle">Settings</h2>

                <ul className="music__main-profile-settings-list">
                    <li className="music__main-profile-settings-list-item">
                        <span>Language:</span>

                        <div className="music__main-profile-settings-list-item-select">           
                            <Button type="select" list={['English', 'Russian', 'Germany']}/>
                        </div>
                    </li>
                    <li className="music__main-profile-settings-list-item">
                        <span>Quality of audio:</span>

                        <div className="music__main-profile-settings-list-item-select">
                            <Button type="select" list={['High', 'Middle']}/>
                        </div>
                    </li>
                    <li className="music__main-profile-settings-list-item">
                        <span>Files on device:</span>

                        <Button type="button" text="C:/Users/Alex/AppData/Roaming/maze-music/data" active mr />
                    </li>
                    <li className="music__main-profile-settings-list-item">
                        <span>Notifications:</span>

                        <div className="music__main-profile-settings-list-item-checkbox">
                            <Button type={'checkbox'}/>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div className="music__main-profile-songs">
                <h2 className="subtitle">Songs</h2>
                {mySongs.length > 0 ?
                    <SongsTemp songs={mySongs} my={true} />
                    :
                    <span className="music__main-profile-empty">You have no songs</span>
                }
            </div>

            <div className="music__main-profile-albums">
                <h2 className="subtitle">Albums</h2>
                {myAlbums.length > 0 ?
                    <CardsTemp songs={myAlbums} />
                    :
                    <span className="music__main-profile-empty">You have no albums</span>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        mySongs: state.songs.mySongs,
        myAlbums: state.albums.myAlbums,
        savedSongs: state.profile.profile.saved_songs,
        start: state.onPlay.start,
        song: state.onPlay.song,
        night: state.interface.night
    }
}

export default connect(mapStateToProps)(Profile);