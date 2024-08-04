'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProtectedPage from "@hocs/protectedPage";
import { showToast } from "@store/reducers/interfaceReducer";
import { useAppDispatch } from "@hooks";
import { basePage } from "@utils/directory";

import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@containers/AuthLayout";
import Form from "@components/UI/Form";
import { useTranslation } from "next-i18next";

import { Text, Email, Password, RadiosWithImages, TextArea, ConfirmPassword, AvatarPicker } from "@components/UI/Field";
import { ListenerRadio, ArtistRadio, GoogleIcon } from "@utils/images";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import {Steps, Step } from "@components/UI/Steps";

import { useSignUpMutation, useLazyVerifyEmailQuery } from "@store/api/authApi";
import { signIn, signOut, useSession } from "next-auth/react";

interface ButtonsNavProps {
    buttonText?: string, 
    canSkip?: boolean, 
    showGoogleButton?: boolean, 
    goToStep: () => void, 
    disabled?: boolean, 
    loading?: boolean
}

const ButtonsNav = ({ 
    buttonText = 'Next', 
    canSkip = false, 
    showGoogleButton = false,
    goToStep, 
    disabled = false,
    loading = false 
} : ButtonsNavProps
) => {
    const {t} = useTranslation('common');

    return (        
        <div className="flex flex-col sm:flex-row items-center mt-6">
            <Button 
                disabled={disabled} 
                className={(canSkip || showGoogleButton) ? 'sm:w-1/2 w-full' : 'w-full'} 
                isLoading={loading}
                onClick={goToStep}>{buttonText}</Button>

            {
                showGoogleButton ?
                    <button 
                        className="flex items-center justify-start text-sm dark:text-gray-300 sm:ml-5 max-sm:mt-4" 
                        type="button"
                        onClick={() => signIn('google')}>
                        <GoogleIcon/>
                        <span className="ml-2 text-left font-secondary">Sign Up with google</span>
                    </button>
                : <></>
            }

            {
                canSkip ? 
                    <button 
                        onClick={goToStep} 
                        type="button" 
                        className="text-base text-center text-gray-c4 w-1/2">{t('pages.sign-up.skip')}</button> 
                : ''
            }
        </div>
    );
}

const SignUp = () => {
    const {t} = useTranslation("common");
    const [activeStep, goToStep ] = useState(0);

    const [fields, setFields] = useState<SignUpDto | SignUpGoogleDto | {}>({});    
    const [loginType, setLoginType] = useState<LoginType>('local');
    
    const [validFields, setValidFields] = useState<{}>({});    
    const dispatch = useAppDispatch();
    
    const { push } = useRouter();
    let [signUpHandle, { error, isSuccess}] = useSignUpMutation();
    let [verifyEmail, verifyRes] = useLazyVerifyEmailQuery();
    
    // Check Google authorization
    const { data: session } = useSession();

    useEffect(() => {
        if ( activeStep == 0 ) {
            signOut({
                redirect: false
            });
        }
    }, [activeStep]);
    
    let checkCredentials = async (login_type: LoginType, email: string) => {
        if ( !email ) {
            dispatch(showToast({
                type: 'error',
                text: t(`errors.invalid_email`)
            }));
            return;
        }

        let res = await verifyEmail(email);
    
        if (!res.isSuccess) {
            dispatch(showToast({
                type: 'error', 
                text: t(`errors.server_error`)
            }));
            return;
        }
        
        if (res.data.is_exist) {
            dispatch(showToast({
                type: 'error',
                text: t('errors.email_is_exist')
            }));
            return;
        } 
        else {
            if ( login_type == 'google' && session?.access_token) {
                // @ts-ignore 
                let { full_name, email, password, confirm_password, ...rest } = fields;
                
                setFields({ 
                    ...rest,
                    token: session?.access_token
                });
            } 

            setLoginType(login_type);
            goToStep(activeStep + 1); 
        }
    }

    useEffect(() => {
        if (session?.user?.email) {            
            checkCredentials('google', session?.user?.email);
        }
    }, [session]);

    useEffect(() => {
        if (error) {
            dispatch(showToast({
                type: 'error', 
                // @ts-ignore
                text: t(`errors.${error?.data?.message}`)
            }));
        } 
        else if (isSuccess)  {
            push(basePage.path);
            dispatch(showToast({type: 'success', text: t('interface.registered')}));
        }
    }, [isSuccess, error]);

    return (
        <AuthWrap size="large">

            <Form 
                className="flex flex-col items-center max-w-sm" 
                fields={fields} 
                setFields={setFields} 
                validFields={validFields}
                setValidFields={setValidFields}>
                
                <Steps activeStep={activeStep} goToStep={goToStep}>
                    <Step title={t('pages.sign-up.steps.credentials.title')}>
                        <Title tag="h2">{t('pages.sign-up.steps.credentials.title')}</Title>

                        <Text
                            name="full_name"
                            placeholder={t('fields.placeholders.full_name')}
                            required={true}
                        />

                        <Email
                            name="email"
                            placeholder={t('fields.placeholders.email')}
                            required={true}/>
                        
                        <Password
                            name="password"
                            placeholder={t('fields.placeholders.password')}
                            required={true}/>
                        
                        <ConfirmPassword
                            // @ts-ignore
                            password={fields.password}
                            name="confirm_password"
                            placeholder={t('fields.placeholders.confirm_password')}
                            required={true}/>

                        <ButtonsNav 
                            buttonText={t('pages.sign-up.btn_next')}
                            // @ts-ignore
                            disabled={!validFields.full_name || !validFields.email || !validFields.password || !validFields.confirm_password || verifyRes.isLoading}
                            canSkip={false} 
                            showGoogleButton={true}
                            goToStep={() => {
                                // @ts-ignore
                                checkCredentials('local', fields?.email);
                            }} 
                        />
                    </Step>

                    <Step title={t('pages.sign-up.steps.role.title')}>
                        <Title tag="h2">{t('pages.sign-up.steps.role.title')}</Title>

                        <RadiosWithImages 
                            name={'role'}
                            items={[
                                {
                                    title: t('pages.sign-up.steps.role.listener'),
                                    value: 'listener',
                                    image: ListenerRadio,
                                    checked: true
                                },
                                {
                                    title: t('pages.sign-up.steps.role.artist'),
                                    value: 'artist',
                                    image: ArtistRadio
                                },
                            ]}
                            columns={2}
                        />        

                        {/* @ts-ignore */}
                        <ButtonsNav buttonText={t('pages.sign-up.btn_next')} canSkip={false} goToStep={() => goToStep(activeStep + 1)} currentStep={activeStep} />                                     
                    </Step>

                    <Step title={t('pages.sign-up.steps.profile.title')}>
                        <Title tag="h2">{t('pages.sign-up.steps.profile.title')}</Title>

                        <AvatarPicker
                            title={t('pages.sign-up.steps.profile.avatar.title')}
                            accept="image/jpeg, image/png"
                            name="avatar"                      
                        />

                        <TextArea
                            className={'mt-6'}
                            name="description"
                            placeholder={t('pages.sign-up.steps.profile.description.placeholder')}
                        />

                        <ButtonsNav 
                            buttonText={t('pages.sign-up.btn_next')}
                            canSkip={true} 
                            goToStep={() => goToStep(activeStep + 1)} 
                        />
                    </Step>

                    {/* <Step title="Preferences">
                        <Title tag="h2">{t('pages.sign-up.steps.preferences.title')}</Title>

                            <div className="flex items-center mt-6">
                                <Button className={'w-full'} onClick={() => fields ? signUp(fields) : false}>{t('pages.sign-up.btn_finish')}</Button>
                            </div>
                    </Step> */}
                    
                    <Step title={t('pages.sign-up.btn_finish')}>
                        <Title tag="h2">{t('pages.sign-up.btn_finish')}</Title>

                            <div className="flex items-center mt-6">
                                {/* @ts-ignore */}
                                <Button 
                                    className={'w-full'} 
                                    // @ts-ignore
                                    onClick={() => fields ? signUpHandle({ data: fields, loginType }) : false}
                                >
                                    {t('pages.sign-up.btn_finish')}
                                </Button>
                            </div>
                    </Step>
                </Steps>
            </Form>

            <span className="mt-12 dark:text-gray-300">{t('pages.sign-up.sign_in')} <Link href="/sign-in" className="underline">{t('pages.sign-in.title')}</Link></span>
        </AuthWrap>
    );
}

export default ProtectedPage(SignUp);

export async function getStaticProps({ locale } : { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}