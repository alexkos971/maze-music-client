import React, { useState, useCallback, useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { setNowAlbum } from "../../redux/actions";

import SongsTemp from "../../components/SongsTemp"; 
import Preloader from "../../components/Preloader";

const Album = ({ dispatch, album }) => {
    // const [album, setAlbum] = useState(null);

    let id = useParams().id;
    const { request, loading } = useHttp();

    const getAlbum = useCallback(async () => {
        try { 
            const data = await request(`/api/albums/album/${id}`, 'GET');
            if (data) {
                console.log(album, data)
                dispatch(setNowAlbum({ ...album, songs: data }))
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [request, id])

    useEffect(() => {
        getAlbum();
    }, [getAlbum])


    if (loading && !album) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className="music__main-album">
            <h2 className="subtitle">Album: {album.name}</h2>

            {album.songs[0].name && 
                <SongsTemp songs={album.songs} type=""/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        album: state.albums.album
    }
}

export default connect(mapStateToProps)(Album);