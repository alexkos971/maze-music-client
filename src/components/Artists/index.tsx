import React from "react";
import ArtistCard from "./ArtistCard";
import Slider from "@components/UI/Slider";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";
import { useIsGreater } from "@hooks/useScreen";
import { twMerge } from "tailwind-merge";

type ArtistsProps = {
    title?: string,
    className?: string,
    slidesToShow?: number | undefined,
    data: ArtistDto[]
};

const Artists = ({title, data, slidesToShow, className}: ArtistsProps) => {    
    let {t} = useTranslation('common');
    let albums_title = t('interface.albums');
    let followers_title = t('interface.followers');
    let desktopScreen = useIsGreater('sm');

    return( 
        <div className={twMerge(`cards block max-md:my-8 my-16`, className)}>
            { title ? <Title>{title}</Title> : '' }

            <Slider options={{
                slidesToShow: slidesToShow ?? (desktopScreen ? 2.5 : 1),
                withArrows: true
            }}>
                {
                    data.map((item) => {
                        let subtitle = [];

                        subtitle.push(`${item.albums.length} ${albums_title}`);
                        subtitle.push(`${item.followers} ${followers_title}`);

                        return (
                            <Slider.Item key={item._id}>
                                <ArtistCard                                    
                                    link={`/artist/${item._id}`}
                                    image={item.avatar ?? null}
                                    title={item.full_name}
                                    subtitle={subtitle.join(' | ')}
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