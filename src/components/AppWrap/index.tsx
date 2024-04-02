import { createContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

import Player from "@components/Player";
import Toast from "@components/UI/Toast";
import Modal from "@components/UI/Modal";

export interface AppContextType {};

export const AppContext = createContext<{}>({});

interface AppWrapProps {
    children: ReactNode | JSX.Element
}

export default function AppWrap({ children } : AppWrapProps) {
    const router = useRouter();
    let isAuthPage = router.pathname == '/sign-in' || router.pathname == '/sign-up'; 

    return (                
        <ThemeProvider defaultTheme={'light'} enableSystem storageKey={'theme'}>
            <AppContext.Provider value={{}}>            
                <div className="app-wrap overflow-hidden h-screen flex flex-col justify-end bg-app-background duration-300">
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