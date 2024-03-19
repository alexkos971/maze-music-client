import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";

import { lsGetItem } from "@helpers/localstorage";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { useAppSelector, useAppDispatch } from "@hooks/index";
import { setSidebarCollapsed } from "@store/reducers/interfaceReducer";
import { Logo, LogoIcon } from "@helpers/images";
import { directories } from "@helpers/directory";

const Sidebar : React.FC = () => {
    const [isCollapsed] = useAppSelector(state => [state.interface.sidebar_is_collapsed]);
    const dispatch = useAppDispatch();
    const directory = useRouter().pathname;

    const {t} = useTranslation('common');

    const menu_pages = ['for_you', "library", 'upload'];
    const sidebar_menu = menu_pages.map((item : string) => directories[item]);

    useEffect(() => {
        let sidebarState = lsGetItem('sidebar_is_collapsed');
        dispatch(setSidebarCollapsed( typeof sidebarState === 'boolean' ? sidebarState : false ));
    }, []);

    return (
        <aside 
            className={`sidebar w-full shrink-0 h-screen flex flex-col items-center pt-[26px] ${isCollapsed ? 'sidebar_collapsed' : ''} pb-2 border-r border-r-gray-de duration-500`}
            style={{maxWidth: isCollapsed ? 250: 90 }}>

            <div className={`${styles['sidebar__logo']} ${isCollapsed ? 'pr-8 pl-5' : 'px-6'}`}>
                {isCollapsed ? <Logo/> : <LogoIcon/>}
            </div>

            <ul className="sidebar__menu flex flex-col w-full mt-8">
                {
                    sidebar_menu.map((item, index) => (
                        <li 
                            key={index + item.title}
                            className={`${styles['sidebar-button']} ${item.path == directory ? styles['sidebar-button_current'] : ''} ${isCollapsed ? '' : styles['sidebar-button_only_icon']}`}
                        >
                            <Link href={item.path} className={styles['sidebar-button__wrap']}>
                                <div className={`${styles['sidebar-button__icon']}`}>
                                    {item.icon ? <item.icon/> : ''}
                                </div>
                                <span className={`${styles['sidebar-button__title']}`}>{t(item.title)}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <div className={`${styles['sidebar-button']} ${styles['sidebar-button_collapse']} ${isCollapsed ? '' : styles['sidebar-button_only_icon']}`}>
                <div 
                    className={styles['sidebar-button__wrap']} 
                    onClick={() => dispatch(setSidebarCollapsed(!isCollapsed))}>
                    
                    <span className={styles['sidebar-button__title']}>{t("sidebar.collapse")}</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;