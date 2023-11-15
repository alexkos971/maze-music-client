import React, { useState, useEffect, useRef, RefObject } from "react";
import formatSecond from "@helpers/format-seconds";
import styles from "./Player.module.scss";
import Image from "next/image";
import { DoubleArrowsGray, PauseBlack, PlayBlack, RepeatGray, HeartOutlineGray, HeartSolidGreen, VolumeGray, ChevronUpGray } from "@helpers/images";
import FullPlayer from "./FullPlayer";

const Player = () => {
    const [ isExpanded, setIsExpanded ] = useState(false);

    // const [currentTime, setCurrentTime, isPlaying, setIsPlaying, volume, setVolume, changeMusic, repeatType, setRepeat, disableKeydown] = useAppStore(state => [state.currentMusicTime, state.setCurrentMusicTime, state.isPlaying, state.setPlayingState, state.volume, state.setVolume, state.changeMusic, state.repeatType, state.setRepeatType, state.disableKeyDown])
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    
    const [track, setTrack] = useState<{src: string}>({
        src: 'https://cdn6.sefon.pro/prev/1_g6J1XUbWkvypx60Kw2RQ/1700126692/3/Paramore%20-%20Decode%20%28OST%20%D0%A1%D1%83%D0%BC%D0%B5%D1%80%D0%BA%D0%B8%29%20%28192kbps%29.mp3'
    });
    
    // move to redux
    const changeTrack = (direction : 'next' | 'prev', auto?: boolean ) => {
        // setTrack({ src:  });
        return 'sdsds';
    };

    const [repeatType, setRepeat] = useState('all');
    const [disableKeydown, setDisableKeydown] = useState(false);
    

    const [duration, setDuration] = useState<number>(0);
    const [repeatOnce, setRepeatOnce] = useState<boolean | null>(false);
    const ref = useRef<HTMLAudioElement>(null);

    // const [messageApi, contextHolder] = message.useMessage()

    const changeVolumeHandler = (volumeValue: number) => {
        ref.current && (ref.current.volume = volumeValue);
        setVolume(volumeValue);
    }


    useEffect(() => {
        const handler = (e: KeyboardEventInit) => {
            const keyPressedCode : string = e.code ? e.code.toLowerCase() : ""

            const event = e as any;
            if ( !["f5", "keyr", "keyj"].includes(keyPressedCode) ) event.preventDefault();

            if ( keyPressedCode === "space" ) {
                if ( isPlaying ) {
                    setIsPlaying(false)
                } else {
                    setIsPlaying(true)
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
                    setCurrentTime(newCurrentTime)
                }
            } else if ( keyPressedCode === "arrowup" ) {
                const newVal = volume + 0.2 > 1 ? 1 : volume + 0.2
                ref.current && (ref.current.volume = newVal);
                setVolume(newVal);
            } else if ( keyPressedCode === "arrowdown" ) {
                const newVal = volume - 0.2 < 0 ? 0 : volume - 0.2
                ref.current && (ref.current.volume = newVal);
                setVolume(newVal)
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
            ref.current.currentTime = currentTime
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

        else if (ref.current) setCurrentTime(ref.current.currentTime) 
    }

    const playClickHandler = () => {
        if ( track ) {
            if ( !isPlaying ) setIsPlaying(true)
            else setIsPlaying(false)
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
            setCurrentTime(0);
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
                    className={`track__button w-8 h-8 mx-4 bg-green-05 rounded-full flex items-center justify-center group-hover:opacity-100 group-hover:block`} 
                    onClick={playClickHandler}>
                    <Image src={isPlaying ? PauseBlack : PlayBlack} width={0} height={0} alt="Play" className="w-5 h-5"/>
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

                 <div className={`${styles['player-progress__wrap']}`} style={{'--track-progress' : ((currentTime !== 0 && duration !== 0) ? ((currentTime / duration) * 100) : 0) + '%'} as React.CSSProperties}>
                    <input 
                        value={currentTime} 
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => musicTimeChangeHandler(Number(e.currentTarget.value))} 
                        max={duration} 
                        className={`${styles['player-progress__input']}`} 
                        type="range" 
                        name="track-progress" />
                </div>   
                
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
                    
                    <span className={styles['player-volume__input']} style={{'--track-volume': (volume !== 0 ? volume * 100 : 0) + '%'} as React.CSSProperties}>
                        <input 
                            min={0}
                            max={100}
                            value={volume * 100} 
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => changeVolumeHandler(Number(e.target.value) / 100)} 
                            type="range" 
                            name="track-volume" />
                    </span>
                </span>

                <button
                    className={`${styles['player-nav-button']}`} 
                    type="button">                    
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