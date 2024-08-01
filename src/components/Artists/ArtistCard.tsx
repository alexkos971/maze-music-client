import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { twMerge } from "tailwind-merge";

interface CardContent {
    title: string;
    subtitle?: string;
    link: string;
}

interface CardProps extends CardContent {
    image: string | StaticImport | null;
};

const ArtistCard = ({ image, link, title, subtitle } : CardProps) => {
    let [imageLoaded, setImageLoaded] = useState(true);
    return (
        <>
            <div className={`h-0 md:pb-72 md:max-h-72 pb-40 max-h-42 rounded-lg relative flex flex-col justify-center items-center overflow-hidden w-full group`}>
                <Link href={link} className={twMerge(`
                    absolute top-0 left-0 w-full h-full block bg-gray-400
                    after:absolute after:bottom-0 after:left-0 after:w-full after:opacity-0 group-hover:after:opacity-100 after:h-full after:duration-300 after:bg-gradient-to-t after:from-black after:to-transparent    
                `)}>
                    {image ?
                        <Image 
                            // Hide default image appearence, when not loaded
                            // onError={(e: SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.style.display = 'none'} 
                            src={image} 
                            width={450} 
                            onError={() => setImageLoaded(false)}
                            height={300} 
                            alt="Image" 
                            className={twMerge(`w-full h-full object-cover select-none duration-300 group-hover:scale-105`, !imageLoaded && 'opacity-0')}/>
                        : ''
                    }            

                    <div className={`card__content flex flex-col z-[1] w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}>
                        <h3 className={`md:mb-2 mb-1 font-secondary font-normal md:text-3xl text-2xl text-white text-center`}>{title}</h3>
                        <p className={`text-center text-gray-200 md:text-sm text-xs ${!subtitle || !subtitle.length ? 'opacity-0' : ''}`}>{subtitle ? subtitle : 'empty'}</p>
                    </div>
                </Link>

                {/* <span className={styles['card__play-button']}>
                    <PlayBlack />
                </span> */}
            </div>
        </>
    );
}

export default ArtistCard;