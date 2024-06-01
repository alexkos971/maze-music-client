import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@hooks"; 
import { useSaveTrackMutation } from "@store/api/tracksApi";
import { showToast } from "@store/reducers/interfaceReducer";
import Track from "@components/UI/Track";
import Title from "@components/UI/Title";
import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";

interface TrackListProps {
    title?: string;
    className?: string,
    data: Track[];
}

const TrackList = ({ title, data: tracks, className }: TrackListProps) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation('common');
    // @ts-ignore
    let profile : ProfileDto = useAppSelector(state => state.profile);
    const [saveTrack, { isSuccess, data }] = useSaveTrackMutation();

    useEffect(() => {
        if (isSuccess) {
            let is_saved = data.is_saved;

            dispatch(showToast({
                type: 'success',
                text: is_saved ? t('interface.saved') : t('interface.unsaved') 
            }));
        }
    }, [ isSuccess ]);   

    return (
        <div className={twMerge(`block track-list mt-16`, className)}>
            { title ? <Title>{title}</Title> : '' }

            <div className="track-list__wrap mt-6">
                {
                    tracks ? tracks.map((item, index) => {                        
                        return <Track
                            index={index}
                            track={item}
                            isSaved={profile?.saved_tracks?.includes(item._id) ?? false}
                            onSave={() => saveTrack({
                                track: item, 
                                action: profile?.saved_tracks.includes(item._id) ? 'unsave' : 'save'
                            })}
                            key={`${index}${item}`} />;
                    }) : <></>
                }
            </div>
        </div>
    );
}

export default TrackList;
