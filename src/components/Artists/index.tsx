import React from "react";
import Card from "@components/UI/Card";
import { StaticImageData } from "next/image";
import { Identifier } from "typescript";
import Slider from "@components/UI/Slider";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";

type ArtistsProps = {
    title?: string,
    className?: string,
    slidesToShow?: number | undefined,
    data: {
        id: string;
        avatar?: string | StaticImageData | undefined | null,
        name:string,
        followers: Identifier[] | Number[], 
        albums: Identifier[] | Number[]
    }[]
};

const Artists = ({title, data, slidesToShow, className}: ArtistsProps) => {    
    let {t} = useTranslation('common');
    let albums_title = t('interface.albums');
    let followers_title = t('interface.followers');

    return( 
        <div className={`cards block mt-8 pb-8 ${className}`}>
            { title ? <Title>{title}</Title> : '' }

            <Slider options={{slidesToShow: slidesToShow ?? 2.5}}>
                {
                    data.map((item) => {
                        let subtitle = '';
                        
                        if (item.albums?.length) {
                            subtitle += `${item.albums.length} ${albums_title}`;
                        }

                        if (item.followers?.length){
                            if (subtitle.length) {
                                subtitle += ' | ';
                                subtitle += `${item.followers.length} ${followers_title}`;
                            }
                        }


                        return (
                            <Slider.Item key={item.id}>
                                <Card                                    
                                    link={`/artist/${item.id}`}
                                    image={item.avatar ?? null}
                                    title={item.name}
                                    options={{size: 'large'}}
                                    subtitle={subtitle}
                                />

                            </Slider.Item>
                        )
                    })
                }
            </Slider>
        </div>
    );
};

export default Artists;