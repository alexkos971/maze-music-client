import { RefObject } from "react";
import { formatTime } from "@utils/formated";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setCurrentTime, setIsDragged } from "@store/reducers/playerReducer";
import Range from "@components/UI/Range";
import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
    className?: string;
    audioRef: RefObject<HTMLAudioElement>
}

const ProgressBar = ({
    className,
    audioRef
}: ProgressBarProps) => {
    const dispatch = useAppDispatch();

    const [track, currentTime, isDragged] = useAppSelector(state => [state.player.track, state.player.currentTime, state.player.isDragged]);

    const musicTimeChangeHandler = (time: number) => {
        if (track && audioRef?.current) {
            dispatch(setCurrentTime(time));

            if (!isDragged) {
                audioRef.current.currentTime = time;
            }
        } 
    }

    let timeStyles = 'text-white text-xs max-md:absolute max-md:top-4';

    return (
        <div className={twMerge(`flex items-center justify-center relative w-full max-md:pb-6`, className)}>
            <span className={twMerge(timeStyles, 'max-md:left-0')}>{formatTime(currentTime)}</span>

            {/* Progress */}
            <Range
                value={currentTime}                                
                className={'md:mx-4 w-full'}
                style={{'--range-height': '4px'} as React.CSSProperties}
                onMouseUp={() => {
                    dispatch(setIsDragged(false));
                    
                    if ( audioRef?.current && audioRef?.current?.currentTime != currentTime ) {
                        audioRef.current.currentTime = currentTime;
                    }
                }}
                onMouseDown={() => dispatch(setIsDragged(true))}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => musicTimeChangeHandler(Number(e.currentTarget.value))}  
                max={audioRef?.current?.duration ?? 0} />
            
            <span className={twMerge(timeStyles, 'max-md:right-0')}>{audioRef?.current?.duration ? formatTime(audioRef.current.duration) : "00:00"}</span>
        </div>
    );
}

ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;