import { createContext, ReactNode } from "react";
import Toast from "@components/UI/Toast";

export interface AppContextType {};

export const AppContext = createContext<{}>({});

interface AppWrapProps {
    children: ReactNode | JSX.Element
}

export default function AppWrap({ children } : AppWrapProps) {
    
    return (
        <AppContext.Provider value={{}}>
            {children}
            
            <Toast />
        </AppContext.Provider>
    )
}