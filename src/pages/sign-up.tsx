'use client';
import { useState, useEffect } from "react";

import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { Text, Email, Password, RadiosWithImages, TextArea } from "@components/UI/Field";
import { ListenerRadio, ArtistRadio } from "@helpers/images";
import Button from "@components/UI/Button";
import { useTranslation } from "next-i18next";
import Title from "@components/UI/Title";
import {Steps, Step } from "@components/UI/Steps";

const SignUp = () => {
    const {t} = useTranslation("common");
    const [activeStep, setActiveStep ] = useState(0)        
    const [availableSteps, setAvailableSteps ] = useState([0]);        

    useEffect(() => {
        console.log(activeStep, availableSteps);
    }, [activeStep, availableSteps])

    return (
        <AuthWrap size="large">

            <Form className="flex flex-col items-center max-w-sm">
                <Steps availableSteps={availableSteps} activeStep={activeStep} setActiveStep={setActiveStep}>
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

                        <Button className="w-full mt-5" onClick={() => {
                            setAvailableSteps([0, 1]);
                            setActiveStep(1);
                        }}>Next</Button>                                        
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

                        <div className="flex items-center mt-6">
                            <Button className="w-1/2" onClick={() => {
                                setAvailableSteps([0, 1, 2]);
                                setActiveStep(2);
                            }}>Next</Button>

                            <button type="button" className="text-base text-center text-gray-c4 w-1/2">Skip</button>
                        </div>
                    </Step>

                    <Step title="Profile">
                        <Title tag="h2">Profile</Title>

                        <TextArea
                            name="description"
                            placeholder="Some description about you..."
                        />

                        <Button className="mt-6 w-1/2">Next</Button>
                    </Step>
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