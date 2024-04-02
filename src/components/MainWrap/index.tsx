import React, { useEffect, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Sidebar from "../Sidebar";
import Header, { fillHeaderByScroll } from "../Header";

import { 
    // setTheme, 
    setFullplayerExpanded, setHeaderIsFilled } from '@store/reducers/interfaceReducer';

import { useAppDispatch, useAppSelector } from '@hooks';
import { lsGetItem } from '@helpers/localstorage';

interface Props {
    canReturnBack?: boolean,
    overlapHeader?: boolean
}

const MainWrap = ( { canReturnBack, overlapHeader, ...props } : PropsWithChildren<Props>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(setTheme(lsGetItem('theme') ?? 'light'));    
    // }, [])
    
    let fullplayer_is_expanded = useAppSelector(state => state.interface.fullplayer_is_expanded);
    useEffect(() => {
        dispatch(setFullplayerExpanded(false));
        dispatch(setHeaderIsFilled(false));
    }, [router.pathname]);

    return (
        <>
            <div className={'flex items-stretch text-black_36 relative h-[calc(100dvh-var(--player-height))]'}>
                <Sidebar />

                <div className={`w-screen ${fullplayer_is_expanded ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`} onScroll={fillHeaderByScroll}>
                    <Header canReturnBack={canReturnBack} overlap={overlapHeader}/>

                    <div className="main-wrap min-h-full pb-16">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainWrap;