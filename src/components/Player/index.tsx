import React, { useState, useEffect } from "react";
import styles from "./Player.module.scss";
import Image from "next/image";
import { DoubleArrowsGray, PauseBlack, PlayBlack, RepeatGray, HeartOutlineGray, HeartSolidGreen, VolumeGray, ChevronUpGray } from "@helpers/images";
import FullPlayer from "./FullPlayer";

let audio : null | HTMLAudioElement = null;

const Player = () => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    let [isPlayed, setIsPlayed] = useState(false);
    const [stateVolume, setStateVolume] = useState(40);
    const [inputProgress, setInputProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(10);

    const song = {
        src: 'https://cdn1.sefon.pro/prev/LkhjDStiRNwenuvKXaqQWg/1699836120/3/Paramore%20-%20Decode%20%28OST%20%D0%A1%D1%83%D0%BC%D0%B5%D1%80%D0%BA%D0%B8%29%20%28192kbps%29.mp3'
    }

    const setAudio = () => {
        setInputProgress(0);

        if (song?.src) {

            if (!audio) {
                audio = new Audio();
            }
    
            audio.src = song.src;
            audio.volume = stateVolume / 100;

            audio.onloadedmetadata = () => {
                audio.ontimeupdate = (e) => {
                    setInputProgress((audio.currentTime * 100) / audio.duration);
                    setDuration(audio.currentTime);
                }
                
                audio.onended = () => {
                    setInputProgress(0)
                    onStartPlay();
                }
            }
            onStartPlay();
        }    
    }
    
    useEffect(() => {
        setAudio();
    }, [song.src]);

    const playSong = () => {
        if (song?.src && audio) {
            setIsPlayed(!isPlayed);
        }
    }
    
    let onStartPlay = (action?: boolean ) => {
        if (audio) {
            if (action !== undefined) {
                return !action ? audio.pause() : audio.play();  
            }
            return !isPlayed ? audio.play() : audio.pause();  
        }
    }    
    
    useEffect(() => {
        if (audio) {
            onStartPlay();
        }
    }, [isPlayed]);

    // Volume
    useEffect(() => {
        if (audio) {
            audio.volume = volume / 100;
        }
    }, [volume]);

    // User handled
    const handleProgress = (e) => {
        if (song.src && audio) {
            let compute = (e.target.value * audio.duration) / 100;
            setDuration(compute);
            setInputProgress(e.target.value)
            audio.currentTime = compute;
        }
    }

    return (
        <div className="player container-fluid py-3 bg-black-06 flex items-center sticky bottom-0 right-0 z-20">
            { isExpanded ? <FullPlayer/> :'' }
            
            {/* Prev - Play - Next */}
            <div className="flex items-center">
                <button 
                    className={`${styles['player-nav-button']} ${styles['player-nav-button_prev-track']}`}
                    type="button">
                        <Image src={DoubleArrowsGray} alt="Prev Track" />
                </button>

                <button 
                    className={`track__button w-8 h-8 mx-4 bg-green-05 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:block`} 
                    onClick={() => playSong()}>
                    <Image src={isPlayed ? PauseBlack : PlayBlack} width={0} height={0} alt="Play" className="w-5 h-5"/>
                </button>

                <button 
                    className={styles['player-nav-button']}
                    type="button">
                        <Image src={DoubleArrowsGray} alt="Next Track" />
                </button>
            </div>

            {/* Show/Hide  Full Player */}
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                type="button" 
                className={`player-expand ml-16 duration-200 ${styles['player-nav-button']} ${isExpanded ? 'scale-y-[-1]' : ''}`}>
                <Image src={ChevronUpGray} alt="Expand Player"/>
            </button>

            {/* Progress */}
            <div className={`player-progress mx-auto flex items-center justify-center w-full`}>
                <span className="text-white text-xs">0:00</span>

                 <div className={`${styles['player-progress__wrap']}`} style={{'--track-progress' : inputProgress + '%'} as React.CSSProperties}>
                    <input value={inputProgress ?? 0} onChange={handleProgress} className={`${styles['player-progress__input']}`} type="range" name="track-progress" />
                </div>   
                
                <span className="text-white text-xs">3:12</span>
            </div>

            {/* Volume/Save/Repeat */}
            <div className="flex items-center gap-6 shrink-0">
                <span className={styles['player-volume']}>
                    <button
                        className={`${styles['player-nav-button']}`} 
                        type="button">                    
                        
                        <Image src={VolumeGray} alt="Volume"/>                    
                    </button>
                    
                    <span className={styles['player-volume__input']} style={{'--track-volume': volume + '%'} as React.CSSProperties}>
                        <input value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} type="range" name="track-volume" />
                    </span>
                </span>

                <button
                    className={`${styles['player-nav-button']}`} 
                    type="button">                    
                    <Image src={true ? HeartOutlineGray : HeartSolidGreen} alt="Heart Icon"/>
                </button>

                <button type="button" className={styles['player-nav-button']}>
                    <Image src={RepeatGray} alt="Repeat" />
                </button>
            </div>
        </div>
    );
}

export default Player;