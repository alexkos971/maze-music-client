'use client';
import { useState, useContext } from "react";
import useProtectedPage from "@hooks/protectedPage";

import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { AppContext } from "@components/AppWrap";

import { Text, Email, Password, RadiosWithImages, TextArea, FilePicker, ConfirmPassword } from "@components/UI/Field";
import { ListenerRadio, ArtistRadio } from "@helpers/images";
import Button from "@components/UI/Button";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";
import {Steps, Step } from "@components/UI/Steps";

const ButtonsNav = ({ 
    buttonText = 'Next', canSkip = false, goToStep, disabled = false 
} : { buttonText?: string, canSkip?: boolean, goToStep: () => void, disabled?: boolean}) => {
    return (        
        <div className="flex items-center mt-6">
            <Button disabled={disabled} className={canSkip ? 'w-1/2' : 'w-full'} onClick={goToStep}>{buttonText}</Button>

            {
                canSkip ? 
                    <button onClick={goToStep} type="button" className="text-base text-center text-gray-c4 w-1/2">Skip</button> 
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
                    <Step title="Role">
                        <Title tag="h2">Choose your role</Title>

                        <RadiosWithImages 
                            name={'role'}
                            items={[
                                {
                                    title: 'Listener',
                                    value: 'listener',
                                    image: ListenerRadio,
                                    checked: true
                                },
                                {
                                    title: 'Artist',
                                    value: 'artist',
                                    image: ArtistRadio
                                },
                            ]}
                            columns={2}
                        />        

                        <ButtonsNav canSkip={false} goToStep={() => goToStep(activeStep + 1)} currentStep={activeStep} />                                     
                    </Step>

                    <Step title="Credentials">
                        <Title tag="h2">Credentials</Title>

                        <Text
                            name="full_name"
                            placeholder="Full Name"
                            required={true}
                        />

                        <Email
                            name="email"
                            placeholder="Email"
                            required={true}/>
                        
                        <Password
                            name="password"
                            placeholder="Password"
                            required={true}/>
                        
                        <ConfirmPassword
                            password={fields.password}
                            name="confirm-password"
                            placeholder="Confirm Password"
                            required={true}/>

                        <ButtonsNav 
                            disabled={!validFields.full_name || !validFields.email || !validFields.password || !validFields['confirm-password']}
                            canSkip={false} 
                            goToStep={() => goToStep(activeStep + 1)} 
                        />
                    </Step>

                    <Step title="Profile">
                        <Title tag="h2">Profile</Title>

                        <FilePicker
                            title="Your avatar image"
                            accept="image/jpeg, image/png"
                            name="avatar"                      
                        />

                        <TextArea
                            className={'mt-6'}
                            name="description"
                            placeholder="Some description about you..."
                        />

                        <ButtonsNav 
                            canSkip={true} 
                            goToStep={() => goToStep(activeStep + 1)} 
                        />
                    </Step>

                    <Step title="Preferences">
                        <Title tag="h2">Preferences</Title>
                        <ButtonsNav canSkip={true} buttonText="Finish" goToStep={() => showToast({ type: 'success', text: "Authorized" })} currentStep={activeStep}/>
                    </Step>
                </Steps>
            </Form>

            <span className="mt-12">Already have an account? <Link href="/sign-in" className="underline">Sign-In</Link></span>
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