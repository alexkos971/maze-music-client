import React from 'react';
import { connect } from 'react-redux';

import Preloader from "../../components/Preloader";
import Button from "../../components/Button";
import SongsTemp from "../../components/SongsTemp";

import { setSavedSongs } from "../../redux/actions/profileActions";

const Songs = ({ savedSongs }) => {

    if (!savedSongs) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className="music__main-saved-songs">
            <div className="music__main-saved-songs-head">
                <h2 className="subtitle">Saved songs</h2>

                <div className="music__main-saved-songs-head-sort">
                    <span>Sort by: </span>
                    <Button type="select" list={['Last added', 'Older', 'Name']}/>
                </div>
            </div>

                {savedSongs && savedSongs.length > 0 ?
                    <SongsTemp songs={savedSongs} setSongs={setSavedSongs} type="Saved"/>
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