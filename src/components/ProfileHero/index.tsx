import styles from './ProfileHero.module.scss';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@hooks';
import Button from '@components/UI/Button';
import EditButton from '@components/UI/EditButton';
import DottedRow from '@components/UI/DottedRow';

const ProfileHero = () => {
    const {t} = useTranslation('common');
    const profile = useAppSelector(state => state.profile);

    if (!profile) {
        return <></>;
    }

    return (
        <section className={styles['profile-hero']}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <div className={styles['profile-hero__avatar']}>
                            {
                                profile?.avatar ?
                                <>
                                    <Image 
                                        src={process.env.NEXT_PUBLIC_STATIC + profile.avatar} 
                                        alt='Avatar'
                                        width={600}
                                        height={600}
                                    />
                                
                                    <div className={styles['profile-hero__avatar-edit']}>
                                        <span>{t('interface.change')}</span>
                                    </div>
                                </>
                                : <></>
                            }
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className={styles['profile-hero__title']}>
                            <h1>{profile.full_name}</h1>

                            <EditButton className='mb-[6px]' onClick={() => console.log("Edit Title")}/>
                        </div>

                        {
                            profile?.description ?
                                <p className={styles['profile-hero__description']}>
                                    {profile.description}
                                    <EditButton className={styles['profile-hero__description-edit']} onClick={() => console.log("Edit Description")}/>
                                </p>
                            : <></>
                        }

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