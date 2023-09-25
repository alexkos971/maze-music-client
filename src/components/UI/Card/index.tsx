import React from "react";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CardProps {
    image: string | StaticImport | null;
    link: string;
    title: string;
    subtitle?: string
};

const Card = ({ image, link, title, subtitle } : CardProps) => {
    return (
        <Link href={link} className="card rounded-lg bg-white relative h-0 pb-[min(100%,290px)] max-h-[290px] flex flex-col justify-center items-center overflow-hidden w-full">
            <div className="card__image absolute top-0 left-0 w-full h-full block bg-black-36
            after:bg-gradient-to-t after:from-black after:to-transparent after:h-1/2 after:w-full after:block after:absolute after:bottom-0 after:left-0
            ">
                {image ?
                    <Image src={image} width={0} height={0} alt="Image" className="w-full h-full object-cover select-none"/>
                    : ''
                }            
            </div>

            <div className="card__content flex flex-col z-[1] w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <h3 className="text-center text-white text-3xl">{title}</h3>
                <p className={`text-center text-gray-ee text-sm mt-2 ${!subtitle || !subtitle.length ? 'opacity-0' : ''}`}>{subtitle ? subtitle : 'empty'}</p>
            </div>
        </Link>
    );
}

export default Card;