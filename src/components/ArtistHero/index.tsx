import { useState } from "react";
import styles from "./ArtistHero.module.scss";
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
    
    const [ isFollowing, setIsFollowing ] = useState(profile?.savedArtists?.includes(artist._id));
    
    useEffect(() => {
        if (isUninitialized) return;

        if (data) {
            setIsFollowing(data.followed ? true : false);
            dispatch(showToast({ type: 'success', text: t(`interface.${data.followed ? 'followed' : 'unfollowed'}`) }))
        }
    }, [isSuccess]);

    return (
        <section className={styles['artist-hero']}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={styles['artist-hero__content']}>

                            <h1 className={styles['artist-hero__title']}>{artist.full_name}</h1>
                            <p className={styles['artist-hero__description']}>{artist.description}</p>
                        
                            <DottedRow className={styles['artist-hero__info']}>
                                {artist.genres.length ? <Button color="gray" size="small">{artist.genres[0]}</Button> : <></>}        
                                <span>{formatNumber(artist.listenings)} {t('interface.listeners')}</span>
                                <span>{artist.albums.length} {t('interface.albums')}</span>
                            </DottedRow>

                            <div className={styles['artist-hero__actions']}>
                                <Button color="white"><PlayBlack/> {t('interface.listen')}</Button>
                                
                                <Button 
                                    color="gray" 
                                    type="button" 
                                    className="hover:opacity-100"
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

            <div className={styles['artist-hero__avatar']}>
                { 
                    artist.avatar?.length ?
                        <Image src={process.env.NEXT_PUBLIC_STATIC + artist.avatar} width={400} height={400} alt="Artist Avatar" className="skeleton-image"/>
                    : <></>
                }
            </div>
        </section>
    );
}

export default ArtistHero;