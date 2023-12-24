import styles from "./ArtistHero.module.scss";
import Button from "@components/ui/Button";
import Image from "next/image";
import { formatNumber } from "@helpers/formated";
import { PlayBlack, BookMarkPlusBlack } from "@helpers/images";
import { useTranslation } from "next-i18next";
import DottedRow from "@components/ui/DottedRow";

const ArtistHero = () => {
    const {t} = useTranslation('common');

    const artist = {
        name: 'The Weeknd',
        description: 'Abel Makkonen Tesfaye, popularly known as The Weeknd (born February 16, 1990 in Toronto, Ontario, Canada), is a Canadian R&B/hip-hop musician, singer-songwriter and record producer. He chose his stage name in tribute to when he was 17 years old, when, along with his friend...',
        avatar: 'https://sefon.pro/img/artist_photos/paramore.jpg',
        genre: 'Pop Music',
        listenings: 73458276,
        albums: [
            {
                id: 'sadas',
                name: 'Album 1',
            },
            {
                id: 'sadasfsd',
                name: 'Album 2',
            }
        ]
    }

    return (
        <section className={styles['artist-hero']}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className={styles['artist-hero__content']}>

                            <h1 className={styles['artist-hero__title']}>{artist.name}</h1>
                            <p className={styles['artist-hero__description']}>{artist.description}</p>
                        
                            <DottedRow className={styles['artist-hero__info']}>
                                <Button color="gray" size="small">{artist.genre}</Button>        
                                <span>{formatNumber(artist.listenings)} {t('interface.listeners')}</span>
                                <span>{artist.albums.length} {t('interface.albums')}</span>
                            </DottedRow>

                            <div className={styles['artist-hero__actions']}>
                                <Button color="white"><PlayBlack/> {t('interface.listen')}</Button>
                                <Button color="gray"><BookMarkPlusBlack/> {t('interface.follow')}</Button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className={styles['artist-hero__avatar']}>
                            <Image src={artist.avatar} width={400} height={400} alt="Artist Avatar"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ArtistHero;