import React from "react";
import PlaylistCard from "./PlaylistCard";
import { StaticImageData } from "next/image";
import { Identifier } from "typescript";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";
import { useIsSmaller } from "@hooks/useScreen";

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
    const IsSm = useIsSmaller('sm');

    return( 
        <div className={`block cards my-8 md:my-16 ${className}`}>
            { title ? <Title className="md:mb-2 mb-0">{title}</Title> : '' }

            <div className={IsSm ? "flex items-stretch flex-nowrap -mx-container px-[calc(var(--container-padding)-8px)] overflow-auto" : "row"}>
                {
                    data.map((item) => {
                        return (
                            <div className={IsSm ? "relative w-5/12 flex-shrink-0 px-2" : "col-2xl-2 col-xl-3 col-md-4 col-sm-6"}>
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