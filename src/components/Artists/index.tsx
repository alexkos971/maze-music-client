import Card from "@components/ui/Card";
import { StaticImageData } from "next/image";
import React from "react";
import { Identifier } from "typescript";

type ArtistsProps = {
    title?: string,
    data: {
        id: string;
        avatar?: string | StaticImageData | undefined | null,
        name:string,
        followers: Identifier[] | Number[], 
        albums: Identifier[] | Number[]
    }[]
};

const Artists = ({title, data}: ArtistsProps) => {
    return( 
        <div className="cards block">
            { title ? <h2 className="text-4xl font-semibold mb-5">{title}</h2> : '' }

            <div className="cards__items flex items-stretch mx-[-10px]">
                {
                    data.map((item, index) => {
                        let subtitle = '';
                        
                        if (item.albums?.length) {
                            subtitle += item.albums.length + ' Albums';
                        }

                        if (item.followers?.length){
                            if (subtitle.length) {
                                subtitle += ' | ';
                                subtitle += item.followers.length + ' Followers';
                            }
                        }

                        return (
                            <div key={item.name + '_' +index} className="px-[10px] w-full min-w-[33.33333%]">
                                <Card                                    
                                    link={`/artist/${item.id}`}
                                    image={item.avatar ?? null}
                                    title={item.name}
                                    subtitle={subtitle}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Artists;