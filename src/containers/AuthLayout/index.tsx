import { ReactNode, useEffect, useState } from "react";
import styles from "./AuthLayout.module.scss";

import { Logo, LogoForDark } from "@utils/images";
import { useTheme } from "next-themes";

interface Props {
    children?: ReactNode,
    size?: 'small' | 'large'
}

const AuthLayout = ({ children, size = 'small' } : Props) => {
    let cardWrapClass = size == 'large' ? 'col-sm-10 offset-sm-1' : 'col-lg-6 offset-lg-3 col-sm-8 offset-sm-2'
    let [ isLoaded, setIsLoaded ] = useState(false);
    const { theme } = useTheme()

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 2000);
    }, []);

    return (
        <div className={`${styles.auth} ${ isLoaded ? styles.auth_loaded : ''}`}>
            <div className="min-h-screen w-full flex items-center my-6">
                <div className="container">
                    <div className="row">                    
                        <div className={cardWrapClass}>
                            <div className={styles.auth__card}>
                                <div className={styles.auth__logo}>
                                    {theme == 'dark' ? <LogoForDark/> :  <Logo/>}
                                </div>

                                <div className={styles.auth__content}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;