import React, { useState } from "react"
import Image from "next/image";
import { setTrack } from "@store/reducers/playerReducer";
import { useAppDispatch } from "@hooks";
import { WeekndAvatar, PlayBlack, PauseBlack, PlayGreen, PauseGreen, HeartOutlineGray,HeartSolidGreen } from "@helpers/images";

interface TrackListProps {
    title?: string;
    className?: string,
    data: {
        name?: string;
        tracks: String[];
    }
}

const TrackList = ({ title, data, className }: TrackListProps) => {
    let [isPlayed, setIsPlayed] = useState(false);
    let [isCurrent, setIsCurrent] = useState(0);
    const dispatch = useAppDispatch();

    return (
        <div className={`block track-list mt-16 ${className}`}>
            { title ? <h2 className="text-4xl font-semibold mb-5">{title}</h2> : '' }

            <div className="track-list__wrap mt-6">
                {
                    data.tracks.map((item, index) => {
                        let is_currently_playing = isCurrent == index ? true : false;
                        
                        return (
                            <div key={`${index}${item}`} className="track group flex items-center duration-300 hover:bg-gray-f8 rounded-md px-4 py-[10px] mt-2">
                                <span className="block w-[18px] h-[18px] relative flex items-center justify-start">

                                    {!is_currently_playing ?
                                        <span className="track__index text-sm text-black group-hover:opacity-0 group-hover:hidden">
                                            {`${index + 1}.`}
                                        </span>
                                    : '' }

                                    <button 
                                        className={`track__button absolute ml-[-0.25rem] left-0 top-0 w-full h-full ${!is_currently_playing ? "opacity-0 hidden" : ""} group-hover:opacity-100 group-hover:block`} 
                                        onClick={() => {
                                            // setIsPlayed(!isPlayed);
                                            // setIsCurrent(index);
                                            dispatch(setTrack({ 
                                                id: 'sdfsd',
                                                artist: 'sdfsdfs',
                                                playedCount: 749823,
                                                // duration: 206,
                                                name: 'Decode',
                                                cover: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                                                src: 'https://cdn6.sefon.pro/prev/1_g6J1XUbWkvypx60Kw2RQ/1700126692/3/Paramore%20-%20Decode%20%28OST%20%D0%A1%D1%83%D0%BC%D0%B5%D1%80%D0%BA%D0%B8%29%20%28192kbps%29.mp3',
                                            }))
                                        }}>
                                        <Image src={is_currently_playing ? (isPlayed ? PlayGreen : PauseGreen) : PlayBlack} width={0} height={0} alt="Play" className="w-full h-full object-contain"/>
                                    </button>
                                </span>
                            
                                <div className="w-7 h-7 rounded block overflow-hidden ml-3">
                                    <Image src={WeekndAvatar} width={0} height={0} alt="Feature"/>
                                </div>

                                <h4 className={`track__name text-sm font-semibold ${is_currently_playing ? "text-green-05" : "text-black"} ml-4`}>The Weeknd - Blinding Lights</h4>
                                
                                <span className={`track__name text-sm font-normal text-gray-8e ml-auto`}>Now 35</span>

                                <div className="ml-auto flex items-center">
                                    <button
                                        className="w-5 h-5 shrink-0 mr-6" 
                                        type="button">
                                        <Image 
                                            src={true ? HeartOutlineGray : HeartSolidGreen} 
                                            className="w-full h-full object-contain"
                                            alt="Heart Icon"/>
                                    </button>

                                    <span className="time text-gray-8e">3:18</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default TrackList;
