import React, { useState } from "react"
import { useAppDispatch } from "@hooks";
import Track from "@components/ui/Track";

interface TrackListProps {
    title?: string;
    className?: string,
    data: {
        name?: string;
        tracks: Track[];
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
                        return <Track
                                index={index}
                                track={item}
                                key={`${index}${item}`} />;
                    })
                }
            </div>
        </div>
    );
}

export default TrackList;
