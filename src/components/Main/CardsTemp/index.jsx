import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Axios from "../../../core/axios";

import { changeDir, setNowAlbum, setProfile, getMyAlbums } from "../../../redux/actions";
import { useMessage } from "../../../hooks/message.hook";

import "./CardsTemp.scss";
import { leftIcon, rightIcon } from '../images';

const CardsTemp = ({dispatch, items, to, start, my, profile, myAlbums }) => {
    const message = useMessage();


    const deleteAlbum = async album => {
        let question = window.confirm(`Are you sure delete album [${album.name}] ?`)

        
        if (question) {
            try {

            await Axios.delete(`/api/albums/delete/${album._id}`)
                .then(async data => {
                    if (data.statusText == 'OK') {
                        message(data.message)
                        const newAlbums = await myAlbums.filter(el => el !== album._id);
                        dispatch(getMyAlbums(newAlbums))
                    }
                })
            }
            catch (e) {
                console.log(e)
            }
        }
    }


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
        infinite: false,
        speed: 500,
        prevArrow: <SlickArrowLeft/>,
        nextArrow: <SlickArrowRight/>,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    if (to === "Artists") {
        return (
            <div className="music__main-slider">

                <span className="music__main-slider-view">View all</span>
                 <Slider {...settings}>
                    {items.map((item, index) => 
                        <div className="music__main-slider-item" key={index}>
                            <Link to={"/Artist/" + item._id}>
                                <div className="music__main-slider-item-wrap">
                                        <img src={item.avatar} alt="" className="slider_img" />

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
                        <div className="music__main-slider-item" 
                                key={item.name}  
                                onClick={() => {
                                dispatch(setNowAlbum(item))}
                                // dispatch(changeDir("Album"))}
                            }>

                                <div className={`music__main-slider-item-hover jc-c`}>
                                    <span className="music__main-slider-item-hover-play">
                                        <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`}></i>
                                    </span>
    
                                    {my && <span className="music__main-slider-item-hover-trash" onClick={() => deleteAlbum(item)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </span>}
                                </div>
    
                            <Link to={"/Album/" + item._id}>
                                <div className="music__main-slider-item-wrap">
                                        <img src={item.cover} alt="" className="music__main-slider-item-wrap-img slider_img" />

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
}

const mapStateToProps = (state) => {
    return { 
        start: state.onPlay.start,
        song: state.onPlay.song,
        profile: state.profile,
        myAlbums: state.profile.albums
    }
}

export default connect(mapStateToProps)(CardsTemp)