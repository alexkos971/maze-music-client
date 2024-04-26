import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './Track.module.scss';
import { formatTime } from "@helpers/formated";
import { setTrack, setIsPlaying } from "@store/reducers/playerReducer";
import { PlayBlack, PauseBlack, HeartOutlineGray,HeartSolidGreen, MusicNoteGray } from "@helpers/images";
import { useAppSelector, useAppDispatch } from "@hooks";

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

    return (
        <div className={`${styles.track} ${ is_current_track ? styles.track__current : ''}`}>
            <span className="w-[18px] h-[18px] relative hidden md:flex items-center justify-start">

                {(!is_current_track && index !== undefined) ?
                    <span className={`${styles.track__index} text-sm text-app-text-secondary`}>
                        {`${index + 1}.`}
                    </span>
                : '' }

                <button 
                    className={styles.track__play} 
                    onClick={() => {
                        if (is_current_track) {
                            dispatch(setIsPlaying(!isPlaying));
                        } else {
                            dispatch(setTrack({track, play: true}));
                        }
                    }}>
                    
                    {isPlaying && is_current_track ? <PauseBlack/> : <PlayBlack/>}
                </button>
            </span>
        
            <div className={`w-11 h-11 md:w-7 md:h-7 relative md:rounded block overflow-hidden md:ml-3 ${!track.cover?.length ? 'bg-gray-28 ' : ''}`}>
                {
                    track.cover?.length 
                        ? <Image src={track.cover} alt="Track's Cover" width={28} height={28} className="relative object-cover object-center w-full h-full"/> 
                        : <MusicNoteGray className={'w-3 h-3 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}/>
                }
            </div>

            <h4 className={`track__name text-sm font-primary font-semibold ${is_current_track ? "text-green-05" : "text-app-text-primary"} ml-4`}>
                {track.name} - <Link href={'/artist/' + track.artist._id} className="hover:underline">{track.artist.full_name}</Link>
            </h4>
            
            { track.album ? <span className={`track__name text-sm font-normal text-gray-8e ml-auto`}>{track.album}</span> : ''}

            <div className={styles['track__right-nav']}>
                <button type="button" onClick={onSave}>
                    {isSaved ? <HeartSolidGreen/> : <HeartOutlineGray/>}
                </button>

                <span className="time text-gray-8e text-sm">{track.duration ? formatTime(track.duration) : '0:00'}</span>
            </div>
        </div>
    );
}

export default Track;