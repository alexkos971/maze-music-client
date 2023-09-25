import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const { push } = useRouter();
    
    useEffect(() => {
        push('/for-you');
    }, []);


    return (
        <>
        </>
    );
}