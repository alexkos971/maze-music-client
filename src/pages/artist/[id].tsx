import React from "react";
import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import ArtistHero from "@components/ArtistHero";
import MainWrap from "@components/MainWrap";
import TrackList from "@components/TrackList";
import Playlists from "@components/Playlists";
import Artists from "@components/Artists";

export default function Artist() {
  const {t} = useTranslation('common');

    return (
      <MainWrap canReturnBack={true}>
        <ArtistHero/>

        <div className="container-fluid mt-8">
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
                  }
                ]
            }} /> 

          <Playlists
            title={t('title.albums')}
            className="!mt-16"
            data={[
              {
                id: 'q11',
                name: 'Classical Hits',
                feature: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                author: "Alex Kos",                    
                tracks: [123, 3453, 23232, 34534, 345343]
              },
              {
                id: 'q1ds1',
                name: 'Rock',
                author: "Alex Kos",
                feature: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                tracks: [123, 3453, 23232, 34534, 345343]
              },
              {
                id: 'busuu',
                name: 'Bass House',
                feature: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                author: "Alex Kos",
                tracks: [123, 3453, 23232, 34534, 345343]
              },
            ]} />  

          <Artists
            title={t('title.similar_artists')}
            className="!mt-16"
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
                  avatar: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                  albums: [123, 2342, 234, 3434],
                  followers: [123, 2342, 234, 3434]
              },
              {
                  id: 'c3',
                  name: 'The Weeknd',
                  avatar: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                  albums: [],
                  followers: []
              },
              {
                  id: 'd4',
                  name: 'Dua Lipa',
                  avatar: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                  albums: [123, 2342, 234, 3434],
                  followers: [123, 2342, 234, 3434]
              },
              {
                  id: 'e5',
                  name: 'Dua Lipa',
                  avatar: 'https://sefon.pro/img/artist_photos/paramore.jpg',
                  albums: [123, 2342, 234, 3434],
                  followers: [123, 2342, 234, 3434]
              },
            ]} />
        </div>
      </MainWrap>
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

export const getStaticPaths = (context: GetStaticPaths) => {
  return {
    paths: [],
    fallback: true, // false or "blocking"
  }
}
