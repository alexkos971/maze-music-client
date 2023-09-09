// @ts-check

import React, { useRef, useEffect } from "react";
import { setTheme } from "@store/reducers/interfaceReducer";

import { NavLink } from "react-router-dom";

import SettingsIcon from "@assets/images/icons/settings.svg";
import NotificationsIcon from "@assets/images/icons/notification.svg";
import SunIcon from "@assets/images/icons/sun.svg";
import MoonIcon from "@assets/images/icons/moon.svg";

import "./Header.scss";
import { useAppDispatch, useAppSelector } from "@hooks/index";

const Header = () => {
  const theme = useAppSelector((state) => state.interface.theme);
  const dispatch = useAppDispatch();

  const avatarRef : any = useRef(null); 

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.setAttribute('data-nick', 'AK');
    }
  }, []);

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="header__wrap">
          <span className="header__title">For you</span>

          <div className="header__nav">
            <NavLink to={'/settings'} className={'header__nav-item'}>
              <img src={SettingsIcon} alt="" />
            </NavLink>

            <NavLink to={'/notifications'} className={`header__nav-item notification-icon notification-icon_new`}>
              <img src={NotificationsIcon} alt="" />
            </NavLink>

            <button type="button" className="header__nav-item" onClick={() => dispatch(setTheme(theme == 'dark' ? 'light' : 'dark'))}>
              <img src={theme == 'dark' ? MoonIcon : SunIcon} alt="" />
            </button>
          </div>

          <div className="header__profile">
              <div className="header__profile-avatar" ref={avatarRef}>
              </div>

              <span className="header__profile-name">Alex Kos</span>
          </div>
        </div>
      </div>
    </header>  
  );
}

export default Header;