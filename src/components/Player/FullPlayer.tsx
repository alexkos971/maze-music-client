import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@hooks';

import MusicNoteGray from "@assets/images/icons/note-gray.svg";

import styles from './Player.module.scss';
import Image from 'next/image';
import classNames from 'classnames';
import { setFullplayerExpanded } from '@store/reducers/interfaceReducer';

const FullPlayer = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    const [ fullplayer_is_expanded, track ] = useAppSelector(state => [state.interface.fullplayer_is_expanded, state.player.track]);

    if (!track) {
        return <></>;
    }

    return (
        <div className={`${styles.fullplayer} ${fullplayer_is_expanded ? styles.fullplayer_expanded : ''}`}>
            
            <div
                onClick={() => dispatch(setFullplayerExpanded(false))}
                className="fullplayer__dash cursor-pointer z-1 absolute left-0 top-0 w-full h-10 flex items-center justify-center">
                <span className="rounded-sm w-10 h-1 bg-gray-300"></span>
            </div>
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5">
                        <div className={classNames(styles.fullplayer__cover, !track?.cover?.length ? styles.fullplayer__cover_default : null )}>
                                { track?.cover?.length ?
                                    <Image src={track.cover} alt="Track Cover" width={400} height={400}/>
                                    : <MusicNoteGray/>
                                }
                        </div>

                        <div className={styles.fullplayer__info}>
                            <h2 className={styles['fullplayer__info-title']}>{track?.name}</h2>
                            <Link href={`/artist/${track?.artist._id}`} className={styles['fullplayer__info-artist']}>{track?.artist.full_name}</Link>

                            {
                                track.artist.description ?
                                    <div className={styles['fullplayer__info-description']}>
                                        <p>{track.artist.description}</p>
                                    </div>
                                : <></>
                            }
                        </div>
                    </div>

                    <div className="offset-lg-1 col-lg-5">
                        <div className={styles.fullplayer__lyrics}>
                            <h3>{t("player.lyrics")}:</h3>

                            <div className={styles['fullplayer__lyrics-text']}>
                                {/* There is must be lyrics */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullPlayer;