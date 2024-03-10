import React from "react";
import Link from "next/link";
import styles from './Track.module.scss';
import { setTrack, setIsPlaying } from "@store/reducers/playerReducer";
import {formatTime} from "@helpers/formated";
import { PlayBlack, PauseBlack, HeartOutlineGray,HeartSolidGreen } from "@helpers/images";
import { useAppSelector, useAppDispatch } from "@hooks";

interface TrackProps {
    track: Track;
    index?: number
}

const Track = ({ 
    track,
    index
}: TrackProps) => {
    const dispatch = useAppDispatch();
    let [currentTrack, isPlaying ] = useAppSelector(store => [store.player.track, store.player.isPlaying]);

    const is_current_track = track?.id == currentTrack?.id;

    return (
        <div className={`${styles.track} ${ is_current_track ? styles.track__current : ''}`}>
            <span className="block w-[18px] h-[18px] relative flex items-center justify-start">

                {(!is_current_track && index !== undefined) ?
                    <span className={`${styles.track__index} text-sm text-black`}>
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
        
            <div className="w-7 h-7 rounded block overflow-hidden ml-3">
                {track.cover ? <img src={track.cover} alt="Feature"/> : ''}
            </div>

            <h4 className={`track__name text-sm font-primary font-semibold ${is_current_track ? "text-green-05" : "text-black"} ml-4`}>
                <Link href={'/artist/' + track.artist.id}>{track.artist.name}</Link> - {track.name}
            </h4>
            
            { track.album ? <span className={`track__name text-sm font-normal text-gray-8e ml-auto`}>{track.album.name}</span> : ''}

            <div className={styles['track__right-nav']}>
                <button type="button">
                    {true ? <HeartOutlineGray/> : <HeartSolidGreen/>}
                </button>

                <span className="time text-gray-8e text-sm">{track.duration ? formatTime(track.duration) : '0:00'}</span>
            </div>
        </div>
    );
}

export default Track;