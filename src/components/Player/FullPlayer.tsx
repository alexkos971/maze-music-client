import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@hooks';

import { fillHeaderByScroll } from '@components/Header';

import styles from './Player.module.scss';
import Image from 'next/image';

const FullPlayer = () => {
    const {t} = useTranslation('common');
    const [ fullplayer_is_expanded, track ] = useAppSelector(state => [state.interface.fullplayer_is_expanded, state.player.track]);

    return (
        <div className={`${styles.fullplayer} ${fullplayer_is_expanded ? styles.fullplayer_expanded : ''}`} onScroll={fillHeaderByScroll}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        {
                            track?.cover ?
                                <div className={styles.fullplayer__cover}>
                                    <Image src={track.cover} alt="Track Cover" width={400} height={400}/>
                                </div>
                            : ''
                        }

                        <div className={styles.fullplayer__info}>
                            <h2 className={styles['fullplayer__info-title']}>{track?.name}</h2>
                            <Link href={'/artist/sdfsd'} className={styles['fullplayer__info-artist']}>{track?.artist.name}</Link>

                            <div className={styles['fullplayer__info-description']}>
                                <p>Abel Makkonen Tesfaye, popularly known as The Weeknd (born February 16, 1990 in Toronto, Ontario, Canada), is a Canadian R&B/hip-hop musician, singer-songwriter and record producer. He chose his stage name in tribute to when he was 17 years old, when, along with his friend...</p>
                            </div>
                        </div>
                    </div>

                    <div className="offset-lg-1 col-lg-5">
                        <div className={styles.fullplayer__lyrics}>
                            <h3>{t("player.lyrics")}:</h3>

                            <div className={styles['fullplayer__lyrics-text']}>
                                <p>We found each other<br/>
                                    I helped you out of a broken place<br/>
                                    You gave me comfort<br/>
                                    But falling for you was my mistake<br/>
                                    <br/>
                                    I put you on top,<br/> 
                                    I put you on top <br/>
                                    I claimed you so proud and openly<br/>
                                    And when times were rough, when times were rough<br/>
                                    <br/>
                                    I made sure I held you close to me<br/>
                                    <br/>
                                    So call out my name (call out my name)<br/>
                                    Call out my name when<br/>
                                    I kiss you so gently<br/>
                                    I want you to stay (I want you to stay)<br/>
                                    I want you to stay, even though you don't want me<br/>
                                    <br/>
                                    Girl, why can't you wait? (why can't you wait, baby?)<br/>
                                    Girl, why can't you wait 'til I fall out of love?<br/>
                                    Won't you call out my name? (call out my name)<br/>
                                    Girl, call out my name, and I'll be on my way and I'll be on my</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullPlayer;