import React from "react";
import Image from "next/image";
import { setTrack, setIsPlaying } from "@store/reducers/playerReducer";
import formatSecond from "@helpers/format-seconds";
import { PlayBlack, PlayGreen, PauseGreen, HeartOutlineGray,HeartSolidGreen } from "@helpers/images";
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
    let [currentTrack, isPlaying, ] = useAppSelector(store => [store.player.track, store.player.isPlaying]);

    const is_current_track = track?.id == currentTrack?.id;

    return (
        <div className="track group flex items-center duration-300 hover:bg-gray-f8 rounded-md px-4 py-[10px] mt-2">
            <span className="block w-[18px] h-[18px] relative flex items-center justify-start">

                {(!is_current_track && index !== undefined) ?
                    <span className="track__index text-sm text-black group-hover:opacity-0 group-hover:hidden">
                        {`${index + 1}.`}
                    </span>
                : '' }

                <button 
                    className={`track__button absolute ml-[-0.25rem] left-0 top-0 w-full h-full ${!is_current_track ? "opacity-0 hidden" : ""} group-hover:opacity-100 group-hover:block`} 
                    onClick={() => {
                        if (is_current_track) {
                            dispatch(setIsPlaying(!isPlaying));
                        } else {
                            dispatch(setTrack({track, play: true}));
                        }
                    }}>
                    <Image src={is_current_track ? (isPlaying ? PauseGreen : PlayGreen) : PlayBlack} width={0} height={0} alt="Play" className="w-full h-full object-contain"/>
                </button>
            </span>
        
            <div className="w-7 h-7 rounded block overflow-hidden ml-3">
                {track.cover ? <img src={track.cover} alt="Feature"/> : ''}
            </div>

            <h4 className={`track__name text-sm font-semibold ${is_current_track ? "text-green-05" : "text-black"} ml-4`}>{`${track.artist.name} - ${track.name}`}</h4>
            
            { track.album ? <span className={`track__name text-sm font-normal text-gray-8e ml-auto`}>{track.album.name}</span> : ''}

            <div className="ml-auto flex items-center">
                <button
                    className="w-5 h-5 shrink-0 mr-6" 
                    type="button">
                    <Image 
                        src={true ? HeartOutlineGray : HeartSolidGreen} 
                        className="w-full h-full object-contain"
                        alt="Heart Icon"/>
                </button>

                <span className="time text-gray-8e">{track.duration ? formatSecond(track.duration) : '0:00'}</span>
            </div>
        </div>
    );
}

export default Track;