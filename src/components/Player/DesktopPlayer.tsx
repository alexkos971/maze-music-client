import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import useThrottle from "@hooks/throttle";
import FullPlayer from "./FullPlayer";
import classNames from "classnames";
import { RepeatGray, HeartOutlineGray, HeartSolidGreen, ChevronUpGray } from "@utils/images";
import MusicNoteGray from "@icons/note-gray.svg";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setFullplayerExpanded } from "@store/reducers/interfaceReducer";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import ProgressBar from "./controls/ProgressBar";
import NavBar from "./controls/NavBar";
import VolumeBar from "./controls/VolumeBar";

interface DesktopPlayerProps {
    duration: number,
    isSaved: boolean,
    saveTrack: any,

    previousMusicClickHandler: any, 
    nextMusicClickHandler: any, 
    playClickHandler: any,
    repeatClickHandler: any,
    shuffleRepeatClickHandler: any
}

const DesktopPlayer = forwardRef<HTMLAudioElement, DesktopPlayerProps>(function ({
    saveTrack,
    isSaved,
    repeatClickHandler
}, ref) {
    const dispatch = useAppDispatch();

    const internalRef = useRef<HTMLAudioElement>(null)
    useImperativeHandle<HTMLAudioElement | null, HTMLAudioElement | null>(
        ref,
        () => internalRef.current
    );

    const [track, fullplayer_is_expanded] = useAppSelector((state : any) => [
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
    }, [playerRef, track]);


    const NavButtonStyles = 'w-6 h-6 shrink-0 cursor-pointer child:w-6 child:h-6 child:object-contain';

    if ( !track ) {
        return;
    }

    return (
        <div className={'desktop-player w-full sticky bottom-0 right-0 z-20 mt-auto'}>
            <div className={classNames(
                'absolute right-0 duration-300 w-[calc(100%-var(--sidebar-width))] bottom-[calc(var(--player-height)-1px)]',
                fullplayer_is_expanded ? 'h-[calc(100dvh-var(--player-height)+2px)] z-1' : 'h-0 -z-1'
            )}>
                <FullPlayer ref={internalRef}/> 
            </div>

            <div ref={playerRef} className="xl:pr-container pr-4 pl-4 py-3 bg-gray-600 flex items-center justify-between w-full z-10">
                <div className="flex items-center">
                    <div className="desktop-player__info flex items-center">
                        <div className={`w-12 h-12 ml-1 shrink-0 relative rounded block overflow-hidden text-gray-400 dark:text-gray-200 ${!track.cover?.length ? 'bg-gray-28 ' : ''}`}>
                            { track.cover?.length 
                                ? <Image src={track.cover} alt="Track's Cover" width={28} height={28} className="relative object-cover object-center w-full h-full"/> 
                                : <MusicNoteGray className={'w-3 h-3 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}/>
                            }
                        </div>
                        <div className="flex flex-col ml-5">
                            <span className="lg:text-sm text-xs max-lg:mb-1 text-white whitespace-nowrap line-clamp-1">{track.name}</span> 
                            <Link 
                                className="text-xs text-gray-300 hover:underline" 
                                href={`/artist/${track.artist._id}`}>
                                    {track.artist.full_name}
                            </Link>                             
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
                            'ml-4',                  
                            !track && 'opacity-0',
                            fullplayer_is_expanded ? 'scale-y-[-1]' : ''
                        )}>
                        <ChevronUpGray/>
                    </button>
                </div>

                <div className="flex flex-col items-center w-full max-w-[min(40vw,520px)] absolute left-1/2 -translate-x-1/2">
                    {/* Prev - Play - Next */}        
                    <NavBar ref={internalRef}/>

                    <ProgressBar ref={internalRef}/>
                </div>


                {/* Navigation - Volume/Save/Repeat */}
                <div className={classNames('flex items-center gap-5 shrink-0 ml-10')}>
                    <VolumeBar ref={internalRef}/>

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