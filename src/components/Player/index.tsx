import React, { useState, useEffect, useRef } from "react";
import {formatSecond} from "@helpers/formated";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setCurrentTime, setVolume, setIsPlaying } from "@store/reducers/playerReducer";
import { setFullplayerExpanded, setHeaderIsFilled } from "@store/reducers/interfaceReducer";

import styles from "./Player.module.scss";
import { DoubleArrowsGray, PauseBlack, PlayBlack, RepeatGray, HeartOutlineGray, HeartSolidGreen, VolumeGray, ChevronUpGray } from "@helpers/images";
import FullPlayer from "./FullPlayer";
import Range from "@components/ui/Range";
import { useThrottle } from "@hooks/listeners";

const Player = () => {
    
    const [currentTime, isPlaying, volume, track, fullplayer_is_expanded, header_is_filled] = useAppSelector(state => [state.player.currentTime, state.player.isPlaying, state.player.volume, state.player.track, state.interface.fullplayer_is_expanded, state.interface.header_is_filled]);
    const dispatch = useAppDispatch(); 
    
    // move to redux
    const changeTrack = (direction : 'next' | 'prev', auto?: boolean ) => {
        return 'sdsds';
    };

    const [repeatType, setRepeat] = useState('all');
    const [disableKeydown, setDisableKeydown] = useState(false);
    

    const [duration, setDuration] = useState<number>(0);
    const [repeatOnce, setRepeatOnce] = useState<boolean | null>(false);
    const ref = useRef<HTMLAudioElement>(null);

    // const [messageApi, contextHolder] = message.useMessage()

    const changeVolumeHandler = (volumeValue: number) => {
        ref.current && (ref.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
        ref.current && (ref.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
    }


    useEffect(() => {
        const handler = (e: KeyboardEventInit) => {
            const keyPressedCode : string = e.code ? e.code.toLowerCase() : ""

            const event = e as any;
            if ( !["f5", "keyr", "keyj"].includes(keyPressedCode) ) event.preventDefault();

            if ( keyPressedCode === "space" ) {
                if ( isPlaying ) {
                    dispatch(setIsPlaying(false));
                } else {
                    dispatch(setIsPlaying(true));
                }
            } else if ( keyPressedCode === "arrowleft" ) {
                const newCurrentTime = currentTime - 5

                if ( newCurrentTime < 0 ) {
                    changeTrack("prev");
                } else {
                    ref.current && (ref.current.currentTime = newCurrentTime);
                    setCurrentTime(newCurrentTime)
                }
            } else if ( keyPressedCode === "arrowright" ) {
                const newCurrentTime = currentTime + 5

                if ( newCurrentTime > duration ) {
                    changeTrack("next", true);
                } else {
                    ref.current && (ref.current.currentTime = newCurrentTime);
                    dispatch(setCurrentTime(newCurrentTime));
                }
            } else if ( keyPressedCode === "arrowup" ) {
                const newVal = volume + 0.2 > 1 ? 1 : volume + 0.2
                ref.current && (ref.current.volume = newVal);
                dispatch(setVolume(newVal));
            } else if ( keyPressedCode === "arrowdown" ) {
                const newVal = volume - 0.2 < 0 ? 0 : volume - 0.2
                ref.current && (ref.current.volume = newVal);
                dispatch(setVolume(newVal));
            }
        } 

        if ( !disableKeydown ) {
            // document.addEventListener("keydown", handler)
        }

        return() => {
            // document.removeEventListener("keydown", handler)
        }
    }, [isPlaying, currentTime, volume, disableKeydown])

    useEffect(() => {
        if ( track && ref.current) {
            ref.current.src = track.src;
            ref.current.currentTime = currentTime;
            ref.current.volume = volume;
            if ( !isPlaying ) {
                ref.current.pause();
            } else {
                ref.current.play();
            }
            
        }
    }, [track, isPlaying]);

    const musicTimeUpdateHandler = () => {
        if ( ref.current && ref.current.currentTime === duration ) changeTrack("next", true);

        else if (ref.current) dispatch(setCurrentTime(ref.current.currentTime)); 
    }

    const playClickHandler = () => {
        if ( track ) {
            if ( !isPlaying ) dispatch(setIsPlaying(true));
            else dispatch(setIsPlaying(false));
        }
    }

    const musicTimeChangeHandler = (time: number) => {
        ref.current && (ref.current.currentTime = time);
    }

    const metadataLoadHandler = () => {
        ref.current && setDuration(ref.current.duration);
    }

    const repeatClickHandler = () => {
        if ( repeatType === "shuffle" ) {
            // messageApi.open({
            //     type: "error",
            //     content: "You must turn off shuffle repeat"
            // })
            return
        }

        let content : string = "Repeat Musics turned off"
        if ( repeatOnce === null ) {
            setRepeat("all")
            setRepeatOnce(false)
            content = "Repeat all Musics turned on"
        } else if ( repeatOnce ) {
            setRepeat("off")
            setRepeatOnce(null);
        } else {
            setRepeat("once");
            setRepeatOnce(true);
            content = "Repeat one Music turned on";
        }

        // messageApi.open({
        //     type: "success",
        //     content
        // })
    }

    const shuffleRepeatClickHandler = () => {
        let content : string = "Suffle repeat truned on"
        if ( repeatType === "shuffle" ) {
            if ( repeatOnce === null ) {
                setRepeat("off")
                content = "Repeat Musics turned off"
            } else if ( repeatOnce ) {
                setRepeat("once")
                content = "Repeat one Music turned on"
            } else {
                setRepeat("all")
                content = "Repeat all Musics turned on"
            }
        } else {
            setRepeat("shuffle")
        }

        // messageApi.open({
        //     type: "success",
        //     content
        // });
    }

    const previousMusicClickHandler = () => {
        if ( currentTime < 3 ) {
            changeTrack("prev");
        } else {
            ref.current && (ref.current.currentTime = 0);
            dispatch(setCurrentTime(0));
        }
    }

    const nextMusicClickHandler = () => changeTrack("next", false);


    // Get Height of the Player
    const playerRef = useRef<HTMLDivElement>(null);    
    useEffect(() => {
        const resizeHandler = () => {        
            playerRef?.current?.clientHeight ? document.documentElement.style.setProperty('--player-height', playerRef.current.clientHeight + 'px') : false;
        }
        resizeHandler();

        window.addEventListener('resize', useThrottle(resizeHandler, 70));

        return () => window.removeEventListener('resize', resizeHandler);
    }, [playerRef]);

    return (
        <div className={styles.player}>
            <FullPlayer/>

            <div className={styles.player__wrap} ref={playerRef}>
                <div className="container-fluid">
                    <div className={styles.player__inner}>

                        {
                            track && 
                            <audio 
                                ref={ref} 
                                onTimeUpdate={musicTimeUpdateHandler} 
                                onLoadedMetadata={metadataLoadHandler} >
                                <source src={track.src} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        }                
                        
                        {/* Prev - Play - Next */}
                        <div className="flex items-center">
                            <button 
                                onClick={previousMusicClickHandler}
                                className={`${styles['player-nav-button']} ${styles['player-nav-button_prev-track']}`}
                                type="button">
                                    <DoubleArrowsGray/>
                            </button>

                            <button 
                                className={styles['player-play-button']} 
                                onClick={playClickHandler}>
                                {isPlaying ? <PauseBlack/> : <PlayBlack/>}                                
                            </button>

                            <button 
                                onClick={nextMusicClickHandler}
                                className={styles['player-nav-button']}
                                type="button">
                                <DoubleArrowsGray />
                            </button>
                        </div>

                        {/* Show/Hide  Full Player */}
                        <button 
                            onClick={() => {
                                dispatch( setFullplayerExpanded(!fullplayer_is_expanded) )
                                dispatch( setHeaderIsFilled(false) );                        
                            }} 
                            type="button" 
                            className={`player-expand ml-16 duration-200 ${styles['player-nav-button']} ${fullplayer_is_expanded ? 'scale-y-[-1]' : ''}`}>
                            <ChevronUpGray/>
                        </button>

                        {/* Progress */}
                        <div className={`player-progress mx-auto flex items-center justify-center w-full`}>
                            <span className="text-white text-xs">{formatSecond(currentTime)}</span>

                            <Range
                                value={currentTime}
                                className={'mx-4 max-w-[480px]'}
                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => musicTimeChangeHandler(Number(e.currentTarget.value))}  
                                max={duration} />
                            
                            <span className="text-white text-xs">{formatSecond(duration) ?? "00:00"}</span>
                        </div>

                        {/* Navigation - Volume/Save/Repeat */}
                        <div className={styles['player__nav']}>
                            <span className={styles['player-volume']}>
                                <button
                                    className={`${styles['player-nav-button']}`} 
                                    type="button">                    
                                    
                                    <VolumeGray alt="Volume"/>                    
                                </button>
                                
                                <Range
                                    value={volume * 100}
                                    min={0}
                                    color="gray"
                                    max={100}
                                    withThumb={false}
                                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => changeVolumeHandler(Number(e.target.value))} 
                                    className={styles['player-volume__range']}
                                    />
                            </span>

                            <button type="button" className={`${styles['player-nav-button']}`}> 
                                {true ? <HeartOutlineGray/> : <HeartSolidGreen/>}
                            </button>

                            <button type="button" onClick={repeatClickHandler} className={styles['player-nav-button']}>
                                <RepeatGray/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;