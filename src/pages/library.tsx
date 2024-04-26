import { useState } from "react";
import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import Button from "@components/UI/Button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Title from "@components/UI/Title";
import { useTranslation } from "next-i18next";
import Playlists from "@components/Playlists";
import Artists from "@components/Artists";
import CardWrap from "@components/UI/CardWrap";

import SavedTracksCover from "@assets/images/saved-tracks-cover.png";
import WeekndAvatar from "@assets/images/uploads/weeknd.png";

import { useAppDispatch } from "@hooks";
import { toggleModal } from "@store/reducers/interfaceReducer";
import { FilePicker } from "@components/UI/Field";

export default ProtectedPage(function Library() {
  const {t} = useTranslation('common');
  const dispatch = useAppDispatch()

  const tabs = [
    t("pages.library.tabs.all"), 
    t("pages.library.tabs.playlists"), 
    t("pages.library.tabs.artists"), 
    t("pages.library.tabs.albums")
  ];

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

        { currentTab == t("pages.library.tabs.all") || currentTab == t("pages.library.tabs.playlists") ?
          <>
          
          {
            currentTab == t("pages.library.tabs.playlists") ?
              <CardWrap onClick={() => {
                  dispatch(toggleModal({ 
                    isOpened: true, 
                    content: (
                      <div className="relative">
                        <Title tag="h3" className="text-center">{t("pages.library.create_playlist.title")}</Title>
                        {/* <FilePicker title="Avatar"/> */}
                      </div>
                    )
                  }))
                }}
                className="mt-8">

                <div className="flex items-center">
                  <span className="w-11 h-11 rounded-full bg-black-36 flex items-center justify-center relative
                    before:w-4 before:h-[2px] before:bg-white before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                    after:h-4 after:w-[2px] after:bg-white after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 
                    "></span>

                    <div className="flex flex-col ml-4">
                      <Title tag="h5" className="mb-1">{t("pages.library.create_playlist.title")}</Title>
                      <p className="text-sm">{t("pages.library.create_playlist.subtitle")}</p>
                    </div>
                </div>
              </CardWrap>
              : <></>
          }
            
            <Playlists
              title={t('title.playlists')}
              data={[
                  {
                    id: '',
                    link: '/playlist/saved',
                    name: t('pages.library.saved'),
                    cover: SavedTracksCover,
                    owner: "Alex Kos",                    
                    tracks: [123, 3453, 23232, 34534, 345343]
                  }
              ]}
            /> 
          </>
          : <></> }

        { currentTab == t("pages.library.tabs.all") || currentTab == t("pages.library.tabs.artists") ?
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