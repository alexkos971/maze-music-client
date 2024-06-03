"use client";

import React, { useEffect, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Header, { fillHeaderByScroll } from "../../components/Header";

import { setFullplayerExpanded, setHeaderIsFilled } from '@store/reducers/interfaceReducer';

import { useAppDispatch, useAppSelector } from '@hooks';
import classNames from "classnames";

interface Props {
    canReturnBack?: boolean,
    overlapHeader?: boolean
}

const MainWrap = ( { canReturnBack, overlapHeader, ...props } : PropsWithChildren<Props>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    let fullplayer_is_expanded = useAppSelector(state => state.interface.fullplayer_is_expanded);
    
    useEffect(() => {
        dispatch(setFullplayerExpanded(false));
        dispatch(setHeaderIsFilled(false));
    }, [router.pathname]);

    return (
        <>
            <div className={'main-wrap flex items-stretch text-gray-400 relative h-screen md:h-[calc(100dvh-var(--player-height))]'}>
                <Sidebar />

                <div className={classNames(
                    fullplayer_is_expanded ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden', 
                    // caclulate padding from player height and sidebar
                    "w-screen max-md:pb-10"
                )} onScroll={fillHeaderByScroll}>
                    <Header canReturnBack={canReturnBack} overlap={overlapHeader}/>

                    <div className="main-wrap-content md:min-h-full md:pb-4">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainWrap;