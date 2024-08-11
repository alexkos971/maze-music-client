import { RefObject } from "react";
import { DoubleArrowsGray, PauseBlack, PlayBlack } from "@utils/images";
import { twMerge } from "tailwind-merge";
import { useAppSelector, useAppDispatch } from "@hooks";
import { setIsPlaying } from "@store/reducers/playerReducer";

interface NavBarProps {
    className?: string
}

const NavBar = ({
    className
}: NavBarProps) => {
    const dispatch = useAppDispatch();
    const [track, isPlaying] = useAppSelector(state => [ state.player.track, state.player.isPlaying ]);
    const NavButtonStyles = 'w-6 h-6 shrink-0 cursor-pointer child:w-6 child:h-6 child:object-contain';

    return (
        <div className={ twMerge("flex items-center my-1 max-md:justify-center max-md:gap-8 max-md:w-full", className)}>
            <button 
                // onClick={previousMusicClickHandler}
                className={twMerge(NavButtonStyles, '-scale-100')}
                type="button">
                    <DoubleArrowsGray/>
            </button>

            <button 
                className={'md:w-8 md:h-8 w-12 h-12 bg-green-100 rounded-full flex justify-center items-center mx-4 shrink-0 duration-300 active:opacity-80'} 
                onClick={() => {
                    if ( track ) {    
                        dispatch(setIsPlaying(!isPlaying));
                    }
                }}>

                {isPlaying ? <PauseBlack className={'md:w-4 md:h-4 w-6 h-6'}/> : <PlayBlack className={'md:w-4 md:h-4 w-6 h-6'}/>}                                
            </button>

            <button 
                // onClick={nextMusicClickHandler}
                className={NavButtonStyles}
                type="button">
                <DoubleArrowsGray />
            </button>
        </div>
    );
};

NavBar.displayName = 'NavBar';
export default NavBar;