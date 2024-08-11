import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setCurrentTime, setIsPlaying, setIsDragged } from "@store/reducers/playerReducer";
import { showToast } from "@store/reducers/interfaceReducer";
import { useSaveTrackMutation } from "@store/api/tracksApi";

import DesktopPlayer from "./DesktopPlayer";
import MobilePlayer from "./MobilePlayer";
import { useIsGreater } from "@hooks/useScreen";
import { useTranslation } from "next-i18next";

const Player = () => {    
    const [currentTime, isPlaying, isDragged, volume, track] = useAppSelector((state : any) => [
        state.player.currentTime, 
        state.player.isPlaying,
        state.player.isDragged, 
        state.player.volume, 
        state.player.track
    ]);

    // @ts-ignore
    let profile : ProfileDto = useAppSelector(state => state.profile);
 
    const dispatch = useAppDispatch(); 

    const [saveTrack] = useSaveTrackMutation();
    const [ isSaved, setIsSaved ] = useState(false);

    const IsGreaterSm = useIsGreater('sm');
    
    useEffect(() => {
        if (profile && profile?.saved_tracks) {
            setIsSaved(profile?.saved_tracks.includes(track?._id));
        }
    }, [profile, track]);     

    // move to redux
    const changeTrack = (direction : 'next' | 'prev', auto?: boolean ) => {
        return 'sdsds';
    };

    const [repeatType, setRepeat] = useState('all');    
    
    const [duration, setDuration] = useState<number>(0);
    const [repeatOnce, setRepeatOnce] = useState<boolean | null>(false);
    const ref = useRef<HTMLAudioElement>(null);
    const {t} = useTranslation('common');

    // const [messageApi, contextHolder] = message.useMessage()

    // Trigger Audio instance - Change track or start, when src is not empty or changed
    useEffect(() => {
        console.log('TRACK SRC - ', track.src);
        console.log('REF - ', ref);

        if ( track?.src && ref?.current) {
            ref.current.src = track.src;
            ref.current.currentTime = currentTime;
            ref.current.volume = volume;

            if (!ref.current.duration) {
                dispatch(showToast({
                    type: 'error',
                    text: t('interface.track_error')
                }));
            }
            else {
                if ( !isPlaying ) {
                    ref.current.pause();
                } else {
                    ref.current.play();
                }
            }        
        }
    }, [track, isPlaying]);


    const onAudioUpdate = () => {
        if (!ref.current) {
            return false;
        }
        
        if ( ref.current.currentTime == duration && ref.current.duration) {
            // Doing some anoother logic later (for example move to the next)
            dispatch(setIsPlaying(false))
            dispatch(setCurrentTime(0));
            ref.current.pause();
            dispatch(setIsDragged(false));
        }
        
        else if (!isDragged) dispatch(setCurrentTime(ref.current.currentTime)); 
        
    }

    const playClickHandler = () => {
        if ( track ) {    
            dispatch(setIsPlaying(!isPlaying));
        }
    }

    const metadataLoadHandler = () => {
        ref.current && setDuration(ref.current.duration);
    }

    const repeatClickHandler = () => {
        if ( repeatType === "shuffle" ) {
            // messageApi.open({
            //     type: "error",
            //     content: "You must turn off shuffle repeat"
            // })
            return
        }

        let content : string = "Repeat Musics turned off"
        if ( repeatOnce === null ) {
            setRepeat("all")
            setRepeatOnce(false)
            content = "Repeat all Musics turned on"
        } else if ( repeatOnce ) {
            setRepeat("off")
            setRepeatOnce(null);
        } else {
            setRepeat("once");
            setRepeatOnce(true);
            content = "Repeat one Music turned on";
        }

        // messageApi.open({
        //     type: "success",
        //     content
        // })
    }

    const shuffleRepeatClickHandler = () => {
        let content : string = "Suffle repeat truned on"
        if ( repeatType === "shuffle" ) {
            if ( repeatOnce === null ) {
                setRepeat("off")
                content = "Repeat Musics turned off"
            } else if ( repeatOnce ) {
                setRepeat("once")
                content = "Repeat one Music turned on"
            } else {
                setRepeat("all")
                content = "Repeat all Musics turned on"
            }
        } else {
            setRepeat("shuffle")
        }

        // messageApi.open({
        //     type: "success",
        //     content
        // });
    }

    const previousMusicClickHandler = () => {
        if ( currentTime < 3 ) {
            changeTrack("prev");
        } else {
            ref.current && (ref.current.currentTime = 0);
            dispatch(setCurrentTime(0));
        }
    }

    const nextMusicClickHandler = () => changeTrack("next", false);
    
    if (!track) {
        return <></>;
    }

    return (
        <>
            <audio 
                ref={ref} 
                onTimeUpdate={onAudioUpdate} 
                onLoadedMetadata={metadataLoadHandler} >
                <source src={track.src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
    
        {
            IsGreaterSm ?
                <DesktopPlayer 
                    {...{  
                        ref, 
                        duration,
                        isSaved,
                        saveTrack, 
                        repeatClickHandler, 
                        previousMusicClickHandler, 
                        nextMusicClickHandler, 
                        shuffleRepeatClickHandler
                    }}
                />
                :
                <MobilePlayer 
                    {...{  
                        ref, 
                        duration,
                        isSaved,
                        saveTrack,
                        repeatClickHandler, previousMusicClickHandler, nextMusicClickHandler, playClickHandler, shuffleRepeatClickHandler
                    }}
                />
        }
        </>
    );
}

Player.displayName = 'Player';
export default Player;