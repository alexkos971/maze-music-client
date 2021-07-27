import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { onPlay, saveSong, setSavedSongs } from '../../../../redux/actions'
import { connect } from 'react-redux';

import { useHttp } from '../../../../hooks/http.hook';
import { useAuth } from "../../../../hooks/auth.hook";
import { downloadIcon } from '../../images';
import './Songs.scss';

import SongsTemp from "../../SongsTemp";

const Songs = ({  dispatch, savedSongs, song, start }) => {
    
    const { loading, request } = useHttp();
    const { token } = useAuth()

    const getSavedSongs = useCallback(async () => {
        try {
            if (token) {
                
                const data = await request('/api/songs/saved', "GET", null, {
                    Authorization: `Bearer ${token}`
                });

                if (data) {
                    dispatch(setSavedSongs(data))
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [request, dispatch, savedSongs, token])

    useEffect(() => {
        getSavedSongs()
    }, [request, dispatch, savedSongs, token])
 

    return (
        <div className="music__main-songsList">
            <h2 className="subtitle">My songs</h2>

        {loading ? <h1 className="load_title">Loading...</h1> :
                
            <ol className="music__main-songs-list songs-list">
                {savedSongs && savedSongs.length > 0 ?
                    <SongsTemp songs={savedSongs}/>
                    :
                    <h2>You dont have saved songs</h2>
                }
            </ol>
        }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        savedSongs: state.songs.savedSongs,
        song: state.onPlay.song,
        start: state.onPlay.start
    }
}

export default connect(mapStateToProps)(Songs);