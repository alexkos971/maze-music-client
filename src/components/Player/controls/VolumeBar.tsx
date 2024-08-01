import { forwardRef, useRef, useImperativeHandle } from "react";
import { VolumeGray } from "@utils/images";
import { useAppSelector, useAppDispatch } from "@hooks";
import Range from "@components/UI/Range";
import { setVolume } from "@store/reducers/playerReducer";

const VolumeBar = forwardRef<HTMLAudioElement>(function({}, ref) {
    const audioRef = useRef<HTMLAudioElement>(null)
    useImperativeHandle<HTMLAudioElement | null, HTMLAudioElement | null>(
        ref,
        () => audioRef.current
    );

    const dispatch = useAppDispatch();
    const [volume] = useAppSelector(state => [ state.player.volume ]);
    const NavButtonStyles = 'w-6 h-6 shrink-0 cursor-pointer child:w-6 child:h-6 child:object-contain';

    const changeVolumeHandler = (volumeValue: number) => {
        if (!audioRef) {
            return;
        }
        
        audioRef.current && (audioRef.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
        audioRef.current && (audioRef.current.volume = volumeValue / 100);
        dispatch(setVolume(volumeValue / 100));
    }

    return (
        <span className={'flex items-center w-28'}>
            <span className={NavButtonStyles}>                                                
                <VolumeGray/>
            </span>
            
            <Range
                value={volume * 100}
                min={0}
                color="gray"
                max={100}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => changeVolumeHandler(Number(e.target.value))} 
                className={'ml-2'}
                />
        </span>
    );
});

VolumeBar.displayName = 'VolumeBar';
export default VolumeBar;