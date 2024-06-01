import React from "react";
import PlaylistCard from "./PlaylistCard";
import { StaticImageData } from "next/image";
import { Identifier } from "typescript";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";

type PlaylistsProps = {
    title?: string,
    className?: string,
    slidesToShow?: number | undefined,
    data: {
        id: string;
        link?: string,
        cover?: string | StaticImageData | undefined | null,
        name:string,
        owner: string,
        tracks: Array<Identifier | number | string>
    }[]
};

const Playlists = ({title, data, slidesToShow, className}: PlaylistsProps) => {    
    const {t} = useTranslation();
    const tracks_title = t('interface.tracks');

    return( 
        <div className={`block cards my-16 ${className}`}>
            { title ? <Title className="md:mb-2 mb-0">{title}</Title> : '' }


            <div className="row">
                {
                    data.map((item) => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <PlaylistCard     
                                    className="mt-3"                               
                                    link={item.link ?? `/playlist/${item.id}`}
                                    image={item.cover ?? null}
                                    title={item.name}
                                    subtitle={`${item.tracks.length} ${tracks_title}`}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Playlists;