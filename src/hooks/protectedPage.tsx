"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyGetSessionInfoQuery } from "@store/api/authApi";
import { directories } from "@helpers/directory";

export default function useProtectedPage (Component: any) {
    
    return function useProtectedPage(props: any) {
        let [trigger] = useLazyGetSessionInfoQuery();
        const { push } = useRouter();
        
        useEffect(() => { 
            const checkSession = async () => {
                const { data } = await trigger('');

                if (!data) {                
                    push(directories.sign_in.path);
                }
            }

            checkSession()
        }, []);
    
        return <Component {...props}/>
    }
}