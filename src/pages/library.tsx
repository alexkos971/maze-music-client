import { useState } from "react";
import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import Button from "@components/UI/Button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Title from "@components/UI/Title";
import { useTranslation } from "next-i18next";
import Playlists from "@components/Playlists";
import Artists from "@components/Artists";
import { WeekndAvatar, RockCover, ElectronicCover, ClassicalHitsCover } from "@helpers/images";

export default ProtectedPage(function Library() {
  const {t} = useTranslation('common');

  const tabs = ['All', 'Playlists', 'Artists', 'Albums'];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <MainWrap>
      <div className="container-fluid">
        <Title>{t('pages.library.title')}</Title>
        
        <div className="flex items-center mt-4 -mx-1">
          {
            tabs.map(item => (
              <Button 
                key={item}
                className="my-4 mx-2" 
                size="small" 
                onClick={() => setCurrentTab(item)}
                color={item == currentTab ? "black": 'gray'}>{item}</Button>
            ))
          }
        </div>

        { currentTab == 'All' || currentTab == 'Playlists' ?
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
          : <></> }

        { currentTab == 'All' || currentTab == 'Artists' ?
          <Artists 
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
        : <></> }
      </div>
    </MainWrap>
  );
})

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}