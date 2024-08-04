import { useTranslation } from 'next-i18next';
import { useAppSelector, useAppDispatch } from '@hooks';
import { toggleModal } from '@store/reducers/interfaceReducer';
import UpdateProfileForm from './updateProfileForm';
import { formatNick } from '@utils/formated';

import Button from '@components/UI/Button';
import EditButton from '@components/UI/EditButton';
import DottedRow from '@components/UI/DottedRow';
import Avatar from '@components/UI/Avatar';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';

const ProfileHero = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    // @ts-ignore
    let profile : ProfileDto = useAppSelector<ProfileDto>(state => state.profile);
    const { data: session } = useSession();

    if (!profile) {
        return <></>;
    }

    return (
        <section className={`profile-hero overflow-hidden w-full bg-gray-50 dark:bg-gray-500 pt-[var(--header-height)] pb-16`}>
            <div className="container-fluid">
                <div className="flex items-start max-sm:flex-col">
                    <Avatar
                        previewText={profile?.full_name ? formatNick(profile.full_name) : ''}
                        img={ profile.avatar ? profile.avatar : ( session?.user?.image ?? '' ) }
                        size='min(100%, 150px)'
                        textSize='32px'
                        className={'flex-shrink-0 max-sm:mb-6'}
                        onChange={() => {
                            dispatch(toggleModal({ 
                                isOpened: true, 
                                content: (
                                    <UpdateProfileForm 
                                        title={t('pages.profile.change_avatar_title')}
                                        name="avatar" 
                                        value={profile?.avatar ?? '' }
                                        type="avatar"/>
                                )
                            })) 
                        }}
                    />

                    <div className="profile-hero__layout flex flex-col sm:ml-8 sm:pt-8 md:max-w-3xl">
                        <div className={'flex items-end gap-4 text-gray-400 mb-5'}>
                            <h1 className='text-4xl dark:text-white'>{profile.full_name}</h1>

                            <EditButton 
                                className={'mb-[6px] text-gray-400 dark:text-white'} 
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

                        <p className={'flex text-gray-300 text-base'}>
                            {profile.description?.length ? profile.description :  "You don't have a description..."}
                            
                            <EditButton 
                                className={'w-4 h-4 ml-2 translate-y-[2px]'} 
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

                        <DottedRow className={classNames('text-gray-400 dark:text-gray-300')} dotColor='var(--gray-400)'>
                            <Button color='black' size='small'>{t(`profile.${profile.role}`)}</Button>
                            <span><strong>{profile?.followers}</strong> {t('interface.followers')}</span>
                            <span><strong>{profile?.saved_artists?.length}</strong> {t('interface.subscriptions')}</span>
                        </DottedRow>
                    </div>
                </div>
                
                {/* <div className="row">
                    <div className="col-lg-2">
                    </div>

                    <div className="col-lg-7">
                    </div>
                </div> */}
            </div>
        </section>
    );
}

export default ProfileHero;