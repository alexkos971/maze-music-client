"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { screenIsGreater } from "@hooks/useScreen";

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

let SidebarButton = ({ 
    text = '',
    icon,
    isCurrent = false,
    mobileMenu = false
}: {
    text: string, icon?: JSX.Element, isCurrent?: boolean, mobileMenu?: boolean
}) => {
    return (
        <div className={
            classNames(
                'sidebar-button flex px-4 w-full relative',
                !mobileMenu && `after:h-7 after:w-[1.5px] after:bg-gray-4a after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 ${!isCurrent ? 'after:opacity-0' : ''}`    
            )}>
            <div className={classNames(
                "sidebar-button__wrap flex items-center max-md:flex-col md:justify-start rounded-lg py-3 px-4 duration-300 w-full cursor-pointer md:hover:bg-gray-f5 dark:md:hover:bg-gray-3e",

            )}>
                <div className={`w-6 h-6 duration-300 ${!isCurrent ? 'opacity-50' : 'opacity-100'} flex-shrink-0 text-black-36 dark:text-white svg-current-color`}>
                    {icon ?? <></>}
                </div>
                <span className={`md:ml-4 md:mt-[2px] max-md:font-secondary text-black-36 dark:text-gray-f5 text-base max-md:text-xs font-medium md:font-semibold leading-5 ${!isCurrent ? 'opacity-50' : 'opacity-100'} duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}>{text}</span>
            </div>
        </div>
    )
}

const Sidebar : React.FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation('common');
    const { theme } = useTheme();
    
    const isCollapsed = useAppSelector(state => state.interface.sidebar_is_collapsed);
    const directory = useRouter().pathname;

    let screenIsGreaterSm = screenIsGreater('sm');
    let screenIsGreaterLg = screenIsGreater('lg');

    const menu_pages = ['for_you', "library", 'upload'];

    useEffect(() => {
        let newState = false;

        let sidebarState = lsGetItem('sidebar_is_collapsed');
        
        if (screenIsGreaterLg && typeof sidebarState === 'boolean') {
            newState = sidebarState;
        }
        
        dispatch(setSidebarCollapsed( newState ));
    }, [screenIsGreaterLg]);

    const sidebarRef = useRef<HTMLElement>(null);    

    useEffect(() => {
        sidebarRef?.current?.clientWidth ? document.documentElement.style.setProperty('--sidebar-width', (isCollapsed ? 250 : 90) + 'px') : false;
    }, [isCollapsed]);

    let logoStyle = 'w-auto h-full';

    return (
        <aside 
            ref={sidebarRef}
            className={
                classNames(
                    `w-full shrink-0 flex md:flex-col items-center md:pt-[26px] md:pb-2 border-r border-r-gray-de relative overflow-hidden dark:border-r-gray-4a dark:bg-app-background-secondary duration-300`,
                    'max-md:fixed max-md:w-full max-md:left-0 max-md:bottom-0 max-md:z-20 max-md:bg-[linear-gradient(180deg,rgba(255,255,255,0.82)0%,rgba(255,255,255,1)66%)]',
                    isCollapsed ? 'sidebar_collapsed lg:max-w-[250px] md:max-w-[90px]' : 'md:max-w-[90px]'
                )
            }>

            {
            screenIsGreaterSm ?
                <div className={classNames('w-full h-auto max-h-7 flex justify-center max-md:hidden', isCollapsed ? 'lg:pr-8 lg:pl-5' : 'px-6')}>
                    {isCollapsed ? ( theme == 'dark' ? <LogoForDark className={logoStyle}/> : <Logo className={logoStyle}/>) : <LogoIcon className={logoStyle}/>}
                </div>
            : <></>    
            }

            <ul className="sidebar__menu flex md:flex-col w-full md:mt-8 max-md:items-center max-md:w-full max-md:justify-around">
                {
                    menu_pages.map((item, index) => (
                        <li key={index + directories[item].title}>
                            <Link href={directories[item].path} className={index != 0 ? "block md:mt-4" : ''}>
                                <SidebarButton
                                    isCurrent={directories[item].path == directory}
                                    mobileMenu={!screenIsGreaterSm}
                                    text={t(directories[item].title)}
                                    icon={directories[item].icon}
                                />
                            </Link>
                        </li>
                    ))
                }
            </ul>

            {
                screenIsGreaterLg ?
                <button type="button" className="block mt-auto w-full" onClick={() => dispatch(setSidebarCollapsed(!isCollapsed))}>
                    <SidebarButton
                        isCurrent={false}
                        text={t("sidebar.collapse")}
                        icon={
                            <div className={classNames(`w-full h-full duration-300`, !isCollapsed && "-scale-x-100" )}>
                                <ChevronLeft/>
                            </div>
                        }
                    />
                </button>
                : <></>
            }
        </aside>
    );
}

export default Sidebar;