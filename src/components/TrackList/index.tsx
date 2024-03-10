import React, { useState } from "react"
import Track from "@components/UI/Track";
import Title from "@components/UI/Title";

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
            { title ? <Title>{title}</Title> : '' }

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
