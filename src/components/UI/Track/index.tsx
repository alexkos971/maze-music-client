import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './Track.module.scss';
import { formatTime } from "@utils/formated";
import { setTrack, setIsPlaying } from "@store/reducers/playerReducer";
import { PlayBlack, PauseBlack, HeartOutlineGray,HeartSolidGreen, MusicNoteGray } from "@utils/images";
import { useAppSelector, useAppDispatch } from "@hooks";
import { useIsGreater } from "@hooks/useScreen";

interface TrackProps {
    track: Track;
    index?: number,
    onSave: () => void,
    isSaved: boolean
}

const Track = ({ 
    track,
    index,
    isSaved,
    onSave
}: TrackProps) => {
    const dispatch = useAppDispatch();
    let [currentTrack, isPlaying ] = useAppSelector(store => [store.player.track, store.player.isPlaying]);
    const is_current_track = track && currentTrack && track._id == currentTrack._id;    
    const IsGreaterSm = useIsGreater('sm');

    const playHandler = () => {
        if (is_current_track) {
            dispatch(setIsPlaying(!isPlaying));
        } else {
            dispatch(setTrack({track, play: true}));
        }
    }

    return (
        <div className={`${styles.track} ${ is_current_track ? styles.track__current : ''}`}>
            
            {/* Mobile Clicked Background */}
            {
                !IsGreaterSm ?
                    <div 
                        className="absolute left-0 top-0 w-full h-full bg-transparent block"
                        onClick={playHandler}>
                    </div> :
                    <></>
            }
            
            <span className="w-[18px] h-[18px] relative hidden md:flex items-center justify-start">
                {(!is_current_track && index !== undefined) ?
                    <span className={`${styles.track__index} text-sm text-gray-300 dark:text-gray-200`}>
                        {`${index + 1}.`}
                    </span>
                : '' }

                <button 
                    className={styles.track__play} 
                    onClick={playHandler}>
                    
                    {isPlaying && is_current_track ? <PauseBlack/> : <PlayBlack/>}
                </button>
            </span>
        
            <div className={`w-11 h-11 md:w-7 md:h-7 relative shrink-0 md:rounded block overflow-hidden text-gray-400 dark:text-gray-200 md:ml-3 ${!track.cover?.length ? 'bg-gray-28 ' : ''}`}>
                {
                    track.cover?.length 
                        ? <Image src={track.cover} alt="Track's Cover" width={28} height={28} className="relative object-cover object-center w-full h-full"/> 
                        : <MusicNoteGray className={'w-3 h-3 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}/>
                }
            </div>

            <span className={`flex md:items-center max-md:flex-col font-primary font-semibold ${is_current_track ? "text-green-100" : "text-gray-400 dark:text-gray-200"} ml-3 md:ml-4`}>
                <h4 className="track__name font-normal whitespace-nowrap text-sm">{track.name}</h4> 
                <span className="mx-1 max-md:hidden">-</span>
                <Link 
                    href={'/artist/' + track.artist._id} 
                    className="track__artist hover:underline whitespace-nowrap text-xs md:text-sm max-md:text-gray-300 max-md:font-secondary max-md:font-light z-1">
                    {track.artist.full_name}
                </Link>
            </span>
            
            { track.album ? <span className={`track__name text-sm font-normal text-gray-400 dark:text-gray-200 ml-auto`}>{track.album}</span> : ''}

            <div className={styles['track__right-nav']}>
                <button type="button" onClick={onSave} className="relative block z-1">
                    {isSaved ? <HeartSolidGreen/> : <HeartOutlineGray/>}
                </button>

                <span className="time text-gray-200 text-sm">{track.duration ? formatTime(track.duration) : '0:00'}</span>
            </div>
        </div>
    );
}

export default Track;