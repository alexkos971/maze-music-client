import styles from './ProfileHero.module.scss';

import { useTranslation } from 'next-i18next';
import { useAppSelector, useAppDispatch } from '@hooks';
import { toggleModal } from '@store/reducers/interfaceReducer';
import UpdateProfileForm from './updateProfileForm';

import Button from '@components/UI/Button';
import EditButton from '@components/UI/EditButton';
import DottedRow from '@components/UI/DottedRow';
import Avatar from '@components/UI/Avatar';
import classNames from 'classnames';

const ProfileHero = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    let profile : ProfileDto = useAppSelector<ProfileDto>(state => state.profile);

    if (!profile) {
        return <></>;
    }

    return (
        <section className={styles['profile-hero']}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <Avatar
                            previewText={profile?.full_name ? profile?.full_name.split(" ").reduce((item, acc) => item[0] + acc[0]) : ''}
                            img={ profile.avatar ? process.env.NEXT_PUBLIC_STATIC + profile.avatar : '' }
                            size='min(100%, 150px)'
                            className={styles['profile-hero__avatar']}
                            onChange={() => {
                                dispatch(toggleModal({ 
                                    isOpened: true, 
                                    content: (
                                        <UpdateProfileForm 
                                            title={t('pages.profile.change_avatar_title')}
                                            name="avatar" 
                                            value={profile.avatar ? process.env.NEXT_PUBLIC_STATIC + profile.avatar : '' }
                                            type="avatar"/>
                                    )
                                })) 
                            }}
                        />
                    </div>

                    <div className="col-lg-7">
                        <div className={styles['profile-hero__title']}>
                            <h1>{profile.full_name}</h1>

                            <EditButton 
                                className={classNames(styles['profile-hero__title'], styles['edit-button'])} 
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
                            {profile.description?.length ? profile.description :  "You don't have a description..."}
                            
                            <EditButton 
                                className={styles['profile-hero__description-edit']} 
                                onClick={() => {
                                    dispatch(toggleModal({ 
                                        isOpened: true, 
                                        content: (
                                            <UpdateProfileForm 
                                                title={t('pages.profile.change_description_title')}
                                                name="description"
                                                value={profile?.description ?? ''} 
                                                type="textarea"/>
                                        )
                                    })) 
                                }}
                            />
                        </p>

                        <DottedRow className={styles['profile-hero__info']} dotColor='var(--black-36)'>
                            <Button color='gray' size='small'>{t(`profile.${profile.role}`)}</Button>
                            <span><strong>{profile?.followers}</strong> {t('interface.followers')}</span>
                            <span><strong>{profile?.saved_artists?.length}</strong> {t('interface.subscriptions')}</span>
                        </DottedRow>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileHero;