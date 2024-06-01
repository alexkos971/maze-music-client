import { useEffect } from "react";
import { useRouter } from "next/router";
import { basePage } from "@utils/directory"

export default function Home() {    
    const router = useRouter();

    // Initial Setups
    useEffect(() => {    
        // Initial path
        router.push(basePage.path);
    }, []);

    return (
        <>
        </>
    );
}