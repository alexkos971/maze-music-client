import React, { useState, useCallback, useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHttp } from "../../../../hooks/http.hook";

import SongsTemp from "../../SongsTemp"; 
import Preloader from "../../../Preloader";
import './Album.scss';

const Album = ({ albums }) => {
    const [album, setAlbum] = useState(null);

    let id = useParams().id;
    const { request, loading } = useHttp();

    const getAlbum = async () => {
        const data = await request(`/api/albums/album/${id}`, 'GET');
        if (data) {
            setAlbum(data)
        }
    }

    useEffect(() => {
        getAlbum();
    }, [request])

    if (!album) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className="music__main-album">
            <h2 className="subtitle">Album: {album.name}</h2>

            <SongsTemp songs={album.songs}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        albums: state.profile.profile.albums
    }
}

export default connect(mapStateToProps)(Album);