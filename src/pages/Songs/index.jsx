import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Preloader from "../../components/Preloader";
import SongsTemp from "../../components/SongsTemp";

const Songs = ({  dispatch, savedSongs, song, start }) => {
    
    // const { loading, request } = useHttp();
    // const { token } = useAuth()

    // const saveSong = useCallback(async () => {
    //     try {
    //         if (token) {
                
    //             const data = await request(`/api/songs/save/${id}`, "POST", null, {
    //                 Authorization: `Bearer ${token}`
    //             });

    //             if (data) {
    //                 dispatch(setSavedSongs(data))
    //             }
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }, [ savedSongs, token])

    // useEffect(() => {
    //     saveSong()
    // }, [dispatch, token, savedSongs])

    if (!savedSongs) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className="music__main-saved-songs">
            <h2 className="subtitle">Saved songs</h2>
                {savedSongs && savedSongs.length > 0 ?
                    <SongsTemp songs={savedSongs} type="Saved"/>
                    :
                    <h2>You dont have saved songs</h2>
                }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        savedSongs: state.profile.saved_songs,
        song: state.onPlay.song,
        start: state.onPlay.start
    }
}

export default connect(mapStateToProps)(Songs);