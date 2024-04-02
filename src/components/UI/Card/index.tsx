import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PlayBlack, PauseBlack } from "@helpers/images";
import styles from "./Card.module.scss";

interface CardContent {
    title: string;
    subtitle?: string;
    link: string;
    options?: {
        size?: 'small' | 'medium' | 'large';
        playButton?: boolean
    }
}

interface CardProps extends CardContent {
    image: string | StaticImport | null;
};

const CardContent = ({ options, title, subtitle, link } : CardContent) => {
    let Title: React.FC<React.HTMLAttributes<HTMLElement> & {children: ReactNode}> = ({ children, ...rest }) => (options?.size == 'small' ? <Link href={link} {...rest}>{children}</Link> : <h3 {...rest}>{children}</h3>);

    return (
        <div className={`card__content flex flex-col z-[1] w-full ${options?.size === 'small' ? 'w-full px-4 py-2' : 'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'}`}>
            <Title className={`font-secondary ${options?.size === 'small' ? 'text-left text-xl font-semibold text-black-36' : 'text-center text-3xl text-white'}`}>{title}</Title>
            <p className={`${options?.size === 'small' ? 'text-left mt-1 text-sm text-black' : 'text-center mt-2 text-gray-ee text-sm'} ${!subtitle || !subtitle.length ? 'opacity-0' : ''}`}>{subtitle ? subtitle : 'empty'}</p>
        </div>
    );
}

const Card = ({ image, link, title, subtitle, options = { size: 'small', playButton: false } } : CardProps) => {
    return (
        <>
            <div className={`${styles.card} ${styles[`card_${options.size}`]} rounded-lg bg-white relative flex flex-col justify-center items-center overflow-hidden w-full`}>
                <Link href={link} className={`${styles.card__image} absolute top-0 left-0 w-full h-full block bg-black-36`}>
                    {image ?
                        <Image src={image} width={0} height={0} alt="Image" className="w-full h-full object-cover select-none"/>
                        : ''
                    }            

                    { options?.size == 'large' ? <CardContent {...{ title, subtitle, options, link }} /> : ''}
                </Link>

                {
                    options.playButton ?
                        <span className={styles['card__play-button']}>
                            <PlayBlack />
                        </span>
                    : ''
                }
            </div>

            { options?.size == 'small' ? <CardContent {...{ title, subtitle, options, link }} /> : ''}
        </>
    );
}

export default Card;