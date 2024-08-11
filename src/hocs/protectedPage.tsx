"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyGetSessionInfoQuery } from "@store/api/authApi";
import { basePage, authPage } from "@utils/directory";
import { cookieGetItem } from "@utils";

export default function ProtectedPage (Component: any) {
    
    return function useProtectedPage(props: any) {
        let [trigger] = useLazyGetSessionInfoQuery();
        const router = useRouter();
        const [isLoaded, setIsLoaded] = useState(true);
        
        const checkSession = async (isAuthPage: boolean) => {
            let {isError} = await trigger('');

            
            if (isError && !isAuthPage) {                
                router.replace(authPage.path);
            } 
            
            else if (!isError && isAuthPage ) {
                router.replace(basePage.path);
            }            

            else {
                setIsLoaded(true);
            }
        }

        useEffect(() => { 
            let isAuthPage = router.pathname == '/sign-in' || router.pathname == '/sign-up'; 

            // if ( typeof window !== "undefined" && !cookieGetItem('token') ) {
            //     router.replace(authPage.path);
            // } else {
            // }
            checkSession(isAuthPage);
        }, []);

        if (!isLoaded) {
            return <></>
        }
    
        return <Component {...props}/>
    }
}