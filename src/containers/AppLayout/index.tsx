"use client";

import { createContext, ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

import Player from "@components/Player";
import Toast from "@components/UI/Toast";
import Modal from "@components/UI/Modal";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@hooks";
import { directories } from "@utils/directory";
import { setDirectory } from "@store/reducers/interfaceReducer";
import { lsGetItem } from "@utils/localstorage";
import classNames from "classnames";
import {THEME_COLORS} from "@utils/colors";

export interface AppContextType {};

export const AppContext = createContext<{}>({});

interface AppWrapProps {
    children: ReactNode | JSX.Element
}

export default function AppLayout({ children } : AppWrapProps) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    let current_locale = lsGetItem('i18nLanguage');  
    const [ hasMounted, setHasMounted ] = useState(false);

    let isAuthPage = router.pathname == '/sign-in' || router.pathname == '/sign-up'; 

    // Keep current path in store with additional props
    useEffect(() => {
        for (let val in directories) {
            if (pathname?.includes(directories[val].path)) {
            dispatch(setDirectory({
                title: directories[val].title,
                path: directories[val].path,
            }))
            }
        }
    }, [pathname, current_locale]);

    useEffect(() => {
        setHasMounted(true);
        
        // Set global colors variables
        Object.keys(THEME_COLORS).forEach((item) => {
            document.documentElement.style.setProperty(`--${item}`, THEME_COLORS[item]);
        });

        // Hide images, which not loaded correctly
        // document.addEventListener('error', (e : SyntheticEvent<Document, Event>) => {
            // console.log(e);
        // })
    });
  
    // this line is the key to avoid the error.
    if (!hasMounted) return null;

    return (                
        <ThemeProvider 
            defaultTheme={'light'} 
            enableSystem         
            storageKey={'theme'}>

            <AppContext.Provider value={{}}>            
                <div 
                    className={classNames(
                        "app-layout bg-white dark:bg-gray-700 duration-300 min-h-screen flex flex-col"
                    )}>

                    {children}
                    
                    <Toast />
                    <Modal/>

                    {/* Player */}
                    { !isAuthPage ? <Player/> : <></> }
                </div>
            </AppContext.Provider>
        </ThemeProvider>
    )
}