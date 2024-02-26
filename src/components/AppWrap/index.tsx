import { createContext, ReactNode, useState, SetStateAction, Dispatch } from "react";
import Toast, { ToastProps } from "@components/UI/Toast";

export interface AppContextType {
    showToast: Dispatch<SetStateAction<false | ToastProps>>
};

export const AppContext = createContext<AppContextType>({
    showToast: () => undefined
});

interface AppWrapProps {
    children: ReactNode | JSX.Element
}

export default function AppWrap({ children } : AppWrapProps) {

    // Toast
    const [toast, showToast] = useState<ToastProps | false>(false);

    return (
        <AppContext.Provider value={{ showToast }}>
            {children}

            <Toast 
                text={toast ? toast.text : ''} 
                type={toast ? toast.type : 'hidden'}/>
        </AppContext.Provider>
    )
}