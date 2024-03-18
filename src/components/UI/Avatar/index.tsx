import { CSSProperties } from "react";
import Image from "next/image";
import styles from "./Avatar.module.scss";
import { useTranslation } from "next-i18next";
import { classnames } from "@helpers/classnames";

interface AvatarProps {
    img: string,
    previewText: string,
    size: string,
    onChange?: () => void
}

export default function Avatar({ img, previewText, size = '40px', onChange } : AvatarProps) {
    const {t} = useTranslation('common');

    return (
        <div 
            className={classnames(styles.avatar, onChange ? styles.avatar_can_change : null)} 
            data-text={previewText.length ? previewText.split(" ").reduce((item, acc) => item[0] + acc[0]) : ''}
            style={{'--avatar-size': size} as CSSProperties}
        >

            {img && img.length ?            
                <Image 
                    src={img} 
                    alt='Avatar'
                    width={600}
                    height={600}
                /> : <></>
            }

            <div 
                className={styles.avatar__edit}
                onClick={onChange}>                                        
                <span>{t('interface.change')}</span>
            </div>
        </div>
    );
}