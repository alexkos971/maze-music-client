"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyGetSessionInfoQuery } from "@store/api/authApi";
import { basePage, authPage } from "@helpers/directory";

export default function useProtectedPage (Component: any) {
    
    return function useProtectedPage(props: any) {
        let [trigger] = useLazyGetSessionInfoQuery();
        const router = useRouter();
        
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
            }
            checkSession();
        }, []);
    
        return <Component {...props}/>
    }
}