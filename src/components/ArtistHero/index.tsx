import { useState } from "react";
import Button from "@components/UI/Button";
import Image from "next/image";
import { formatNumber } from "@helpers/formated";
import { PlayBlack, BookMarkPlusWhite, BookMarkFilledWhite } from "@helpers/images";
import { useTranslation } from "next-i18next";
import DottedRow from "@components/UI/DottedRow";
import { useAppDispatch, useAppSelector } from "@hooks";
import { useFollowUserMutation } from "@store/api/usersApi";
import { useEffect } from "react";
import { showToast } from "@store/reducers/interfaceReducer";

type ArtistProps = any; 

const ArtistHero = ({ artist } : ArtistProps ) => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    const [profile] = useAppSelector(state => [state.profile]);
    const [follow, { isSuccess, isUninitialized, data }] = useFollowUserMutation();
    
    // @ts-ignore 
    const [ isFollowing, setIsFollowing ] = useState(profile?.saved_artists?.includes(artist._id));
    
    useEffect(() => {
        if (isUninitialized) return;

        if (data) {
            setIsFollowing(data.followed ? true : false);
            dispatch(showToast({ type: 'success', text: t(`interface.${data.followed ? 'followed' : 'unfollowed'}`) }))
        }
    }, [isSuccess]);

    return (
        <section className={`
            artist-hero relative overflow-hidden w-full bg-black mt-[calc(0px-var(--header-height))]
            after:absolute after:w-2/3 after:h-full after:left-0 after:top-0 after:block after:bg-gradient-to-r after:from-black after:from-80% after:via-[rgba(0,0,0,0.8)] after:via-90% after:to-[rgba(0, 0, 0, 0)]
        `}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={'pt-24 pb-16 min-h-[432px] relative flex flex-col z-1'}>

                            <h1 className={`text-6xl font-bold text-white tracking-wide`}>{artist.full_name}</h1>
                            <p className={`mt-6 text-sm font-normal leading-4 text-gray-8e`}>{artist.description}</p>
                        
                            <DottedRow className={'mb-9 [&>*]:text-white'}>
                                {artist.genres.length ? <Button color="gray" size="small">{artist.genres[0]}</Button> : <></>}        
                                <span>{formatNumber(artist.listenings)} {t('interface.listeners')}</span>
                                <span>{artist.albums.length} {t('interface.albums')}</span>
                            </DottedRow>

                            <div className={'flex items-center gap-x-8 mt-auto svg-current-color'}>
                                <Button 
                                    color="white"
                                    className={`min-w-[123px] pl-4 pr- text-lg font-semibold`}
                                ><PlayBlack/> {t('interface.listen')}</Button>
                                
                                <Button 
                                    color="black" 
                                    type="button" 
                                    className={`min-w-[123px] pl-4 pr- text-lg font-semibold`}
                                    onClick={() => follow(artist._id)}>
                                    {
                                        !isFollowing 
                                            ? <><BookMarkPlusWhite/>{t('interface.follow')}</>                                
                                            : <><BookMarkFilledWhite/>{t('interface.followed')}</>
                                    } 
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'w-1/2 h-full absolute right-0 top-0'}>
                { 
                    artist.avatar?.length ?
                        <Image src={artist.avatar} width={400} height={400} alt="Artist Avatar" className="w-full h-full object-cover skeleton-image"/>
                    : <></>
                }
            </div>
        </section>
    );
}

export default ArtistHero;