"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyGetSessionInfoQuery } from "@store/api/authApi";
import { basePage, authPage } from "@helpers/directory";
import { useAppSelector } from "@hooks";

export default function ProtectedPage (Component: any) {
    
    return function useProtectedPage(props: any) {
        let [trigger] = useLazyGetSessionInfoQuery();
        const router = useRouter();
        const profile = useAppSelector(state => state.profile);
        const [isLoaded, setIsLoaded] = useState(true);
        
        // useEffect(() => {
        //     console.log(profile);
        // }, [profile])

        useEffect(() => { 
            const checkSession = async () => {
                let {isError} = await trigger('');

                let isAuthPage = router.pathname == '/sign-in' || router.pathname == '/sign-up'; 
                
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
            checkSession();
        }, []);

        if (!isLoaded) {
            return <></>
        }
    
        return <Component {...props}/>
    }
}