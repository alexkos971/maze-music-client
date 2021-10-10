import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { setNowAlbum } from "../../redux/actions/albumsActions";

import SongsTemp from "../../components/SongsTemp"; 
import Preloader from "../../components/Preloader";

const Album = ({ dispatch, album, loading }) => {

    let id = useParams().id;

    useEffect(() => {
        dispatch(setNowAlbum(id));
    }, [])


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
        album: state.albums.album,
        loading: state.interface.loading
    }
}

export default connect(mapStateToProps)(Album);