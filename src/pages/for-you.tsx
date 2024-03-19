import React from "react";
import useProtectedPage from "@hooks/protectedPage";

import MainWrap from "@components/MainWrap";
import Artists from "@components/Artists";
import TrackList from "@components/TrackList";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { WeekndAvatar, RockCover, ElectronicCover, ClassicalHitsCover } from "@helpers/images";
import Playlists from "@components/Playlists";
import { useTranslation } from "next-i18next";

const ForYou = () => {    
    const {t} = useTranslation('common');

    return (        
        <MainWrap>
            <div className="container-fluid">
                <Artists 
                    className='mt-[0px]'
                    title={t('title.artists_for_you')}
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
                    title={t('title.popular_playlists')}
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
                    title={t('title.popular_songs')}
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
                                src: 'https://cdn6.sefon.pro/prev/bq0maM8X4WMB6K1AcWETnw/1710830223/3/Paramore%20-%20Decode%20%28OST%20%D0%A1%D1%83%D0%BC%D0%B5%D1%80%D0%BA%D0%B8%29%20%28192kbps%29.mp3',
                            },
                            { 
                                id: 'still',
                                album: null,
                                artist: {id:'sdfsdfs', name: 'Paramore'},
                                playedCount: 749823,
                                duration: 206,
                                name: 'Still Into You',
                                cover: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                                src: 'https://cdn6.sefon.pro/prev/bq0maM8X4WMB6K1AcWETnw/1710830223/3/Paramore%20-%20Decode%20%28OST%20%D0%A1%D1%83%D0%BC%D0%B5%D1%80%D0%BA%D0%B8%29%20%28192kbps%29.mp3',
                            },
                        ]
                    }} /> 
            </div>
        </MainWrap>
    );
}

export default useProtectedPage(ForYou);

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}