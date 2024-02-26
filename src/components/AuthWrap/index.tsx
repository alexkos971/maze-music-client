import { ReactNode, useEffect, useState } from "react";
import styles from "./AuthWrap.module.scss";

import { Logo } from "@helpers/images";

interface Props {
    children?: ReactNode,
    size?: 'small' | 'large'
}

const AuthWrap = ({ children, size = 'small' } : Props) => {
    let cardWrapClass = size == 'large' ? 'col-sm-10 offset-sm-1' : 'col-lg-6 offset-lg-3 col-sm-8 offset-sm-2'
    let [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 2000);
    }, []);

    return (
        <div className={`${styles.auth} ${ isLoaded ? styles.auth_loaded : ''}`}>
            <div className="container">
                <div className="row">                    
                    <div className={cardWrapClass}>
                        <div className={styles.auth__card}>
                            <div className={styles.auth__logo}>
                                <Logo/>
                            </div>

                            <div className={styles.auth__content}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthWrap;