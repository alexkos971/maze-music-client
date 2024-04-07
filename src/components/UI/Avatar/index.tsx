import { CSSProperties } from "react";
import Image from "next/image";
import styles from "./Avatar.module.scss";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

interface AvatarProps {
    img: string,
    previewText: string,
    size: string,
    onChange?: () => void,
    className?: string
}

export default function Avatar({ img, previewText, size = '40px', onChange, className } : AvatarProps) {
    const {t} = useTranslation('common');

    return (
        <div 
            className={classNames(styles.avatar, onChange ? styles.avatar_can_change : null, className ?? '')} 
            data-text={previewText.length ? previewText.split(" ").reduce((item, acc) => item[0] + acc[0]) : ''}
            style={{'--avatar-size': size} as CSSProperties}
            onClick={onChange}
        >

            {img && img.length ?            
                <Image 
                    src={img} 
                    alt='Avatar'
                    width={600}
                    height={600}
                /> : <></>
            }

            <div className={styles.avatar__edit}>                                        
                <span>{t('interface.change')}</span>
            </div>
        </div>
    );
}