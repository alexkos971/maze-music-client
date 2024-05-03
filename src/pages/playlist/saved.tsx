import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import { useGetSavedTracksMutation } from "@store/api/tracksApi";
import { setSavedTracks } from "@store/reducers/tracksReducer";
import { useEffect } from "react";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@hooks";
import PlaylistHero from "@components/PlaylistHero";
import { useTranslation } from "next-i18next";

function SavedTracks() {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    const [getSavedTracks, { isSuccess, data }] = useGetSavedTracksMutation();
    const [savedTracks, profile] = useAppSelector(state => [state.tracks.savedTracks, state.profile])
    
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setSavedTracks(data));
        }
    }, [isSuccess])

    useEffect(() => { 
        if (!savedTracks) {
            getSavedTracks('');
        }
    }, []);

    return (
        <MainWrap>
            <PlaylistHero
                isSaved={true}
                data={{
                    _id: 'saved',
                    __v: 1,
                    date: new Date(),
                    cover: null,
                    description: null,
                    is_public: false,
                    name: t("pages.saved_tracks.title"),
                    // @ts-ignore
                    owner: profile?._id,
                    tracks: savedTracks ?? []
                }}
            />
            <div className="container-fluid">
                {
                    savedTracks ?
                        <TrackList
                            title="Saved Tracks"
                            data={savedTracks}
                        />
                    : <></>
                }
            </div>
        </MainWrap>
    );
}

export default ProtectedPage(SavedTracks);

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}