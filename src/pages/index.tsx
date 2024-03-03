import { useEffect } from "react";
import { useRouter } from "next/router";
import { basePage } from "@helpers/directory"

export default function Home() {    
    const router = useRouter();

    // Initial Setups
    useEffect(() => {    
        // Initial path
        // router.push('/for-you');
        router.push(basePage.path);
    }, []);

    return (
        <>
        </>
    );
}