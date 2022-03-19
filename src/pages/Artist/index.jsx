import React, { useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import { connect } from "react-redux";

import SongsTemp from "../../components/SongsTemp"
import CardsTemp from "../../components/CardsTemp";
import Preloader from "../../components/Preloader";
import Button from "../../components/Button";
import PrevPage from "../../components/PrevPage";

import { apiUrl } from '../../config/constants'

import { getArtist } from '../../redux/actions/artistsActions';

const Artist = ({ dispatch, loading, artist, recomendArtists }) => {
    let id = useParams().id;

    useEffect(() => {
        dispatch(getArtist(id));
    }, [getArtist])
    

    if (loading) {
        return (
            <Preloader/>
        );
    }

        
    return (
        <div className="music__main-artist">

            <div className="music__main-artist-header">
                
                <PrevPage/>

                <div className="music__main-artist-header-desc">

                    <h1 className="music__main-artist-header-desc-name">{artist.name}</h1>
                    <span className="music__main-artist-header-desc-about">{artist.description}</span>

                    <div className="music__main-artist-header-desc-info">
                        {
                            artist.tags ?
                            artist.tags.map((item, index) => 
                                <Link className="music__main-artist-header-desc-info-genre" to={`/Genre/${item.name}`} key={index}>
                                    {item.name}
                                </Link>
                            ) : 
                            <span className="music__main-artist-header-desc-info-genre">{'No Genre'}</span>
                        }

                            <span className="middot">&middot;</span>

                            {/* <span className="music__main-artist-header-desc-info-listeners">{(artist.listenings/100000).toFixed(1)}M listeners</span> */}
                            <span className="music__main-artist-header-desc-info-listeners">69M listeners</span>

                            <span className="middot">&middot;</span>
                            
                            {/* <span className="music__main-artist-header-desc-info-albums">{artist.albums.length && artist.albums.length} albums</span> */}
                            <span className="music__main-artist-header-desc-info-albums">14 albums</span>
                    </div>
                    
                    <div className="music__main-artist-header-desc-btns">
                        <Button 
                            type="button"
                            subClass="dark mr-20"
                            onClick={() => alert('follow')}
                            text={
                                <>
                                    <i className="fas fa-bookmark"></i>
                                    <span>Follow</span>
                                </>
                            }/>
                        
                        <Button 
                            type="button"
                            onClick={() => alert('lister')}
                            text={
                                <>
                                    <i className="fas fa-play"></i>
                                    <span className='ml-12'>Listen</span>
                                </>
                            }/>
                    </div>
                </div>

                {
                    artist.avatar ?
                        <div className="music__main-artist-header-avatar">
                            <img src={apiUrl + artist.avatar} alt=""/>
                        </div>
                    : null
                }
            </div>
            
            <div className="music__main-artist-albums">
            { recomendArtists.length && 
                <div>
                    <h2 className="subtitle">Artists for you</h2>

                    <CardsTemp items={recomendArtists} to="Artists"/>
                </div>
            }
            </div> 

            <div className="music__main-artist-songs">
                <h2 className="subtitle">Most popular songs</h2>
                { (artist && artist.songs) ?
                    <SongsTemp songs={artist.songs}/>:
                    <h2 className="music__main-subtitle">This artists no have songs</h2>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        artist: state.artists.artist,
        recomendArtists: state.artists.recomendArtists,
        loading: state.interface.loading
    }
}

export default connect(mapStateToProps)(Artist);