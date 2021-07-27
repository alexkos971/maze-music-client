import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMySongs, setProfile, changeDir } from '../../../redux/actions';

import { useHttp } from '../../../hooks/http.hook';
import { useAuth } from "../../../hooks/auth.hook";
import { useMessage } from "../../../hooks/message.hook";

import "./Profile.scss"
import image  from '../../../assets/img/Avatar.svg';

import SongsTemp from "../SongsTemp";
import CardsTemp from "../CardsTemp";
import Preloader from "../../Preloader";
import Button from "../../Button";

const Profile = ({ dispatch, profile, mySongs, myAlbums, savedSongs, song, start, night }) => {
    const { loading, request } = useHttp();
    const { token } = useAuth();

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
                            <img src={profile.avatar || image} alt=""/>
                            
                            <div className="music__main-profile-header-wrap-avatar-img-change" onClick={() => dispatch(changeDir('Change Avatar'))}>
                                <Link to="/ChangeAvatar">
                                    <span>Change</span>
                                </Link>
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

                        <div className="music__main-profile-header-wrap-nick-info">    
                            {profile.email && <span>@{profile.email}</span>}
                            <p>listener</p>
                        </div>
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
                {mySongs && mySongs.length > 0 ?
                    <SongsTemp songs={mySongs} my={true} />
                    :
                    <span className="music__main-profile-empty">You have no songs</span>
                }
            </div>

            <div className="music__main-profile-albums">
                <h2 className="subtitle">Albums</h2>
                {myAlbums && myAlbums.length > 0 ?
                    <CardsTemp items={myAlbums} to="Albums" my={true}/>
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
        mySongs: state.profile.profile.songs,
        myAlbums: state.profile.profile.albums,
        savedSongs: state.profile.profile.saved_songs,
        start: state.onPlay.start,
        song: state.onPlay.song,
        night: state.interface.night
    }
}

export default connect(mapStateToProps)(Profile);