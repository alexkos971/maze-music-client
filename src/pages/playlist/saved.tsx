import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import { useGetSavedTracksQuery } from "@store/api/tracksApi";
import { useEffect, useState } from "react";
import TrackList from "@components/TrackList";

function SavedTracks() {
    const savedTracksResponse = useGetSavedTracksQuery('');
    const [savedTracks, setSavedTracks] = useState<Track[] | null>(null);
    
    useEffect(() => {        
        if (savedTracksResponse.isSuccess && savedTracksResponse.data) {
            setSavedTracks(savedTracksResponse.data);
        }
    }, [savedTracksResponse.data]);

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