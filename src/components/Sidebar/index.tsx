import React from "react";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";
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

    const menu_pages = ['for_you', "library"];
    const sidebar_menu = menu_pages.map((item : string) => directories[item]);

    return (
        <aside 
            className={`sidebar w-full shrink-0 h-screen flex flex-col items-center ${isCollapsed ? 'sidebar_collapsed pt-[26px]' : 'pt-[20px]'} pb-[32px] border-r border-r-gray-de duration-500`}
            style={{maxWidth: isCollapsed ? 250: 90 }}>

            <div className={`logo sidebar__logo w-full ${isCollapsed ? 'pr-8 pl-5' : 'px-6'}`}>
                <Image src={isCollapsed ? Logo : LogoIcon} alt="Logo" width={0} height={0} className="max-h-[42px] w-full h-auto"/>
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
                                    {item.icon ? <Image src={item.icon} alt="Icon" width={0} height={0}/> : ''}
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