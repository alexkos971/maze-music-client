import React, { useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { getRecomendArtists } from '../../redux/actions/artistsActions';
import { getRecomendSongs } from '../../redux/actions/songsActions';

import SongsTemp from "../../components/SongsTemp";
import CardsTemp from "../../components/CardsTemp";
import Preloader from "../../components/Preloader"

import { useHttp } from '../../hooks/http.hook';

const For = ({ dispatch, recomendSongs, recomendArtists, savedSongs, profile }) => {
    
    const { loading, request } = useHttp();


    useEffect(() => {
        dispatch(getRecomendSongs())
    }, [dispatch, recomendSongs]);

    useEffect(() => {
        dispatch(getRecomendArtists())
    }, [dispatch, recomendArtists]);
    

    if (loading) {
        return (
            <Preloader/>
        );
    }

    return (
        <div className="music__main-for">
            
            { recomendArtists.length ? 
                <div className="music__main-artist-artists">
                    <h2 className="subtitle">Artists for you</h2>
                    
                    <CardsTemp items={recomendArtists} to="Artists" />
                </div>
                : null
            }

            <div className="music__main-songs">
                <div className="music__main-songs-nav">
                    <h2 className="subtitle">Music for you</h2>

                    {/* <div className="music__main-songs-nav-bar">
                        <span onClick={() => onSavePlaylist(save, {
                            "name": "Most popular",
                            "cover": song.cover,
                            "data": recomendSongs
                        })}>
                            <i className="far fa-heart"></i>
                        </span>

                        <span>
                            <i className="far fa-plus-square"></i>
                        </span>

                        <span>
                            <i className="far fa-share-square"></i>
                        </span>
                    </div> */}
                </div>

                {recomendSongs &&
                    <SongsTemp songs={recomendSongs}/>
                }
            </div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        start: state.onPlay.start,
        recomendSongs: state.songs.recomendSongs,
        recomendArtists: state.artists.recomendArtists,
        savedSongs: state.profile.saved_songs,
        song: state.onPlay.song,
        save: state.songs.save,
        profile: state.profile
    }
}


export default connect(mapStateToProps)(For);