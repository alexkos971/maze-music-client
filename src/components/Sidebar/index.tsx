"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";

import { lsGetItem } from "@helpers/localstorage";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { useAppSelector, useAppDispatch } from "@hooks/index";
import { setSidebarCollapsed } from "@store/reducers/interfaceReducer";
import { Logo, LogoForDark, LogoIcon } from "@helpers/images";
import ChevronLeft from "@icons/chevron-left-gray.svg";
import { directories } from "@helpers/directory";
import { useTheme } from "next-themes";
import classNames from "classnames";

const Sidebar : React.FC = () => {
    const isCollapsed = useAppSelector(state => state.interface.sidebar_is_collapsed);
    const dispatch = useAppDispatch();
    const directory = useRouter().pathname;
    const { theme } = useTheme();

    const {t} = useTranslation('common');

    const menu_pages = ['for_you', "library", 'upload'];

    useEffect(() => {
        let sidebarState = lsGetItem('sidebar_is_collapsed');
        dispatch(setSidebarCollapsed( typeof sidebarState === 'boolean' ? sidebarState : false ));
    }, []);

    const sidebarRef = useRef<HTMLElement>(null);    

    useEffect(() => {
        sidebarRef?.current?.clientWidth ? document.documentElement.style.setProperty('--sidebar-width', (isCollapsed ? 250 : 90) + 'px') : false;
    }, [isCollapsed]);

    return (
        <aside 
            ref={sidebarRef}
            className={`${styles.sidebar} w-full shrink-0 flex flex-col items-center pt-[26px] ${isCollapsed ? 'sidebar_collapsed' : ''} pb-2 border-r border-r-gray-de dark:border-r-gray-4a dark:bg-app-background-secondary`}
            style={{maxWidth: isCollapsed ? 250: 90 }}>

            <div className={`${styles['sidebar__logo']} ${isCollapsed ? 'pr-8 pl-5' : 'px-6'}`}>
                {isCollapsed ? ( theme == 'dark' ? <LogoForDark/> : <Logo/>) : <LogoIcon/>}
            </div>

            <ul className="sidebar__menu flex flex-col w-full mt-8">
                {
                    menu_pages.map((item, index) => (
                        <li 
                            key={index + directories[item].title}
                            className={
                                classNames(
                                    styles['sidebar-button'],
                                    theme == 'dark' ? styles['sidebar-button_dark'] : null,
                                    directories[item].path == directory ? styles['sidebar-button_current'] : null,
                                    !isCollapsed ? styles['sidebar-button_only_icon'] : null
                                )}
                        >
                            <Link href={directories[item].path} className={styles['sidebar-button__wrap']}>
                                <div className={classNames(styles['sidebar-button__icon'])}>
                                    {directories[item].icon ? directories[item].icon : <></>}
                                </div>
                                <span className={`${styles['sidebar-button__title']}`}>{t(directories[item].title)}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <div className={classNames(
                styles['sidebar-button'],
                styles['sidebar-button_collapse'],
                isCollapsed ? '' : styles['sidebar-button_only_icon'],
                theme == 'dark' ? styles['sidebar-button_dark'] : null                
            )}>
                <div 
                    className={styles['sidebar-button__wrap']} 
                    onClick={() => dispatch(setSidebarCollapsed(!isCollapsed))}>
                    
                    <span className={styles['sidebar-button__icon']}><ChevronLeft/></span>
                    <span className={styles['sidebar-button__title']}>{t("sidebar.collapse")}</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;