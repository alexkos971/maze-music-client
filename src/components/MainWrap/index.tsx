import React, { useEffect, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Sidebar from "../Sidebar";
import Header, { fillHeaderByScroll } from "../Header";
import Player from "@components/Player";

import { setTheme, setFullplayerExpanded } from '@store/reducers/interfaceReducer';
import { useAppDispatch, useAppSelector } from '@hooks';
import { lsGetItem } from '@helpers/localstorage';

interface Props {}

const MainWrap = (props: PropsWithChildren<Props>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTheme(lsGetItem('theme')));    
    }, [])
    
    let fullplayer_is_expanded = useAppSelector(state => state.interface.fullplayer_is_expanded);
    useEffect(() => {
        dispatch(setFullplayerExpanded(false));
    }, [router.pathname]);

    return (
        <>
            <div className={'flex items-stretch min-h-screen text-black_36 relative'}>
                <Sidebar />

                <div className={`w-screen h-screen ${fullplayer_is_expanded ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`} onScroll={fillHeaderByScroll}>
                    <Header/>

                    <div className="main-wrap min-h-screen pb-16">
                        {props.children}
                    </div>

                    <Player/>
                </div>
            </div>
        </>
    );
}

export default MainWrap;