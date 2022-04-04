import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { apiUrl } from '../../config/constants'
import { changeDir } from "../../redux/actions/interfaceActions";
import { deleteAlbum } from "../../redux/actions/albumsActions";
import { getNickByAvatar } from "../../redux/actions/profileActions";
import { playAlbum } from "../../redux/actions/playActions";

import { leftIcon, rightIcon } from '../images';

const CardsTemp = ({dispatch, items, to, start, my, myAlbums, collapsed }) => {


    
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <div
            {...props}
            className={
              "slick-prev slick-arrow" +
              (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}>

            <img src={leftIcon} alt="left-con"/>
        </div>
    )
    
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <div
            {...props}
            className={
              "slick-next slick-arrow" +
              (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}>
            <img src={rightIcon} alt="right-con"/>
        </div>
    )

     // For slider
     const settings = {
        dots: true,
        infinite: items.length > 3 ? true : false,
        speed: 500,
        prevArrow: <SlickArrowLeft/>,
        nextArrow: <SlickArrowRight/>,
        arrows: true,
        variableWidth: true,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    if (to === "Artists") {
        return (
            <div className="music__main-slider">

                <span className="music__main-slider-view">View all</span>
                 <Slider {...settings}>
                    {items.map((item, index) => 
                        <div className={`music__main-slider-item ${collapsed ? 'large' : ''}`} key={index} onClick={() => dispatch(changeDir({name: 'Artist', path: '/artist'}))}>
                            <Link to={"/artist/" + item._id}>
                                <div className="music__main-slider-item-wrap">
                                        {item.avatar?.length ?
                                            <img src={apiUrl +item.avatar} alt="" className="slider_img" />
                                            :
                                            <div className="music__main-slider-item-wrap-nick">
                                                <span>{getNickByAvatar(item.name)}</span>
                                            </div>
                                        }

                                    <div className="music__main-slider-item-wrap-text">        
                                        <h2 className="music__main-slider-item-wrap_artist">{item.name}</h2>
        
                                        <div className="music__main-slider-item-wrap_desk">
                                            <span>{item.albums.length} Albums | </span>
                                            <span>{(item.listenings/100000).toFixed(1)}M Followers</span> 
                                        </div>    
                                    </div>
                                </div>     
                            </Link>    
                        </div> 
                    )}
                </Slider>
            </div>
        )
    }
    else if (to === "Albums") {
        return (
            <div className="music__main-slider artist">
          
                <span className="music__main-slider-view">View all</span>
                
                 <Slider {...settings}>
                    {items.map(item => 
                    <div className={`music__main-slider-item ${collapsed ? 'large' : ''}`}
                        key={item.name}  
                        onClick={() => dispatch(changeDir({name: 'Album', path: '/album'}))}>

                        <Link to={"/album/" + item._id}>

                                <div className={`music__main-slider-item-hover jc-c`}>
                                    <span className="music__main-slider-item-hover-play" onClick={() => dispatch(playAlbum(item))}>
                                        <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`}></i>
                                    </span>
    
                                    {my && <span className="music__main-slider-item-hover-trash" onClick={() => dispatch(deleteAlbum(item._id, item.name))}>
                                        <i className="fas fa-trash-alt"></i>
                                    </span>}
                                </div>
    
                                <div className="music__main-slider-item-wrap">
                                    <img src={apiUrl + item.cover} alt="" className="music__main-slider-item-wrap-img slider_img"/>

                                    <div className="music__main-slider-item-wrap-text">
                                        <h2 className="music__main-slider-item-wrap_artist">{item.name}</h2>

                                        <div className="music__main-slider-item-wrap_desk">
                                            <span>{item.listenings} listeners | </span>
                                            <span>{item.songs.length} tracks</span> 
                                        </div>   
                                    </div>
                                </div>
                        </Link>        
                    </div> 
                    )}
                </Slider>
            </div>
        )
    }
    else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return { 
        start: state.onPlay.start,
        song: state.onPlay.song,
        profile: state.profile,
        collapsed: state.interface.sidebarCollapsed,
        myAlbums: state.profile.albums
    }
}

export default connect(mapStateToProps)(CardsTemp)