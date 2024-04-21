'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProtectedPage from "@hoks/protectedPage";
import { showToast } from "@store/reducers/interfaceReducer";
import { useAppDispatch } from "@hooks";
import { basePage } from "@helpers/directory";

import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@containers/AuthLayout";
import Form from "@components/UI/Form";
import { useTranslation } from "next-i18next";

import { Text, Email, Password, RadiosWithImages, TextArea, FilePicker, ConfirmPassword } from "@components/UI/Field";
import { ListenerRadio, ArtistRadio } from "@helpers/images";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import {Steps, Step } from "@components/UI/Steps";

import { useSignUpMutation, useLazyVerifyEmailQuery } from "@store/api/authApi";

const ButtonsNav = ({ 
    buttonText = 'Next', canSkip = false, goToStep, disabled = false,loading = false 
} : { buttonText?: string, canSkip?: boolean, goToStep: () => void, disabled?: boolean, loading?: boolean}) => {
    const {t} = useTranslation('common');

    return (        
        <div className="flex items-center mt-6">
            <Button 
                disabled={disabled} 
                className={canSkip ? 'w-1/2' : 'w-full'} 
                isLoading={loading}
                onClick={goToStep}>{buttonText}</Button>

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
    const [fields, setFields] = useState<SignUpDto | {}>({});    
    const [validFields, setValidFields] = useState<{}>({});    
    const dispatch = useAppDispatch();

    const { push } = useRouter();
    let [signUp, { error, isSuccess, isLoading}] = useSignUpMutation();
    let [verifyEmail, verify] = useLazyVerifyEmailQuery();

    useEffect(() => {
        if (error) {
            console.log(error);
            dispatch(showToast({
                type: 'error', 
                // @ts-ignore
                text: t(`pages.sign-up.errors.${error?.data?.message}`)
            }));
        } 
        else if (isSuccess)  {
            push(basePage.path);
            dispatch(showToast({type: 'success', text: t('interface.registered')}));
        }
    }, [isSuccess, error]);

    const verifyEmailHandle = async() => {
        // @ts-ignore
        await verifyEmail(fields.email);
        if (verify?.data?.is_exist) {
            dispatch(showToast({
                type: 'error',
                text: t('pages.sign-up.errors.email_is_exist')
            }))
        }
        else {
            goToStep(activeStep + 1);
        }
    }

    return (
        <AuthWrap size="large">

            <Form 
                className="flex flex-col items-center max-w-sm" 
                fields={fields} 
                setFields={setFields} 
                validFields={validFields}
                setValidFields={setValidFields}>
                
                <Steps activeStep={activeStep} goToStep={goToStep}>
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
                            name="confirm-password"
                            placeholder={t('fields.placeholders.confirm_password')}
                            required={true}/>

                        <ButtonsNav 
                            buttonText={t('pages.sign-up.btn_next')}
                            // @ts-ignore
                            disabled={!validFields.full_name || !validFields.email || !validFields.password || !validFields['confirm-password'] || verify.isLoading}
                            canSkip={false} 
                            goToStep={verifyEmailHandle} 
                        />
                    </Step>

                    <Step title={t('pages.sign-up.steps.profile.title')}>
                        <Title tag="h2">{t('pages.sign-up.steps.profile.title')}</Title>

                        <FilePicker
                            style="avatar"
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
                                <Button className={'w-full'} onClick={() => fields ? signUp(fields) : false}>{t('pages.sign-up.btn_finish')}</Button>
                            </div>
                    </Step>
                </Steps>
            </Form>

            <span className="mt-12">{t('pages.sign-up.sign_in')} <Link href="/sign-in" className="underline">{t('pages.sign-in.title')}</Link></span>
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