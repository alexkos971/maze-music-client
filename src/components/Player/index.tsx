import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import formatSecond from "@helpers/format-seconds";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setCurrentTime, setVolume, setIsPlaying } from "@store/reducers/playerReducer";

import styles from "./Player.module.scss";
import { DoubleArrowsGray, PauseBlack, PlayBlack, RepeatGray, HeartOutlineGray, HeartSolidGreen, VolumeGray, ChevronUpGray } from "@helpers/images";
import FullPlayer from "./FullPlayer";
import Range from "@components/ui/Range";

const Player = () => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    
    const [currentTime, isPlaying, volume, track] = useAppSelector(state => [state.player.currentTime, state.player.isPlaying, state.player.volume, state.player.track]);
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
            document.addEventListener("keydown", handler)
        }

        return() => {
            document.removeEventListener("keydown", handler)
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

    const nextMusicClickHandler = () => changeTrack("next", false)

    return (
        <div className={`${styles['player']} container-fluid`}>
            { isExpanded ? <FullPlayer/> :'' }

            {
                track 
                && <audio 
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
                        <Image src={DoubleArrowsGray} alt="Prev Track" />
                </button>

                <button 
                    className={styles['player-play-button']} 
                    onClick={playClickHandler}>
                    <Image src={isPlaying ? PauseBlack : PlayBlack} width={0} height={0} alt="Play"/>
                </button>

                <button 
                    onClick={nextMusicClickHandler}
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
                <span className="text-white text-xs">{formatSecond(currentTime)}</span>

                <Range
                    value={currentTime}
                    className={'mx-4 max-w-[480px]'}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => musicTimeChangeHandler(Number(e.currentTarget.value))}  
                    max={duration} />
                
                <span className="text-white text-xs">{formatSecond(duration) ?? "00:00"}</span>
            </div>

            {/* Volume/Save/Repeat */}
            <div className="flex items-center gap-6 shrink-0">
                <span className={styles['player-volume']}>
                    <button
                        className={`${styles['player-nav-button']}`} 
                        type="button">                    
                        
                        <Image src={VolumeGray} alt="Volume"/>                    
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
                    <Image src={true ? HeartOutlineGray : HeartSolidGreen} alt="Heart Icon"/>
                </button>

                <button type="button" onClick={repeatClickHandler} className={styles['player-nav-button']}>
                    <Image src={RepeatGray} alt="Repeat" />
                </button>
            </div>
        </div>
    );
}

export default Player;