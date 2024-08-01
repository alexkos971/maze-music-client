import { forwardRef, useRef, useImperativeHandle } from "react";
import { DoubleArrowsGray, PauseBlack, PlayBlack } from "@utils/images";
import { twMerge } from "tailwind-merge";
import { useAppSelector, useAppDispatch } from "@hooks";
import { setIsPlaying } from "@store/reducers/playerReducer";

interface NavBarProps {
    className?: string
}

const NavBar = forwardRef<HTMLAudioElement, NavBarProps>(function({
    className
}, ref) {
    const audioRef = useRef<HTMLAudioElement>(null)
    useImperativeHandle<HTMLAudioElement | null, HTMLAudioElement | null>(
        ref,
        () => audioRef.current
    );

    const dispatch = useAppDispatch();
    const [track, isPlaying] = useAppSelector(state => [ state.player.track, state.player.isPlaying ]);
    const NavButtonStyles = 'w-6 h-6 shrink-0 cursor-pointer child:w-6 child:h-6 child:object-contain';

    return (
        <div className={ twMerge("flex items-center mb-2", className)}>
            <button 
                // onClick={previousMusicClickHandler}
                className={twMerge(NavButtonStyles, '-scale-100')}
                type="button">
                    <DoubleArrowsGray/>
            </button>

            <button 
                className={'w-8 h-8 bg-green-100 rounded-full flex justify-center items-center mx-4 shrink-0 duration-300 active:opacity-80'} 
                onClick={() => {
                    if ( track ) {    
                        dispatch(setIsPlaying(!isPlaying));
                    }
                }}>

                {isPlaying ? <PauseBlack className={'w-4 h-4'}/> : <PlayBlack className={'w-4 h-4'}/>}                                
            </button>

            <button 
                // onClick={nextMusicClickHandler}
                className={NavButtonStyles}
                type="button">
                <DoubleArrowsGray />
            </button>
        </div>
    );
});

NavBar.displayName = 'NavBar';
export default NavBar;