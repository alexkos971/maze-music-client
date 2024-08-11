import { forwardRef, useRef, useImperativeHandle } from "react";
import { formatTime } from "@utils/formated";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setCurrentTime, setIsDragged } from "@store/reducers/playerReducer";
import Range from "@components/UI/Range";
import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
    className?: string;
}

const ProgressBar = forwardRef<HTMLAudioElement, ProgressBarProps>(function({
    className
}, ref) {
    const dispatch = useAppDispatch();

    const audioRef = useRef<HTMLAudioElement>(null)
    useImperativeHandle<HTMLAudioElement | null, HTMLAudioElement | null>(
        ref,
        () => audioRef.current
    );


    const [track, currentTime, isDragged] = useAppSelector(state => [state.player.track, state.player.currentTime, state.player.isDragged]);

    const musicTimeChangeHandler = (time: number) => {
        if (track && audioRef?.current) {
            dispatch(setCurrentTime(time));

            if (!isDragged) {
                audioRef.current.currentTime = time;
            }
        } 
    }

    return (
        <div className={twMerge(`flex items-center justify-center relative w-full`, className)}>
            <span className="text-white text-xs">{formatTime(currentTime)}</span>

            {/* Progress */}
            <Range
                value={currentTime}                                
                className={'mx-4 w-full'}
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
            
            <span className="text-white text-xs">{audioRef?.current?.duration ? formatTime(audioRef.current.duration) : "00:00"}</span>
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;