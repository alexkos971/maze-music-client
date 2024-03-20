import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import useProtectedPage from "@hooks/protectedPage";
import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import ArtistHero from "@components/ArtistHero";
import MainWrap from "@components/MainWrap";
import TrackList from "@components/TrackList";
import Playlists from "@components/Playlists";
import Artists from "@components/Artists";
import { useGetUserQuery } from "@store/api/usersApi";

function Artist() {
  const {t} = useTranslation('common');
  const router = useRouter();
  const [ artist, setArtist ] = useState(null);
  const { isSuccess, isError, data } = useGetUserQuery(router.query.id);

  useEffect(() => {
    if (data) {
      setArtist(data);
    }
  }, [isSuccess])

  if (!artist) return <></>;

  return (
    <MainWrap canReturnBack={true}>
      <ArtistHero artist={data}/>

      <div className="container-fluid mt-8">
        {/* <TrackList
          title={t('title.popular_songs')}
          data={} /> 

        <Playlists
          title={t('title.albums')}
          className="!mt-16"
          data={} />  

        <Artists
          title={t('title.similar_artists')}
          className="!mt-16"
          data={} /> */}
      </div>
    </MainWrap>
  );
}

export default useProtectedPage(Artist);

export async function getStaticProps({ locale } : { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export const getStaticPaths = (context: GetStaticPaths) => {
  return {
    paths: [],
    fallback: true, // false or "blocking"
  }
}
