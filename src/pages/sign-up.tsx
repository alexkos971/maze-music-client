'use client';
import { useState, useEffect, useContext } from "react";

import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { ValidationContext, ValidationContextType } from "@components/UI/Form/validation";
// import { useFormValidation } from "@components/UI/Form/validation";

import { Text, Email, Password, RadiosWithImages, TextArea, FilePicker } from "@components/UI/Field";
import { ListenerRadio, ArtistRadio } from "@helpers/images";
import Button from "@components/UI/Button";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";
import {Steps, Step } from "@components/UI/Steps";

const ButtonsNav = ({ 
    buttonText = 'Next', canSkip = false, currentStep, goToStep 
} : { buttonText?: string, canSkip?: boolean, currentStep: number, goToStep: (step: number) => void}) => {
    return (        
        <div className="flex items-center mt-6">
            <Button className={canSkip ? 'w-1/2' : 'w-full'} onClick={goToStep}>{buttonText}</Button>

            {
                canSkip ? 
                    <button type="button" className="text-base text-center text-gray-c4 w-1/2">Skip</button> 
                : ''
            }
        </div>
    );
}

const SignUp = () => {
    const {t} = useTranslation("common");
    const [activeStep, goToStep ] = useState(0);
    const [fields, setFields] = useState<{}>({});    

    useEffect(() => {
        console.log(fields);
    }, [fields])

    return (
        <AuthWrap size="large">

            <Form className="flex flex-col items-center max-w-sm" fields={fields} setFields={setFields}>
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
                            // onChange={(id, index) => console.log(id, index)}
                            columns={2}
                        />        

                        <ButtonsNav canSkip={false} goToStep={() => goToStep(activeStep + 1)} currentStep={activeStep} />                                     
                    </Step>

                    <Step title="Credentials">
                        <Title tag="h2">Credentials</Title>

                        <Text
                            name="full_name"
                            placeholder="Full Name"
                        />

                        <Email
                            name="email"
                            placeholder="Email"/>
                        
                        <Password
                            name="password"
                            placeholder="Password"/>
                        
                        <Password
                            name="confirm-password"
                            placeholder="Confirm Password"/>

                        <ButtonsNav canSkip={true} goToStep={() => goToStep(activeStep + 1)} currentStep={activeStep} />
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

                        <ButtonsNav canSkip={true} goToStep={() => alert('Final')} currentStep={activeStep} />
                    </Step>

                    {/* <Step title="Preferences">
                        <Title tag="h2">Preferences</Title>
                        <ButtonsNav canSkip={true} buttonText="Finish" goToStep={goToStep} currentStep={activeStep}/>
                    </Step> */}
                </Steps>
            </Form>

            <span className="mt-12">Already have an account? <Link href="/sign-in" className="underline">Login</Link></span>
        </AuthWrap>
    );
}

export default SignUp;

export async function getStaticProps({ locale } : { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}