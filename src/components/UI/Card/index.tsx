import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PlayBlack, PauseBlack } from "@helpers/images";
import styles from "./Card.module.scss";

interface CardContent {
    title: string;
    subtitle?: string;
    options?: {
        size?: 'small' | 'medium' | 'large';
        playButton?: boolean
    }
}

interface CardProps extends CardContent {
    image: string | StaticImport | null;
    link: string;
};

const CardContent = ({ options, title, subtitle } : CardContent) => {
    return (
        <div className={`card__content flex flex-col z-[1] w-full ${options?.size === 'small' ? 'w-full px-4 py-2' : 'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'}`}>
            <h3 className={`${options?.size === 'small' ? 'text-left text-xl font-semibold text-black-36' : 'text-center text-3xl text-white'}`}>{title}</h3>
            <p className={`${options?.size === 'small' ? 'text-left mt-1 text-base text-black' : 'text-center mt-2 text-gray-ee text-sm'} ${!subtitle || !subtitle.length ? 'opacity-0' : ''}`}>{subtitle ? subtitle : 'empty'}</p>
        </div>
    );
}

const Card = ({ image, link, title, subtitle, options = { size: 'small', playButton: false } } : CardProps) => {
    const height = 'h-0 pb-[min(20.1388vw,290px)] max-h-[290px]';
    // const height = 'h-[min(100%,290px)]'; 

    return (
        <>
            <div className={`${styles.card} rounded-lg bg-white relative ${height} flex flex-col justify-center items-center overflow-hidden w-full`}>
                <Link href={link} className={`${styles.card__image} absolute top-0 left-0 w-full h-full block bg-black-36`}>
                    {image ?
                        <Image src={image} width={0} height={0} alt="Image" className="w-full h-full object-cover select-none"/>
                        : ''
                    }            

                    { options?.size == 'large' ? <CardContent {...{ title, subtitle, options }} /> : ''}
                </Link>

                {
                    options.playButton ?
                        <span className={`${styles['card__play-button']} duration-300 opacity-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[calc(-50%+32px)] w-14 h-14 rounded-full bg-green-05 flex items-center justify-center cursor-pointer z-[1]`}>
                            <Image src={PlayBlack} width={0} height={0} alt={`Play`} className="w-8 h-8"/>
                        </span>
                    : ''
                }
            </div>

            { options?.size == 'small' ? <CardContent {...{ title, subtitle, options }} /> : ''}
        </>
    );
}

export default Card;