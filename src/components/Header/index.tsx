// @ts-check
import React, { useEffect, useRef, UIEvent } from "react";
import { useRouter } from "next/router";
import { setTheme, setHeaderIsFilled } from "@store/reducers/interfaceReducer";
import {store} from '@store/rootReducer';
import styles from './Header.module.scss';

import Link from "next/link";
import { directories } from "@helpers/directory";
import { SettingsGrayIcon, NotificationGrayIcon, SunGrayIcon, MoonBlackIcon, ChevronDownBlack } from "@helpers/images";

import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/index";

interface Props {
  canReturnBack?: boolean
}

const Header = ({canReturnBack = false} : Props) => {
  const dispatch = useAppDispatch();
  const {pathname, back} = useRouter();
  const [theme, title, profile, header_is_filled, fullplayer_is_expanded] = useAppSelector((state) => [state.interface.theme, state.interface.directory.title, state.profile, state.interface.header_is_filled, state.interface.fullplayer_is_expanded]);

  const {t} = useTranslation();

  let avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef?.current && profile.name) {
      avatarRef.current.setAttribute('data-nick', profile.name.split(" ").reduce((item, acc) => item[0] + acc[0]));
    }
  }, [profile.name]);


  // Get Height of the Header
  const headerRef = useRef<HTMLDivElement>(null);    
  useEffect(() => {
    headerRef?.current?.clientHeight ? document.documentElement.style.setProperty('--header-height', headerRef.current.clientHeight + 'px') : false;
  }, [headerRef]);

  return (
    <header className={`sticky top-0 left-0 py-5 z-20 duration-300 ${header_is_filled ? 'bg-white' : ''}`} ref={headerRef}>
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
              onClick={() => dispatch(setTheme(theme == 'dark' ? 'light' : 'dark'))}>
              {(() => {
                let theme_classes = 'w-full h-full object-contain';
                return theme == 'dark' ? <MoonBlackIcon /> : <SunGrayIcon/>
              })()}
            </button>
          </div>

          <Link href={'/profile'} className="header__profile cursor-pointer flex items-center">
              <div
                ref={avatarRef} 
                className={`header__profile-avatar 
                  relative w-10 h-10 overflow-hidden block rounded-[50%] shrink-0
                  after:absolute ${'after:content-[attr(data-nick)]'} after:left-1/2 after:top-1/2 after:w-full after:h-full after:translate-x-[-50%] after:translate-y-[-50%] after:font-normal after:text-base after:text-gray-c4 after:text-center after:flex after:items-center after:justify-center after:bg-gray-ee
                `}>
              </div>
              <span className={`header__profile-name font-normal text-base ml-4 ${ (fullplayer_is_expanded && !header_is_filled) ? 'text-white' : 'text-black'}`}>{profile.name}</span>
          </Link>
        </div>
      </div>
    </header>  
  );
}

export const fillHeaderByScroll = (e: UIEvent<HTMLDivElement>) : void => {
  if (e.currentTarget.scrollTop > 50 && !store.getState().interface.header_is_filled) {
    store.dispatch(setHeaderIsFilled(true));
  }
  else if (e.currentTarget.scrollTop <= 50 && store.getState().interface.header_is_filled) {
    store.dispatch(setHeaderIsFilled(false));
  }
}
    

export default Header;