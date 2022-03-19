import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getRecomendArtists } from '../../redux/actions/artistsActions';
import { setRecomendSongs } from '../../redux/actions/songsActions';

import SongsTemp from "../../components/SongsTemp";
import CardsTemp from "../../components/CardsTemp";
import Preloader from "../../components/Preloader"

const For = ({ dispatch, loading, recomendSongs, recomendArtists }) => {

    useEffect(() => {
        if (!recomendSongs.length) {
            dispatch(setRecomendSongs())
        }
        else {
            dispatch(setRecomendSongs(recomendSongs))
        }
    }, [dispatch]);

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

                {recomendSongs?.length ?
                    <SongsTemp songs={recomendSongs} setSongs={setRecomendSongs}/>
                    : null
                }
            </div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        loading: state.interface.loading,
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