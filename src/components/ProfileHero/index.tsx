import styles from './ProfileHero.module.scss';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { useAppSelector, useAppDispatch } from '@hooks';
import { toggleModal } from '@store/reducers/interfaceReducer';
import UpdateProfileForm from './updateProfileForm';

import Button from '@components/UI/Button';
import EditButton from '@components/UI/EditButton';
import DottedRow from '@components/UI/DottedRow';

const ProfileHero = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
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
                                
                                    <div 
                                        className={styles['profile-hero__avatar-edit']}
                                        onClick={() => {
                                            dispatch(toggleModal({ 
                                                isOpened: true, 
                                                content: (
                                                    <UpdateProfileForm 
                                                        title="Change Avatar"
                                                        name="avatar" 
                                                        type="file"/>
                                                )
                                            })) 
                                        }}>                                        
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

                            <EditButton 
                                className='mb-[6px]' 
                                onClick={() => {
                                    dispatch(toggleModal({ 
                                        isOpened: true, 
                                        content: (
                                            <UpdateProfileForm 
                                                title="Change Name"
                                                name="full_name" 
                                                value={profile?.full_name} 
                                                type="text"/>
                                        )
                                    })) 
                                }}
                            />
                        </div>

                        <p className={styles['profile-hero__description']}>
                            {profile?.description?.length ? profile.description : "You don't have a description..."}
                            
                            <EditButton 
                                className={styles['profile-hero__description-edit']} 
                                onClick={() => {
                                    dispatch(toggleModal({ 
                                        isOpened: true, 
                                        content: (
                                            <UpdateProfileForm 
                                                title="Change your description"
                                                name="description"
                                                value={profile?.description} 
                                                type="textarea"/>
                                        )
                                    })) 
                                }}
                            />
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