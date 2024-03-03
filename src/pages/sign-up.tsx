'use client';
import { useState, useContext } from "react";
import useProtectedPage from "@hooks/protectedPage";

import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { AppContext } from "@components/AppWrap";
import { useTranslation } from "next-i18next";

import { Text, Email, Password, RadiosWithImages, TextArea, FilePicker, ConfirmPassword } from "@components/UI/Field";
import { ListenerRadio, ArtistRadio } from "@helpers/images";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import {Steps, Step } from "@components/UI/Steps";

const ButtonsNav = ({ 
    buttonText = 'Next', canSkip = false, goToStep, disabled = false 
} : { buttonText?: string, canSkip?: boolean, goToStep: () => void, disabled?: boolean}) => {
    const {t} = useTranslation('common');

    return (        
        <div className="flex items-center mt-6">
            <Button disabled={disabled} className={canSkip ? 'w-1/2' : 'w-full'} onClick={goToStep}>{buttonText}</Button>

            {
                canSkip ? 
                    <button onClick={goToStep} type="button" className="text-base text-center text-gray-c4 w-1/2">{t('pages.sign-up.skip')}</button> 
                : ''
            }
        </div>
    );
}

const SignUp = () => {
    const {t} = useTranslation("common");
    const [activeStep, goToStep ] = useState(0);
    const [fields, setFields] = useState<{}>({});    
    const [validFields, setValidFields] = useState<{}>({});    
    const { showToast } = useContext(AppContext);

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
                            password={fields.password}
                            name="confirm-password"
                            placeholder={t('fields.placeholders.confirm_password')}
                            required={true}/>

                        <ButtonsNav 
                            buttonText={t('pages.sign-up.btn_next')}
                            disabled={!validFields.full_name || !validFields.email || !validFields.password || !validFields['confirm-password']}
                            canSkip={false} 
                            goToStep={() => goToStep(activeStep + 1)} 
                        />
                    </Step>

                    <Step title={t('pages.sign-up.steps.profile.title')}>
                        <Title tag="h2">{t('pages.sign-up.steps.profile.title')}</Title>

                        <FilePicker
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

                    <Step title="Preferences">
                        <Title tag="h2">{t('pages.sign-up.steps.preferences.title')}</Title>
                        <ButtonsNav canSkip={true} buttonText={t('pages.sign-up.btn_finish')} goToStep={() => showToast({ type: 'success', text: "Authorized" })} currentStep={activeStep}/>
                    </Step>
                </Steps>
            </Form>

            <span className="mt-12">{t('pages.sign-up.sign_in')} <Link href="/sign-in" className="underline">{t('pages.sign-in.title')}</Link></span>
        </AuthWrap>
    );
}

export default useProtectedPage(SignUp);

export async function getStaticProps({ locale } : { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}