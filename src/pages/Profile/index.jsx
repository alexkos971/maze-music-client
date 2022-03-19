import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeDir } from '../../redux/actions/interfaceActions';
import { changeProfileDescription, changeProfileName, logout} from '../../redux/actions/profileActions';

import image  from '../../assets/img/Avatar.svg';

import SongsTemp from "../../components/SongsTemp";
import CardsTemp from "../../components/CardsTemp";
import Preloader from "../../components/Preloader";
import Button from "../../components/Button";
import PrevPage from "../../components/PrevPage";
import { apiUrl } from '../../config/constants';

const Profile = ({ dispatch, profile, mySongs, myAlbums, night, loading }) => {
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
    
    const avatarRef = useRef(null)

    useEffect(() => {
        if (!profile.avatar.length) {
            avatarRef.current.setAttribute('data-nick', profile.avatarNick)
        }
    }, [profile.name])


    if (loading && profile) {
        return (
            <Preloader/>
        );
    } 

    return (
        <div className={`music__main-profile ${!night ? "night" : ""}`}>
            <div className="music__main-profile-header">
                
                <div className="music__main-profile-header-wrap">
                    
                    <PrevPage classNames={"center"}/>
                    
                    <div className="music__main-profile-header-wrap-avatar" ref={avatarRef}>

                        {/* <div className="music__main-profile-header-wrap-avatar-img"> */}
                            <img src={apiUrl + profile.avatar || image} alt=""/>
                            
                            <div className="music__main-profile-header-wrap-avatar-change" onClick={() => dispatch(changeDir('change-avatar'))}>
                                <Link to="/change-avatar">
                                    <span>Change</span>
                                </Link>
                            </div>
                
                        {/* </div> */}
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
                        <span className="music__main-profile-header-frequents-frequent-desc-text">{profile.description}</span>
                        
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

                        <Button type="button" text="C:/Users/Alex/AppData/Roaming/maze-music/data" class="active mr" />
                    </li>
                    <li className="music__main-profile-settings-list-item">
                        <span>Notifications:</span>

                        <div className="music__main-profile-settings-list-item-checkbox">
                            <Button type={'checkbox'}/>
                        </div>
                    </li>

                    <li className="music__main-profile-settings-list-item">
                        <Link to="/auth" onClick={async () => {
                            dispatch(logout())
                        }}>
                            <span>Logout</span>
                        </Link>
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
                {myAlbums?.length > 0 ?
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
        night: state.interface.night,
        loading: state.interface.loading
    }
}

export default connect(mapStateToProps)(Profile);