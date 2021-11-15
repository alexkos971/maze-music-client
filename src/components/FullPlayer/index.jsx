import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { setFullPlayer } from '../../redux/actions/interfaceActions';
import { apiUrl } from '../../config/constants'

import Button from "../Button";


const FullPlayer = ({ dispatch, full, song }) => {
    const history = useHistory()
    
    return (
        <div className={`music__main-full ${full ?  'active' : ''}`}>

        {song && 
            <>
                <h1>{song.name}</h1>

                <div className="music__main-full-info">
    
                    <span>Artist:  
                        <Link to={`/artist/${song.artist_id}`} onClick={() => dispatch(setFullPlayer(false))}>
                            <span> {song.artist_name}</span>
                        </Link>
                    </span>
    
                    {song.album_name && <span>Album: 
                        <Link to={`/album/${song.album_id}`} onClick={() => dispatch(setFullPlayer(false))}>
                            <span> {song.album_name}</span>
                        </Link>
                        </span>
                    }
    
                    {song.genre && 
                        <div className="music__main-full-info-genres">
                            <span>Genre:</span> 
                            {
                                song.genre.map(item => (
                                    <Link to={`/genre/${item}`} key={item} onClick={() => {
                                        dispatch(setFullPlayer(false))
                                        history.push('/Search')
                                    }} className="music__main-full-info-genres-item">
                                        <Button text={item} subClass="mr-20" type="button"/>
                                    </Link>
                                ))
                            }
                        </div>
                    }
                </div>
    
                <div className="music__main-full-cover">
                    <div className="music__main-full-cover-container">
                        <img src={apiUrl + song.cover} alt=""/>
                    </div>
                </div>
    
                { song.lyrics && 
                    <div className="music__main-full-lyrics">
                        <h3>Lyrics:</h3>
                    
                        <span>{song.lyrics}</span>
                         
                    </div>
                }
    
            </>
        }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        song: state.onPlay.song,
        full: state.interface.fullPlayer
    }
}

export default connect(mapStateToProps)(FullPlayer);