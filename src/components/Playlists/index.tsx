import React from "react";
import Card from "@components/UI/Card";
import { StaticImageData } from "next/image";
import { Identifier } from "typescript";
import Slider from "@components/UI/Slider";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";

type PlaylistsProps = {
    title?: string,
    className?: string,
    slidesToShow?: number | undefined,
    data: {
        id: string;
        feature?: string | StaticImageData | undefined | null,
        name:string,
        author: string,
        tracks: Array<Identifier | number | string>
    }[]
};

const Playlists = ({title, data, slidesToShow, className}: PlaylistsProps) => {    
    const {t} = useTranslation();
    const tracks_title = t('interface.tracks');

    return( 
        <div className={`block cards mt-8 ${className}`}>
            { title ? <Title>{title}</Title> : '' }

            <Slider options={{
                slidesToShow: 4,
                withDots: false
            }}>
                {
                    data.map((item) => {
                        return (
                            <Slider.Item key={item.id}>
                                <Card                                    
                                    link={`/artist/${item.id}`}
                                    image={item.feature ?? null}
                                    title={item.name}
                                    options={{size: "small", playButton: true}}
                                    subtitle={`${item.tracks.length} ${tracks_title}`}
                                />

                            </Slider.Item>
                        )
                    })
                }
            </Slider>
        </div>
    );
};

export default Playlists;