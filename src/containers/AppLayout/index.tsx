"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

import Player from "@components/Player";
import Toast from "@components/UI/Toast";
import Modal from "@components/UI/Modal";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@hooks";
import { directories } from "@helpers/directory";
import { setDirectory } from "@store/reducers/interfaceReducer";
import { lsGetItem } from "@helpers/localstorage";
import classNames from "classnames";

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

    useEffect(() => setHasMounted(true));
  
    // this line is the key to avoid the error.
    if (!hasMounted) return null;

    return (                
        <ThemeProvider 
            defaultTheme={'light'} 
            enableSystem 
            storageKey={'theme'}>
            <AppContext.Provider value={{}}>            
                <div className={classNames(
                    "app-wrap bg-app-background duration-300",
                    "max-md:overflow-clip relative h-screen"
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