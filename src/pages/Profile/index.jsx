import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeDir } from '../../redux/actions/interfaceActions';
import { changeProfileDescription, changeProfileName} from '../../redux/actions/profileActions';

import { useHttp } from '../../hooks/http.hook';
import { useAuth } from "../../hooks/auth.hook";
import { useMessage } from "../../hooks/message.hook";

import image  from '../../assets/img/Avatar.svg';

import SongsTemp from "../../components/SongsTemp";
import CardsTemp from "../../components/CardsTemp";
import Preloader from "../../components/Preloader";
import Button from "../../components/Button";

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


    if (loading && profile) {
        return (
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
                            
                            <div className="music__main-profile-header-wrap-avatar-img-change" onClick={() => dispatch(changeDir('change-avatar'))}>
                                <Link to="/change-avatar">
                                    <span>Change</span>
                                </Link>
                            </div>
                        
                        </div>
                    </div>          

                    <div className="music__main-profile-header-wrap-nick">
                        <div className="music__main-profile-header-wrap-nick-name">
                            <h1>{profile.name}</h1>

                            <span  onClick={() => dispatch(changeProfileName())}>
                                <i className="fas fa-pencil-alt"></i>
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
                                    <Link className="music__main-profile-header-frequents-frequent-item" to={`/artist/${item.link}`} key={index}>
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
                                    <Link className="music__main-profile-header-frequents-frequent-item" to={`/genre/${item.link}`} key={index}>
                                        {item.name}
                                    </Link>
                                )
                            })
                        } 
                    </div>

                    <div className="music__main-profile-header-frequents-frequent-desc">
                        <span className="music__main-profile-header-frequents-frequent-desc-title">Description:</span>
                        <span className="music__main-profile-header-frequents-frequent-desc-text">{profile.description.length < 30 ? profile.description :  profile.description_large}</span>
                        
                        <span className="music__main-profile-header-frequents-frequent-desc-icon">
                            <i className="fas fa-pencil-alt" onClick={() => dispatch(changeProfileDescription())}></i>
                        </span>
                        
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
                    <CardsTemp items={myAlbums} to="Albums" my/>
                    :
                    <span className="music__main-profile-empty">You have no albums</span>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        mySongs: state.profile.songs,
        myAlbums: state.profile.albums,
        savedSongs: state.profile.saved_songs,
        start: state.onPlay.start,
        song: state.onPlay.song,
        night: state.interface.night
    }
}

export default connect(mapStateToProps)(Profile);