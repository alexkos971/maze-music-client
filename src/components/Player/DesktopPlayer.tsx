import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import styles from "./Player.module.scss";
import useThrottle from "@hooks/throttle";
import FullPlayer from "./FullPlayer";
import classNames from "classnames";
import { formatTime } from "@utils/formated";
import { DoubleArrowsGray, PauseBlack, PlayBlack, RepeatGray, HeartOutlineGray, HeartSolidGreen, ChevronUpGray } from "@utils/images";
import VolumeGray from "@icons/volume-gray.svg";
import MusicNoteGray from "@icons/note-gray.svg";
import Range from "@components/UI/Range";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setFullplayerExpanded } from "@store/reducers/interfaceReducer";
import { setVolume } from "@store/reducers/playerReducer";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

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

    const internalRef = useRef<HTMLAudioElement>(null)
    useImperativeHandle<HTMLAudioElement | null, HTMLAudioElement | null>(
        ref,
        () => internalRef.current
    );

    const [currentTime, isPlaying, volume, track, fullplayer_is_expanded] = useAppSelector((state : any) => [
        state.player.currentTime, 
        state.player.isPlaying, 
        state.player.volume, 
        state.player.track, 
        state.interface.fullplayer_is_expanded
    ]);

    const changeVolumeHandler = (volumeValue: number) => {
        if (!internalRef) {
            return;
        }
        
        internalRef.current && (internalRef.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
        internalRef.current && (internalRef.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
    }

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


    const NavButtonStyles = 'w-6 h-6 shrink-0 cursor-pointer child:w-6 child:h-6 child:object-contain';

    return (
        <div className={'desktop-player w-full sticky bottom-0 right-0 z-30 mt-auto'}>
            { track ? <FullPlayer/> : <></> }

            <div ref={playerRef} className="pr-container pl-4 py-3 bg-gray-600 flex items-center justify-between w-full">
                {
                    track && 
                    <>
                        <audio 
                            ref={internalRef} 
                            onTimeUpdate={onAudioUpdate} 
                            onLoadedMetadata={metadataLoadHandler} >
                            <source src={track.src} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    
                        <div className="flex items-center">
                            <div className={`w-12 h-12 ml-1 shrink-0 relative bg-red-100 rounded block overflow-hidden text-gray-400 dark:text-gray-200 ${!track.cover?.length ? 'bg-gray-28 ' : ''}`}>
                                { track.cover?.length 
                                    ? <Image src={track.cover} alt="Track's Cover" width={28} height={28} className="relative object-cover object-center w-full h-full"/> 
                                    : <MusicNoteGray className={'w-3 h-3 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}/>
                                }
                            </div>
                            <div className="flex flex-col ml-5">
                                <span className="text-sm text-white whitespace-nowrap line-clamp-1">{track.name}</span> 
                                <Link 
                                    className="text-xs text-gray-300 hover:underline" 
                                    href={`/artist/${track.artist._id}`}>
                                        {track.artist.full_name}
                                </Link>                             
                            </div>
                        </div>
                    </>
                }                

                <div className="flex flex-col items-center w-full max-w-[550px]">
                    {/* Prev - Play - Next */}
                    <div className="flex items-center mb-2">
                        <button 
                            onClick={previousMusicClickHandler}
                            className={twMerge(NavButtonStyles, '-scale-100')}
                            type="button">
                                <DoubleArrowsGray/>
                        </button>

                        <button 
                            className={'w-8 h-8 bg-green-100 rounded-full flex justify-center items-center mx-4 shrink-0 duration-300 active:opacity-80'} 
                            onClick={playClickHandler}>

                            {isPlaying ? <PauseBlack className={'w-4 h-4'}/> : <PlayBlack className={'w-4 h-4'}/>}                                
                        </button>

                        <button 
                            onClick={nextMusicClickHandler}
                            className={NavButtonStyles}
                            type="button">
                            <DoubleArrowsGray />
                        </button>
                    </div>

                    
                    <div className={`flex items-center justify-center relative w-full`}>
                        <span className="text-white text-xs">{formatTime(currentTime)}</span>

                        {/* Progress */}
                        <Range
                            value={currentTime}                                
                            className={'mx-4 w-full'}
                            onMouseUp={() => {
                                setIsDragged(false);
                                
                                if ( internalRef?.current && internalRef?.current?.currentTime != currentTime ) {
                                    internalRef.current.currentTime = currentTime;
                                }
                            }}
                            onMouseDown={() => setIsDragged(true)}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => musicTimeChangeHandler(Number(e.currentTarget.value))}  
                            max={duration} />
                        
                        <span className="text-white text-xs">{formatTime(duration) ?? "00:00"}</span>
                    </div>
                </div>

                {/* Show/Hide  Full Player */}
                <button 
                    onClick={() => {
                        if (track) {
                            dispatch( setFullplayerExpanded(!fullplayer_is_expanded) );                    
                        } 
                    }} 
                    type="button" 
                    className={twMerge(
                        NavButtonStyles,
                        "absolute right-full mr-10",
                        !track && 'opacity-0',
                        fullplayer_is_expanded ? 'scale-y-[-1]' : ''
                    )}>
                    <ChevronUpGray/>
                </button>


                {/* Navigation - Volume/Save/Repeat */}
                <div className={classNames('flex items-center gap-6 shrink-0 ml-10')}>
                    <span className={'flex items-center w-28'}>
                        <span className={NavButtonStyles}>                                                
                            <VolumeGray/>
                        </span>
                        
                        <Range
                            value={volume * 100}
                            min={0}
                            color="gray"
                            max={100}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => changeVolumeHandler(Number(e.target.value))} 
                            className={'ml-2'}
                            />
                    </span>

                    <button 
                        type="button" 
                        disabled={!track}
                        className={NavButtonStyles}
                        onClick={() => saveTrack({
                            track: track, 
                            action: isSaved ? "unsave" : "save"
                        })}    
                    > 
                        {isSaved ? <HeartSolidGreen/> : <HeartOutlineGray/>}
                    </button>

                    <button type="button" onClick={repeatClickHandler} className={NavButtonStyles}>
                        <RepeatGray/>
                    </button>
                </div>                
            </div>
        </div>
    )
});

DesktopPlayer.displayName = 'DesktopPlayer';

export default DesktopPlayer;