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
    return (
        <div className={`block track-list mt-16 ${className}`}>
            { title ? <h2 className="block-title">{title}</h2> : '' }

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
