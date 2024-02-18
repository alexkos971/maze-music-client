import styles from './ProfileHero.module.scss';
import Image from 'next/image';

import { WeekndAvatar } from '@helpers/images';
import { useTranslation } from 'next-i18next';
import Button from '@components/ui/Button';
import EditButton from '@components/ui/EditButton';
import DottedRow from '@components/ui/DottedRow';

const ProfileHero = () => {
    const {t} = useTranslation('common');

    return (
        <section className={styles['profile-hero']}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <div className={styles['profile-hero__avatar']}>
                            <Image src={WeekndAvatar} alt='Avatar'/>
                        
                            <div className={styles['profile-hero__avatar-edit']}>
                                <span>{t('interface.change')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className={styles['profile-hero__title']}>
                            <h1>Alex Kos</h1>

                            <EditButton className='mb-[6px]' onClick={() => console.log("Edit Title")}/>
                        </div>

                        <p className={styles['profile-hero__description']}>
                            Abel Makkonen Tesfaye, popularly known as The Weeknd (born February 16, 1990 in Toronto, Ontario, Canada), is a Canadian R&B/hip-hop musician, singer-songwriter and record producer. He chose his stage name in tribute to when he was 17 years old, when, along with his friend...
                            <EditButton className={styles['profile-hero__description-edit']} onClick={() => console.log("Edit Description")}/>
                        </p>

                        <DottedRow className={styles['profile-hero__info']} dotColor='var(--black-36)'>
                            <Button color='gray' size='small'>Listener</Button>
                            <span><strong>14</strong> {t('interface.followers')}</span>
                            <span><strong>87</strong> {t('interface.subscriptions')}</span>
                        </DottedRow>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileHero;