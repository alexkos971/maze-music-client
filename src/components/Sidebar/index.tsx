import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import i18n from "i18next";

import { useAppSelector, useAppDispatch } from "@hooks/index";
import { setSidebarCollapsed } from "@store/reducers/interfaceReducer";

import Logo from "@assets/images/logo.svg"; 
import IconLogo from "@assets/images/icons/logo-only-icon.svg"; 

import ExploreIcon from "@assets/images/icons/explore.svg";
import BoxIcon from "@assets/images/icons/box.svg";

const Sidebar = () => {

    const isCollapsed = useAppSelector(state => state.interface.sidebar_is_collapsed);
    const dispatch = useAppDispatch();

    const sidebar_menu = [
        {
            icon: ExploreIcon,
            path: '/home',
            title: i18n.t("sidebar.items.home"),
        },
        {
            icon: BoxIcon,
            path: '/library',
            title: i18n.t("sidebar.items.library"),
        }
    ];
    // REPLACE WIth redux
    const path = '/home';

    return (
        <aside className={`sidebar ${isCollapsed ? 'sidebar_collapsed' : ''}`}>
            <div className="logo sidebar__logo">
                <img src={isCollapsed ? Logo : IconLogo}/>
            </div>

            <ul className="sidebar__menu">
                {
                    sidebar_menu.map((item, index) => (
                        <li key={index + item.title} className={`sidebar__menu-item sidebar-button${item.path == path ? ' sidebar-button_current' : '' }`}>
                            <NavLink to={item.path} className="sidebar-button__wrap">
                                <div className="sidebar-button__icon">
                                    <img src={item.icon} />
                                </div>
                                <span className="sidebar-button__title">{item.title}</span>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>

            <div className="sidebar-button sidebar-button_collapse">
                <div className="sidebar-button__wrap" onClick={() => dispatch(setSidebarCollapsed(!isCollapsed))}>
                    <span className="sidebar-button__title">Collapse</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;