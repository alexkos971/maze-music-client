import React from "react";
import Artists from "@components/Artists";
import TrackList from "@components/TrackList";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { WeekndAvatar, RockCover, ElectronicCover, ClassicalHitsCover } from "@helpers/images";
import Playlists from "@components/Playlists";

export default function ForYou() {    

    return (        
        <>
            <Artists 
                className='mt-[0px]'
                title="Artists"
                data={[
                {
                    id: 'a1',
                    name: 'The',
                    followers: [],
                    albums: [],
                },
                {
                    id: 'b2',
                    name: 'Dua Lipa',
                    avatar: WeekndAvatar,
                    albums: [123, 2342, 234, 3434],
                    followers: [123, 2342, 234, 3434]
                },
                {
                    id: 'c3',
                    name: 'The Weeknd',
                    avatar: WeekndAvatar,
                    albums: [],
                    followers: []
                },
                {
                    id: 'd4',
                    name: 'Dua Lipa',
                    avatar: WeekndAvatar,
                    albums: [123, 2342, 234, 3434],
                    followers: [123, 2342, 234, 3434]
                },
                {
                    id: 'e5',
                    name: 'Dua Lipa',
                    avatar: WeekndAvatar,
                    albums: [123, 2342, 234, 3434],
                    followers: [123, 2342, 234, 3434]
                },
            ]}/>

            <Playlists
                title="Popular Playlists"
                data={[
                    {
                        id: 'q11',
                        name: 'Classical Hits',
                        feature: ClassicalHitsCover,
                        author: "Alex Kos",                    
                        tracks: [123, 3453, 23232, 34534, 345343]
                    },
                    {
                        id: 'q1ds1',
                        name: 'Rock',
                        author: "Alex Kos",
                        feature: RockCover,
                        tracks: [123, 3453, 23232, 34534, 345343]
                    },
                    {
                        id: 'busuu',
                        name: 'Bass House',
                        feature: ElectronicCover,
                        author: "Alex Kos",
                        tracks: [123, 3453, 23232, 34534, 345343]
                    },
                ]}
            />      

            <TrackList
                title="Popular songs"
                data={{
                    name: 'Some Name',
                    tracks: [
                        { 
                            id: 'ignorance',
                            album: null,
                            artist: {id:'sdfsdfs', name: 'Paramore'},
                            playedCount: 749823,
                            duration: 206,
                            name: 'Ignorance',
                            cover: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                            src: 'https://cdn8.sefon.pro/prev/sTLlCRbLOjyFvsnIGjkhkg/1700308219/1/Paramore%20-%20Ignorance%20%28192kbps%29.mp3',
                        },
                        { 
                            id: 'still',
                            album: null,
                            artist: {id:'sdfsdfs', name: 'Paramore'},
                            playedCount: 749823,
                            duration: 206,
                            name: 'Still Into You',
                            cover: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                            src: 'https://cdn6.sefon.pro/prev/7R_cOaPsvzyWT8dDpPRBng/1700308219/26/Paramore%20-%20Still%20Into%20You%20%28192kbps%29.mp3',
                        },
                    ]
                }} /> 
        </>
    );
}

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}