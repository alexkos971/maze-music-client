import React, { useEffect } from "react";
import ProtectedPage from "@hocs/protectedPage";

import MainWrap from "@containers/MainWrap";
import Artists from "@components/Artists";
import TrackList from "@components/TrackList";

import { useGetAllTracksQuery } from "@store/api/tracksApi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { RockCover, ElectronicCover, ClassicalHitsCover } from "@utils/images";
import Playlists from "@components/Playlists";
import { useTranslation } from "next-i18next";
import { useGetAllUsersQuery } from "@store/api/usersApi";

const ForYou = () => {    
    const {t} = useTranslation('common');
    const { data } = useGetAllTracksQuery('');
    const usersRes = useGetAllUsersQuery('');

    return (        
        <MainWrap>
            <div className="container-fluid">
                {
                    usersRes.data?.length ?
                    <Artists 
                        className='!mt-[0px]'
                        title={t('title.artists_for_you')}
                        data={usersRes.data}/>
                    : <></>
                }

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