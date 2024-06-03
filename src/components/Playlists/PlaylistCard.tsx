import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface CardContent {
    title: string;
    subtitle?: string;
    link: string;
    className?: string;
}

interface CardProps extends CardContent {
    image: string | StaticImport | null;
};

const PlaylistCard = ({ image, link, title, subtitle, className } : CardProps) => {
    return (
        <>
            <div className={twMerge(`h-0 pb-[100%] md:pb-56 md:max-h-56 rounded-md md:rounded-lg relative flex flex-col justify-center items-center overflow-hidden w-full group`, className ?? '')}>
                <Link href={link} className={`
                    absolute top-0 left-0 w-full h-full block bg-gray-400
                    after:absolute after:z-1 after:bottom-0 after:left-0 after:w-full after:h-full after:block after:opacity-0 group-hover:after:opacity-100 after:duration-300 after:bg-gradient-to-t after:from-black after:to-transparent    
                `}>
                    {image ?
                        <Image src={image} width={300} height={300} alt="Image" className={`w-full h-full object-cover select-none duration-300 group-hover:scale-105`}/>
                        : ''
                    }            
                </Link>

                {/* <span className={styles['card__play-button']}>
                    <PlayBlack />
                </span> */}
            </div>

            <div className={`card__content flex flex-col z-[1] w-full px-1 md:px-4 py-2`}>
                <Link 
                    href={link}
                    className={`font-secondary text-left text-sm md:text-xl font-semibold text-gray-500 dark:text-white`}>{title}</Link>
                <p className={`text-left md:mt-1 text-xs md:text-sm text-gray-300 ${!subtitle || !subtitle.length ? 'opacity-0' : ''}`}>{subtitle ? subtitle : 'empty'}</p>
            </div>
        </>
    );
}

export default PlaylistCard;