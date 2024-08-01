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
import Link from "next/link";

interface MobilePlayerProps {
    duration: number,
    isSaved: boolean,
    saveTrack: any,

    previousMusicClickHandler: any, 
    nextMusicClickHandler: any, 
    playClickHandler: any,
    repeatClickHandler: any,
    shuffleRepeatClickHandler: any
}

const MobilePlayer = forwardRef<HTMLAudioElement, MobilePlayerProps>(function ({
    duration,
    saveTrack,
    isSaved,
    previousMusicClickHandler, nextMusicClickHandler, playClickHandler, repeatClickHandler, shuffleRepeatClickHandler
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
        <div className={classNames(styles['mobile-player'], 'z-20')}>
            { track ? 
                // <div className="fixed top-0 left-0 w-screen h-screen">
                <div className={classNames(
                    'block fixed left-0 top-0 duration-100 w-screen h-screen overflow-y-auto overflow-x-hidden hide-scrollbar',
                    !fullplayer_is_expanded ? 'opacity-0 -z-1 select-none pointer-events-none' : 'z-10'                    
                )}>

                    {/* Clicked Background */}
                    <div 
                        className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,.8)] block"
                        onClick={() => dispatch( setFullplayerExpanded(false) )}
                    ></div>
                    
                    <div 
                        className={classNames(
                            "mt-12 relative z-1 duration-300", 
                            !fullplayer_is_expanded && 'translate-y-full'
                        )}>
                        <FullPlayer/> 
                    </div>
                </div>
                : <></> 
            }            

            <div className="container">
                <div className={styles['mobile-player__wrap']} ref={playerRef}>
                    {/* Click on the background for open full player */}
                    <div 
                        onClick={() => {
                            if (track) {
                                dispatch( setFullplayerExpanded(!fullplayer_is_expanded) )
                                dispatch( setHeaderIsFilled(false) );                        
                            } 
                        }}                    
                        className="absolute w-full h-full"></div>   

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

                    <div className="flex flex-col ml-2">
                        <span className={'text-black text-sm whitespace-nowrap'}>{track.name}</span>
                        <Link href={`/artist/${track.artist._id}`} className={'text-black text-xs whitespace-nowrap font-secondary font-light opacity-80 z-1'}>{track.artist.full_name}</Link>
                    </div>
                                        
                    <button 
                        className={'flex items-center justify-center w-6 h-6 ml-auto z-1'} 
                        onClick={playClickHandler}>
                        {isPlaying ? <PauseBlack/> : <PlayBlack/>}                                
                    </button>

                    <button 
                        type="button" 
                        disabled={!track}
                        className="w-6 h-6 ml-3 mr-4 flex items-center justify-center z-1"
                        onClick={() => saveTrack({
                            track: track, 
                            action: isSaved ? "unsave" : "save"
                        })}    
                    > 
                        {isSaved ? <HeartSolidGreen/> : <HeartOutlineGray/>}
                    </button>

                    {/* <Range
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
                        max={duration} /> */}
                </div>
            </div>
        </div>
    )
});

MobilePlayer.displayName = 'MobilePlayer';

export default MobilePlayer;