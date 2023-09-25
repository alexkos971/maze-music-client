import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.scss"

import Link from "next/link";
import Image from "next/image";

import i18n from "i18next";

import { useAppSelector, useAppDispatch } from "@hooks/index";
import { setSidebarCollapsed, setDirectory } from "@store/reducers/interfaceReducer";
import { Logo, LogoIcon, BoxBlackIcon, ExploreBlackIcon } from "@helpers/images";

const Sidebar = () => {
    const [isCollapsed, directory] = useAppSelector(state => [state.interface.sidebar_is_collapsed, state.interface.directory]);
    const dispatch = useAppDispatch();

    const sidebar_menu = [
        {
            icon: ExploreBlackIcon,
            path: '/for-you',
            title: i18n.t("sidebar.items.for-you"),
        },
        {
            icon: BoxBlackIcon,
            path: '/library',
            title: i18n.t("sidebar.items.library"),
        }
    ];

    return (
        <aside 
            className={`sidebar w-full shrink-0 h-screen flex flex-col items-center ${isCollapsed ? 'sidebar_collapsed pt-[26px]' : 'pt-[20px]'} pb-[32px] border-r border-r-gray-de duration-500`}
            style={{maxWidth: isCollapsed ? 250: 90 }}>

            <div className={`logo sidebar__logo w-full ${isCollapsed ? 'pr-8 pl-5' : 'px-6'}`}>
                <Image src={isCollapsed ? Logo : LogoIcon} alt="Logo" style={{ height: 'auto' }} className="max-h-[42px] w-full h-auto"/>
            </div>

            <ul className="sidebar__menu flex flex-col w-full mt-8">
                {
                    sidebar_menu.map((item, index) => (
                        <li 
                            key={index + item.title}
                            onClick={() => dispatch(setDirectory({ path: item.path, title: item.title }))} 
                            className={`${styles['sidebar-button']} ${item.path == directory.path ? styles['sidebar-button_current'] : ''} ${isCollapsed ? '' : styles['sidebar-button_only_icon']}`}
                        >
                            <Link href={item.path} className={styles['sidebar-button__wrap']}>
                                <div className={`${styles['sidebar-button__icon']}`}>
                                    <Image src={item.icon} alt="Icon"/>
                                </div>
                                <span className={`${styles['sidebar-button__title']}`}>{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <div className={`${styles['sidebar-button']} ${styles['sidebar-button_collapse']} ${isCollapsed ? '' : styles['sidebar-button_only_icon']}`}>
                <div 
                    className={styles['sidebar-button__wrap']} 
                    onClick={() => dispatch(setSidebarCollapsed(!isCollapsed))}>
                    
                    <span className={styles['sidebar-button__title']}>Collapse</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;