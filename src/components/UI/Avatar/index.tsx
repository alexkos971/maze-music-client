import { CSSProperties, ReactNode, useState } from "react";
import Image from "next/image";
import styles from "./Avatar.module.scss";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

interface AvatarProps {
    img: string,
    previewText: string,
    size: string,
    textSize?: string,
    onChange?: () => void,
    className?: string,
    additionalEditContent?: ReactNode
}

export default function Avatar({ img, previewText, size = '40px', textSize = '12px', onChange, className, additionalEditContent } : AvatarProps) {
    const {t} = useTranslation('common');
    const [hasError, setHasError] = useState(false);

    return (
        <div 
            className={classNames(
                styles.avatar, 
                hasError && styles.avatar_error,
                onChange ? styles.avatar_can_change : null, 
                className ?? ''
            )} 
            data-text={previewText ?? ''}
            style={{'--avatar-size': size, '--text-size': textSize} as CSSProperties}
            onClick={onChange}
        >

            {img && img.length ?            
                <Image 
                    onError={() => setHasError(true)}
                    src={img} 
                    alt=''
                    width={600}
                    height={600}
                /> : <></>
            }

            <div className={styles.avatar__edit}>                                        
                <span>{t('interface.change')}</span>
                {additionalEditContent ?? <></>}
            </div>
        </div>
    );
}