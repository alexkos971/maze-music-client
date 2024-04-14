"use client";

import React, { useEffect, useRef, UIEvent, useState } from "react";
import useThrottle from "@hooks/throttle";
import { useRouter } from "next/router";
import { setHeaderIsFilled } from "@store/reducers/interfaceReducer";
import {store} from '@store/rootReducer';
import styles from './Header.module.scss';

import { useTheme } from "next-themes";

import Link from "next/link";
import { directories } from "@helpers/directory";
import { SettingsGrayIcon, NotificationGrayIcon, SunGrayIcon, MoonBlackIcon, ChevronDownBlack } from "@helpers/images";

import { useTranslation } from "next-i18next";
import { useAppSelector } from "@hooks/index";
import Avatar from "@components/UI/Avatar";

interface Props {
  canReturnBack?: boolean,
  overlap?: boolean
}

const Header = ({canReturnBack = false, overlap = false} : Props) => {
  const {pathname, back} = useRouter();
  
  let title = useAppSelector(state => state.interface.directory.title), 
    header_is_filled = useAppSelector(state => state.interface.header_is_filled), 
    fullplayer_is_expanded = useAppSelector(state => state.interface.fullplayer_is_expanded); 

  // @ts-ignore
  let profile = useAppSelector<ProfileDto>(state => state.profile);

  const { theme, setTheme } = useTheme();

  const {t} = useTranslation();

  // Get Height of the Header
  const headerRef = useRef<HTMLDivElement>(null);    

  
  const [ headerHeight, setHeaderHeight ] = useState(0);
  let throttledHeaderHeight = useThrottle(headerHeight, 0);
  
  const resizeHeader = () => {
    if (headerRef?.current?.clientHeight) {
      setHeaderHeight(headerRef.current.clientHeight)
    } 
  };

  useEffect(() => {
    let timer : undefined | ReturnType<typeof setTimeout>;
    timer = setTimeout(() => resizeHeader(), 50);
    window.addEventListener('resize', resizeHeader);
    return () => {
      clearTimeout(timer);
    }
  }, [headerRef]);

  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', throttledHeaderHeight + 'px');
  }, [throttledHeaderHeight]);

  return (
    <header className={`header z-20 sticky ${overlap ? 'h-0' : ''} top-0 left-0`}>
      <div 
        className={`header__wrap py-5 duration-300 ${header_is_filled ? 'bg-app-background dark:bg-app-background-secondary' : ''}`} 
        ref={headerRef}>
        <div className="container-fluid">
          <div className="header__wrap flex items-center justify-end relative">

            {/* Go Back Arrow */}
            {canReturnBack === true ? <button type="button" onClick={back} className={styles.header__back}><ChevronDownBlack/></button> : ''}

            <span className="header__title font-semibold text-lg text-green-05 mr-auto">{t(title)}</span>

            <div className="header__nav flex items-center mr-16">
              {/* Settings */}
              <Link 
                href={'/settings'} 
                className={`header__nav-item cursor-pointer w-8 h-8 flex shrink-0 p-1 ml-6 ${pathname == directories['settings']['path'] ? 'brightness-50' : ''}`}>
                <SettingsGrayIcon className="w-full h-full object-contain"/>
              </Link>

              {/* Notification Tooltip */}
              <span  
                className={`header__nav-item notification-icon notification-icon_new 
                cursor-pointer w-8 h-8 flex shrink-0 p-1 ml-6
                relative before:absolute before:right-[6px] before:top-[6px] before:w-[9px] before:h-[9px] before:rounded-xl before:bg-green-05 
              `}>            
                <NotificationGrayIcon alt="Notifications Icon" className="w-full h-full object-contain"/>
              </span>

              {/* Switch Theme */}
              <button 
                type="button" 
                className="header__nav-item cursor-pointer w-8 h-8 flex shrink-0 p-1 ml-6" 
                onClick={() => {
                  // Next-Theme
                  let newState = theme == 'dark' ? 'light' : 'dark'; 
                  setTheme(newState);
                }}>
                {theme === "light" ? <MoonBlackIcon /> : <SunGrayIcon/>}
              </button>
            </div>

            {
              profile ?                        
                <Link href={'/profile'} className="cursor-pointer flex items-center">
                  <Avatar 
                    size="40px"                            
                    img={profile?.avatar?.length ? process.env.NEXT_PUBLIC_STATIC + profile?.avatar : ''}
                    previewText={profile?.full_name ? profile?.full_name.split(" ").reduce((item, acc) => item[0] + acc[0]) : ''}
                  />
                                  
                  {
                    profile.full_name 
                      ? <span 
                          className={`font-normal text-base ml-4 ${ (fullplayer_is_expanded && !header_is_filled) ? 'text-white' : 'text-app-text-primary'}`}>
                          {profile.full_name}
                        </span>
                      : <></>
                  }
                </Link>
                : <></>
            }
          </div>
        </div>
      </div>
    </header>  
  );
}

export const fillHeaderByScroll = (e: UIEvent<HTMLDivElement>) : void => {
  if (e.currentTarget.scrollTop > 35 && !store.getState().interface.header_is_filled) {
    store.dispatch(setHeaderIsFilled(true));
  }
  else if (e.currentTarget.scrollTop <= 35 && store.getState().interface.header_is_filled) {
    store.dispatch(setHeaderIsFilled(false));
  }
}
    

export default Header;