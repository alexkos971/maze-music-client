import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {    
    const router = useRouter();

    // Initial Setups
    useEffect(() => {    
        // Initial path
        // router.push('/for-you');
        router.push('/sign-in');
    }, []);

    return (
        <>
        </>
    );
}