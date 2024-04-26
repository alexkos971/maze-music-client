import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import { useRouter } from 'next/router';
import { useLazyGetPlaylistQuery } from "@store/api/playlistsApi";
import { useEffect, useState } from "react";

function Playlist() {
    const router = useRouter();
    const [ getPlaylistQuery, playlistResponse ] = useLazyGetPlaylistQuery();
    const [playlist, setPlaylist] = useState<PlaylistDto | null>(null);

    const fetchData = async () => {
        await getPlaylistQuery(router.query.id);
        if (playlistResponse.isSuccess && playlistResponse.data) {
            setPlaylist(playlistResponse.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainWrap>
            <div className="container-fluid">
                <h1>{router.query.id}</h1>
                {
                    playlist?.tracks?.length ?
                        playlist.tracks.map(item => {
                            return <p>some</p>
                        })
                    : <></>
                }
            </div>
        </MainWrap>
    );
}

export default ProtectedPage(Playlist);

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