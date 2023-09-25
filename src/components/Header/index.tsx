// @ts-check
import React, { useEffect, useRef, useState } from "react";
import { setTheme, setDirectory } from "@store/reducers/interfaceReducer";

import Link from "next/link";
import Image from "next/image";
import { SettingsGrayIcon, NotificationGrayIcon, SunGrayIcon, MoonBlackIcon } from "@helpers/images";

import { useAppDispatch, useAppSelector } from "@hooks/index";

const Header = () => {
  const [theme, directory, profile] = useAppSelector((state) => [state.interface.theme, state.interface.directory, state.profile]);
  const dispatch = useAppDispatch();

  let avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef?.current && profile.name) {
      avatarRef.current.setAttribute('data-nick', profile.name.split(" ").reduce((item, acc) => item[0] + acc[0]));
    }
  }, [profile.name])

  return (
    <header className={'sticky top-0 left-0 py-5 bg-white'}>
      <div className="container-fluid">
        <div className="header__wrap flex items-center justify-end">
          <span className="header__title font-semibold text-lg text-green-05 mr-auto">{directory.title}</span>

          <div className="header__nav flex items-center mr-16">
            <Link 
              href={'/settings'} 
              onClick={() => dispatch(setDirectory({ path: '/settings', title: 'Settings' }))}
              className={'header__nav-item cursor-pointer w-8 h-8 flex shrink-0 p-1 ml-6'}>
              <Image src={SettingsGrayIcon} alt="Settings Icon" className="w-full h-full object-contain"/>
            </Link>

            <Link 
              href={'/notifications'} 
              className={`header__nav-item notification-icon notification-icon_new 
              cursor-pointer w-8 h-8 flex shrink-0 p-1 ml-6
              relative before:absolute before:right-[6px] before:top-[6px] before:w-[9px] before:h-[9px] before:rounded-xl before:bg-green-05 
            `}>            
              <Image src={NotificationGrayIcon} alt="Notifications Icon" className="w-full h-full object-contain"/>
            </Link>

            <button 
              type="button" 
              className="header__nav-item cursor-pointer w-8 h-8 flex shrink-0 p-1 ml-6" 
              onClick={() => dispatch(setTheme(theme == 'dark' ? 'light' : 'dark'))}>
              <Image src={theme == 'dark' ? MoonBlackIcon : SunGrayIcon } alt={(theme == 'dark' ? 'Moon' : 'Sun') + 'Icon'} className="w-full h-full object-contain"/>
            </button>
          </div>

          <div className="header__profile cursor-pointer flex items-center">
              <div
                ref={avatarRef} 
                className={`header__profile-avatar 
                  relative w-10 h-10 overflow-hidden block rounded-[50%] shrink-0
                  after:absolute ${'after:content-[attr(data-nick)]'} after:left-1/2 after:top-1/2 after:w-full after:h-full after:translate-x-[-50%] after:translate-y-[-50%] after:font-normal after:text-base after:text-gray-c4 after:text-center after:flex after:items-center after:justify-center after:bg-gray-ee
                `}>
              </div>
              <span className="header__profile-name font-normal text-base text-black ml-4">{profile.name}</span>
          </div>
        </div>
      </div>
    </header>  
  );
}

export default Header;