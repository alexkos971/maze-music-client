import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import { useGetSavedTracksMutation } from "@store/api/tracksApi";
import { setSavedTracks } from "@store/reducers/tracksReducer";
import { useEffect, useState } from "react";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@hooks";

function SavedTracks() {
    const dispatch = useAppDispatch();
    const [getSavedTracks, { isSuccess, data }] = useGetSavedTracksMutation();
    const savedTracks = useAppSelector(state => state.tracks.savedTracks)
    
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setSavedTracks(data));
        }
    }, [isSuccess])

    useEffect(() => { 
        getSavedTracks('');
    }, []);

    return (
        <MainWrap>
            <div className="container-fluid">
                {
                    savedTracks?.length ?
                        <TrackList
                            className="mt-0"
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