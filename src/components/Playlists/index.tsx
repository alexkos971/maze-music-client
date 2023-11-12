import React from "react";
import Card from "@components/ui/Card";
import { StaticImageData } from "next/image";
import { Identifier } from "typescript";
import Slider from "@components/ui/Slider";

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

    return( 
        <div className={`block cards mt-8 ${className}`}>
            { title ? <h2 className="text-4xl font-semibold mb-5">{title}</h2> : '' }

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
                                    subtitle={item.tracks.length + ' Tracks'}
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