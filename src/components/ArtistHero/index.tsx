import styles from "./ArtistHero.module.scss";
import Button from "@components/UI/Button";
import Image from "next/image";
import { formatNumber } from "@helpers/formated";
import { PlayBlack, BookMarkPlusBlack } from "@helpers/images";
import { useTranslation } from "next-i18next";
import DottedRow from "@components/UI/DottedRow";

type ArtistProps = any; 

const ArtistHero = ({ data } : ArtistProps ) => {
    const {t} = useTranslation('common');

    // const artist = {
    //     name: 'The Weeknd',
    //     description: 'Abel Makkonen Tesfaye, popularly known as The Weeknd (born February 16, 1990 in Toronto, Ontario, Canada), is a Canadian R&B/hip-hop musician, singer-songwriter and record producer. He chose his stage name in tribute to when he was 17 years old, when, along with his friend...',
    //     avatar: 'https://www.nme.com/wp-content/uploads/2023/02/NME-PARAMORE-HERO-2023@2560x1625.jpg',
    //     genre: 'Pop Music',
    //     listenings: 73458276,
    //     albums: [
    //         {
    //             id: 'sadas',
    //             name: 'Album 1',
    //         },
    //         {
    //             id: 'sadasfsd',
    //             name: 'Album 2',
    //         }
    //     ]
    // }

    return (
        <section className={styles['artist-hero']}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={styles['artist-hero__content']}>

                            <h1 className={styles['artist-hero__title']}>{data.full_name}</h1>
                            <p className={styles['artist-hero__description']}>{data.description}</p>
                        
                            <DottedRow className={styles['artist-hero__info']}>
                                {data.genres.length ? <Button color="gray" size="small">{data.genres[0]}</Button> : <></>}        
                                <span>{formatNumber(data.listenings)} {t('interface.listeners')}</span>
                                <span>{data.albums.length} {t('interface.albums')}</span>
                            </DottedRow>

                            <div className={styles['artist-hero__actions']}>
                                <Button color="white"><PlayBlack/> {t('interface.listen')}</Button>
                                <Button color="gray"><BookMarkPlusBlack/> {t('interface.follow')}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['artist-hero__avatar']}>
                { 
                    data.avatar?.length ?
                        <Image src={process.env.NEXT_PUBLIC_STATIC + data.avatar} width={400} height={400} alt="Artist Avatar" className="skeleton-image"/>
                    : <></>
                }
            </div>
        </section>
    );
}

export default ArtistHero;