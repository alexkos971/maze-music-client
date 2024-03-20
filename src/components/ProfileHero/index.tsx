import styles from './ProfileHero.module.scss';

import { useTranslation } from 'next-i18next';
import { useAppSelector, useAppDispatch } from '@hooks';
import { toggleModal } from '@store/reducers/interfaceReducer';
import UpdateProfileForm from './updateProfileForm';

import Button from '@components/UI/Button';
import EditButton from '@components/UI/EditButton';
import DottedRow from '@components/UI/DottedRow';
import Avatar from '@components/UI/Avatar';

const ProfileHero = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    const profile : ProfileDto = useAppSelector(state => state.profile);

    if (!profile || !Object.keys(profile).length) {
        return <></>;
    }

    return (
        <section className={styles['profile-hero']}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <Avatar
                            previewText={profile.full_name}
                            img={ profile.avatar ? process.env.NEXT_PUBLIC_STATIC + profile.avatar : '' }
                            size='100%'
                            onChange={() => {
                                dispatch(toggleModal({ 
                                    isOpened: true, 
                                    content: (
                                        <UpdateProfileForm 
                                            title={t('pages.profile.change_avatar_title')}
                                            name="avatar" 
                                            type="file"/>
                                    )
                                })) 
                            }}
                        />
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
                                                title={t('pages.profile.change_name_title')}
                                                name="full_name" 
                                                value={profile?.full_name} 
                                                type="text"/>
                                        )
                                    })) 
                                }}
                            />
                        </div>

                        <p className={styles['profile-hero__description']}>
                            {profile.description?.length ? profile.description : "You don't have a description..."}
                            
                            <EditButton 
                                className={styles['profile-hero__description-edit']} 
                                onClick={() => {
                                    dispatch(toggleModal({ 
                                        isOpened: true, 
                                        content: (
                                            <UpdateProfileForm 
                                                title={t('pages.profile.change_description_title')}
                                                name="description"
                                                value={profile.description} 
                                                type="textarea"/>
                                        )
                                    })) 
                                }}
                            />
                        </p>

                        <DottedRow className={styles['profile-hero__info']} dotColor='var(--black-36)'>
                            <Button color='gray' size='small'>{t(`profile.${profile.role}`)}</Button>
                            <span><strong>{profile?.followers}</strong> {t('interface.followers')}</span>
                            <span><strong>{profile?.savedArtists.length}</strong> {t('interface.subscriptions')}</span>
                        </DottedRow>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileHero;