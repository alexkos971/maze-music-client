import { useEffect, useRef, useState, forwardRef, ForwardedRef, MutableRefObject } from "react";
import styles from "./Player.module.scss";
import useThrottle from "@hooks/throttle";
import FullPlayer from "./FullPlayer";
import classNames from "classnames";
import { formatTime } from "@helpers/formated";
import { DoubleArrowsGray, PauseBlack, PlayBlack, RepeatGray, HeartOutlineGray, HeartSolidGreen, ChevronUpGray } from "@helpers/images";
import VolumeGray from "@icons/volume-gray.svg";
import Range from "@components/UI/Range";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setFullplayerExpanded, setHeaderIsFilled } from "@store/reducers/interfaceReducer";
import { setIsPlaying, setVolume, setCurrentTime } from "@store/reducers/playerReducer";

interface DesktopPlayerProps {
    duration: number,
    setIsDragged: any,
    isSaved: boolean,
    saveTrack: any,

    metadataLoadHandler: any, 
    onAudioUpdate: any, 
    previousMusicClickHandler: any, 
    nextMusicClickHandler: any, 
    playClickHandler: any,
    repeatClickHandler: any,
    shuffleRepeatClickHandler: any,
    musicTimeChangeHandler: any
}

const DesktopPlayer = forwardRef<HTMLAudioElement, DesktopPlayerProps>(function ({
    duration,
    saveTrack,
    setIsDragged,
    isSaved,
    musicTimeChangeHandler,
    metadataLoadHandler, onAudioUpdate, previousMusicClickHandler, nextMusicClickHandler, playClickHandler, repeatClickHandler, shuffleRepeatClickHandler
}, ref) {
    const dispatch = useAppDispatch();

    const [currentTime, isPlaying, volume, track, fullplayer_is_expanded] = useAppSelector((state : any) => [
        state.player.currentTime, 
        state.player.isPlaying, 
        state.player.volume, 
        state.player.track, 
        state.interface.fullplayer_is_expanded
    ]);

    const changeVolumeHandler = (volumeValue: number) => {
        ref.current && (ref.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
        ref.current && (ref.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
    }

    const [disableKeydown, setDisableKeydown] = useState(false);

    // Keyboard events for player
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

        // if ( !disableKeydown ) {
        //     document.addEventListener("keydown", handler)
        // }

        // return() => {
        //     document.removeEventListener("keydown", handler)
        // }
    }, [isPlaying, currentTime, volume, disableKeydown])

    // Get Height of the Player
    const playerRef = useRef<HTMLDivElement>(null);    
    const [playerHeight, setPlayerHeight] = useState(0);
    let throttledPlayerHeight = useThrottle(playerHeight, 10);

    const resizeHandler = () => {                
        if (playerRef?.current?.clientHeight) setPlayerHeight(playerRef.current.clientHeight);
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--player-height', throttledPlayerHeight + 'px');
      }, [throttledPlayerHeight]);

    useEffect(() => {
        resizeHandler();

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [playerRef]);

    return (
        <div className={styles.player}>

            { track ? <FullPlayer/> : <></> }            

            <div className={styles.player__wrap} ref={playerRef}>
                <div className="container-fluid">
                    <div className={styles.player__inner}>

                        {
                            track && 
                            <audio 
                                ref={ref} 
                                onTimeUpdate={onAudioUpdate} 
                                onLoadedMetadata={metadataLoadHandler} >
                                <source src={track.src} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        }                
                        
                        {/* Prev - Play - Next */}
                        <div className="flex items-center mr-20">
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


                        <div className={`flex items-center justify-center relative w-full max-w-[550px]`}>                            
                            <button 
                                onClick={() => {
                                    if (track) {
                                        dispatch( setFullplayerExpanded(!fullplayer_is_expanded) )
                                        dispatch( setHeaderIsFilled(false) );                        
                                    } 
                                }} 
                                type="button" 
                                className={classNames(
                                    "absolute right-full mr-10",
                                    !track && 'opacity-0',
                                    styles['player-nav-button'],
                                    fullplayer_is_expanded ? 'scale-y-[-1]' : ''
                                    )}>
                                <ChevronUpGray/>
                            </button>
                            
                            {/* Show/Hide  Full Player */}
                            <span className="text-white text-xs">{formatTime(currentTime)}</span>

                            {/* Progress */}
                            <Range
                                value={currentTime}                                
                                className={'mx-4 w-full'}
                                onMouseUp={() => {
                                    setIsDragged(false);
                                    
                                    if ( ref?.current && ref.current.currentTime != currentTime ) {
                                        ref.current.currentTime = currentTime;
                                    }
                                }}
                                onMouseDown={() => setIsDragged(true)}
                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => musicTimeChangeHandler(Number(e.currentTarget.value))}  
                                max={duration} />
                            
                            <span className="text-white text-xs">{formatTime(duration) ?? "00:00"}</span>
                        </div>


                        {/* Navigation - Volume/Save/Repeat */}
                        <div className={classNames(styles['player__nav'], 'ml-10')}>
                            <span className={styles['player-volume']}>
                                <button
                                    className={`${styles['player-nav-button']}`} 
                                    type="button">                    
                                    
                                    <VolumeGray/>
                                </button>
                                
                                <Range
                                    value={volume * 100}
                                    min={0}
                                    color="gray"
                                    max={100}
                                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => changeVolumeHandler(Number(e.target.value))} 
                                    className={styles['player-volume__range']}
                                    />
                            </span>

                            <button 
                                type="button" 
                                disabled={!track}
                                className={`${styles['player-nav-button']}`}
                                onClick={() => saveTrack({
                                    track: track, 
                                    action: isSaved ? "unsave" : "save"
                                })}    
                            > 
                                {isSaved ? <HeartSolidGreen/> : <HeartOutlineGray/>}
                            </button>

                            <button type="button" onClick={repeatClickHandler} className={styles['player-nav-button']}>
                                <RepeatGray/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default DesktopPlayer;