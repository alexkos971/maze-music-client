import React, { SyntheticEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CardContent {
    title: string;
    subtitle?: string;
    link: string;
}

interface CardProps extends CardContent {
    image: string | StaticImport | null;
};

const ArtistCard = ({ image, link, title, subtitle } : CardProps) => {
    return (
        <>
            <div className={`h-0 pb-72 max-h-72 rounded-lg relative flex flex-col justify-center items-center overflow-hidden w-full group`}>
                <Link href={link} className={`
                    absolute top-0 left-0 w-full h-full block bg-gray-400
                    after:absolute after:bottom-0 after:left-0 after:w-full after:opacity-0 group-hover:after:opacity-100 after:h-full after:duration-300 after:bg-gradient-to-t after:from-black after:to-transparent    
                `}>
                    {image ?
                        <Image 
                            // Hide default image appearence, when not loaded
                            // onError={(e: SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.style.display = 'none'} 
                            src={image} 
                            width={450} 
                            height={300} 
                            alt="Image" 
                            className={`w-full h-full object-cover select-none duration-300 group-hover:scale-105`}/>
                        : ''
                    }            

                    <div className={`card__content flex flex-col z-[1] w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}>
                        <h3 className={`font-secondary 'text-center text-3xl text-white text-center`}>{title}</h3>
                        <p className={`text-center mt-2 text-gray-200 text-sm ${!subtitle || !subtitle.length ? 'opacity-0' : ''}`}>{subtitle ? subtitle : 'empty'}</p>
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