import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import styles from "./Player.module.scss";
import useThrottle from "@hooks/throttle";
import FullPlayer from "./FullPlayer";
import classNames from "classnames";
import { PauseBlack, PlayBlack, HeartOutlineGray, HeartSolidGreen } from "@utils/images";
import MusicNoteGray from "@icons/note-gray.svg";
import Range from "@components/UI/Range";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setFullplayerExpanded, setHeaderIsFilled } from "@store/reducers/interfaceReducer";

interface MobilePlayerProps {
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

const MobilePlayer = forwardRef<HTMLAudioElement, MobilePlayerProps>(function ({
    duration,
    saveTrack,
    setIsDragged,
    isSaved,
    musicTimeChangeHandler,
    metadataLoadHandler, onAudioUpdate, previousMusicClickHandler, nextMusicClickHandler, playClickHandler, repeatClickHandler, shuffleRepeatClickHandler
}, ref) {
    
    const internalRef = useRef<HTMLAudioElement>(null)
    useImperativeHandle<HTMLAudioElement | null, HTMLAudioElement | null>(
        ref,
        () => internalRef.current
    );

    const dispatch = useAppDispatch();

    const [currentTime, isPlaying, volume, track, fullplayer_is_expanded] = useAppSelector((state : any) => [
        state.player.currentTime, 
        state.player.isPlaying, 
        state.player.volume, 
        state.player.track, 
        state.interface.fullplayer_is_expanded
    ]);

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
        <div className={styles['mobile-player']}>

            { track ? <FullPlayer/> : <></> }            

            <div className="container">
                <div 
                    className={styles['mobile-player__wrap']} 
                    ref={playerRef} 
                    onClick={() => {
                        if (track) {
                            dispatch( setFullplayerExpanded(!fullplayer_is_expanded) )
                            dispatch( setHeaderIsFilled(false) );                        
                        } 
                    }}>

                    {
                        track && 
                        <audio 
                            ref={internalRef} 
                            onTimeUpdate={onAudioUpdate} 
                            onLoadedMetadata={metadataLoadHandler} >
                            <source src={track.src} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    }     

                    <div className="w-12 h-12 flex-shrink-0 overflow-hidden">
                        {!track?.cover 
                            ? <Image 
                                className="w-full h-full object-cover"
                                src={track.cover} 
                                alt="Cover" 
                                width={44} 
                                height={44}
                                /> 
                            : 
                                <div className="w-full h-full bg-black-36 relative">
                                    <MusicNoteGray className={'w-4 h-4 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}/>
                                </div>
                            }
                    </div> 

                    <div className="flex flex-col ml-3">
                        <span className={'text-black text-sm whitespace-nowrap'}>{track.name}</span>
                        <span className={'text-black text-xs whitespace-nowrap font-secondary font-light opacity-80'}>{track.artist.full_name}</span>
                    </div>
                                        
                    <button 
                        className={'flex items-center justify-center w-6 h-6 ml-auto'} 
                        onClick={playClickHandler}>
                        {isPlaying ? <PauseBlack/> : <PlayBlack/>}                                
                    </button>

                    <button 
                        type="button" 
                        disabled={!track}
                        className="w-6 h-6 ml-3 mr-4 flex items-center justify-center"
                        onClick={() => saveTrack({
                            track: track, 
                            action: isSaved ? "unsave" : "save"
                        })}    
                    > 
                        {isSaved ? <HeartSolidGreen/> : <HeartOutlineGray/>}
                    </button>

                    <Range
                        value={currentTime}                                
                        className={classNames(styles['mobile-player__progress'], styles['progress'])}
                        onMouseUp={() => {
                            setIsDragged(false);
                            
                            if ( internalRef?.current && internalRef.current.currentTime != currentTime ) {
                                internalRef.current.currentTime = currentTime;
                            }
                        }}
                        onMouseDown={() => setIsDragged(true)}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => musicTimeChangeHandler(Number(e.currentTarget.value))}  
                        max={duration} />
                </div>
            </div>
        </div>
    )
});

MobilePlayer.displayName = 'MobilePlayer';

export default MobilePlayer;