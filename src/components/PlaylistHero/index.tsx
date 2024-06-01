import MusicNoteGray from "@assets/images/icons/note-gray.svg";
import BookmarkSaveIcon from "@assets/images/icons/bookmark-plus-white.svg";
import PlayIcon from "@assets/images/icons/play-black.svg";
import Button from "@components/UI/Button";
import DottedRow from "@components/UI/DottedRow";
import Title from "@components/UI/Title";
import { useTranslation } from "next-i18next";

interface PlaylistHeroProps {
    data: PlaylistDto,
    isSaved?: boolean
}

const PlaylistHero = ({ data, isSaved = false } : PlaylistHeroProps) => {
    const {t} = useTranslation('common');

    return (
        <div className="playlist-hero relative overflow-hidden w-full bg-gray-50 dark:bg-black mt-[calc(0px-var(--header-height))] pt-20 pb-16">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="relative w-full h-0 pb-[100%] bg-gray-400 flex items-center justify-center">
                            <MusicNoteGray className="w-2/5 h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="md:pl-10 flex flex-col h-full">
                            <Title tag="h1" className="text-4xl lg:text-5xl mt-6 md:mt-8">{data.name}</Title>
                            
                            <DottedRow className="mt-1">
                                <span>{data.tracks?.length} {t("interface.tracks")}</span>
                            </DottedRow>

                            { !isSaved ? <p className="mt-6 text-sm font-normal leading-4 text-gray-8e">{data?.description ?? ''}</p> : <></>}

                            <div className="flex items-center gap-x-8 mt-auto svg-current-color">
                                <Button 
                                    color="green"
                                    type="button">
                                    <PlayIcon/>
                                    {t("interface.play")}
                                </Button>

                                {
                                    !isSaved ?
                                        <Button
                                            color="black"
                                            type="button"
                                        >
                                            <BookmarkSaveIcon/>
                                            {t("interface.save")}
                                        </Button>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistHero;