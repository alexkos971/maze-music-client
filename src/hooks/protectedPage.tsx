"use client";

import { useEffect } from "react";
// import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function useProtectedPage (Component: any) {
    return function useProtectedPage(props: any) {
        const isAuthentificated = false;
        const router = useRouter();
    
        useEffect(() => {
            if (!isAuthentificated) {
                router.replace('/sign-in');
            }
        }, []);
    
        return <Component {...props}/>
    }
}