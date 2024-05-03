import React from "react";
import ProtectedPage from "@hoks/protectedPage";

import MainWrap from "@containers/MainWrap";
import Artists from "@components/Artists";
import TrackList from "@components/TrackList";

import { useGetAllTracksQuery } from "@store/api/tracksApi";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { WeekndAvatar, RockCover, ElectronicCover, ClassicalHitsCover } from "@helpers/images";
import Playlists from "@components/Playlists";
import { useTranslation } from "next-i18next";

const ForYou = () => {    
    const {t} = useTranslation('common');
    const { data } = useGetAllTracksQuery('');

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
                            cover: ClassicalHitsCover,
                            owner: "Alex Kos",                    
                            tracks: [123, 3453, 23232, 34534, 345343]
                        },
                        {
                            id: 'q1ds1',
                            name: 'Rock',
                            owner: "Alex Kos",
                            cover: RockCover,
                            tracks: [123, 3453, 23232, 34534, 345343]
                        },
                        {
                            id: 'busuu',
                            name: 'Bass House',
                            cover: ElectronicCover,
                            owner: "Alex Kos",
                            tracks: [123, 3453, 23232, 34534, 345343]
                        },
                    ]}
                />      

                {
                    data ? 
                        <TrackList
                            title={t('title.popular_songs')}
                            data={data} 
                        />
                    : <></>
                } 
            </div>
        </MainWrap>
    );
}

export default ProtectedPage(ForYou);

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}