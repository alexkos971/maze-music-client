import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PlayBlack, PauseBlack } from "@helpers/images";
import styles from "./Card.module.scss";

interface CardProps {
    image: string | StaticImport | null;
    link: string;
    title: string;
    subtitle?: string;
    options?: {
        size?: 'small' | 'medium' | 'large';
        playButton?: boolean
    }
};

const Card = ({ image, link, title, subtitle, options = { size: 'small', playButton: false } } : CardProps) => {
    const height = 'h-0 pb-[min(20.1388vw,290px)] max-h-[290px]';
    // const height = 'h-[min(100%,290px)]'; 

    return (
        <Link href={link} className={`${styles.card} rounded-lg bg-white relative ${height} flex flex-col justify-center items-center overflow-hidden w-full`}>
            <div className={`${styles.card__image} absolute top-0 left-0 w-full h-full block bg-black-36
                after:bg-gradient-to-t after:from-black after:to-transparent after:h-full after:w-full after:block after:absolute after:bottom-0 after:left-0
            `}>
                {image ?
                    <Image src={image} width={0} height={0} alt="Image" className="w-full h-full object-cover select-none"/>
                    : ''
                }            
            </div>

            {
                options.playButton ?
                    <span className={`${styles['card__play-button']} duration-300 opacity-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[calc(-50%+32px)] w-14 h-14 rounded-full bg-green-05 flex items-center justify-center cursor-pointer z-[1]`}>
                        <Image src={PlayBlack} width={0} height={0} alt={`Play`} className="w-8 h-8"/>
                    </span>
                : ''
            }
 
            <div className={`card__content flex flex-col z-[1] w-full absolute ${options.size === 'small' ? 'top-auto bottom-0 w-full p-4' : 'top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'}`}>
                <h3 className={`${options.size === 'small' ? 'text-left text-lg' : 'text-center text-3xl'} text-white`}>{title}</h3>
                <p className={`${options.size === 'small' ? 'text-left mt-1' : 'text-center mt-2'} text-gray-ee text-sm ${!subtitle || !subtitle.length ? 'opacity-0' : ''}`}>{subtitle ? subtitle : 'empty'}</p>
            </div>
        </Link>
    );
}

export default Card;