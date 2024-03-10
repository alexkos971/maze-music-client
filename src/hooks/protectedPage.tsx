"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setProfile } from "@store/reducers/profileReducer";
import { useLazyGetSessionInfoQuery } from "@store/api/authApi";
import { basePage, authPage } from "@helpers/directory";

export default function useProtectedPage (Component: any) {
    
    return function useProtectedPage(props: any) {
        let [trigger] = useLazyGetSessionInfoQuery();
        const router = useRouter();
        const dispatch = useAppDispatch();
        let profile = useAppSelector(state => state.profile);
        
        useEffect(() => { 
            const checkSession = async () => {
                let {isError, data} = await trigger('');

                let isAuthPage = router.pathname == '/sign-in' || router.pathname == '/sign-up'; 
                
                if (isError && !isAuthPage) {                
                    router.replace(authPage.path);
                    dispatch(setProfile(null))
                } 
                
                else if (!isError && isAuthPage ) {
                    router.replace(basePage.path);

                }
                
                if (!profile && data) {
                    dispatch(setProfile(data))
                }
            }
            checkSession();
        }, []);
    
        return <Component {...props}/>
    }
}