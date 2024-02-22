'use client';
import { useEffect } from "react";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { Email, Password } from "@components/ui/Field";
import Button from "@components/ui/Button";
import { useTranslation } from "next-i18next";
import { useFormValidation } from "@components/ui/Form/validation";
import Title from "@components/UI/Title";


const SignIn = () => {
    const {t} = useTranslation("common");
    const { isFormValid, fields } = useFormValidation();
    
    useEffect(() => {
        console.log(fields);
    }, [fields])

    const submitForm = () => {
        console.log(isFormValid());
    }

    return (
        <AuthWrap>
            <Title tag="h1">{t("pages.sign-in.title")}</Title>

            <Form className="flex flex-col items-center max-w-sm">
                <Email name="email" placeholder="Email"/>
                <Password name="password" placeholder="Password"/>

                <div className="flex items-center justify-between mt-6 w-full flex-col sm:flex-row items-stretch gap-5">
                    <Button 
                        type="submit" 
                        color="green" 
                        onClick={submitForm}
                        className="sm:w-1/2"
                        size="normal">{t("pages.sign-in.title")}</Button>

                    <span className="flex items-center gap-3 justify-center text-sm">
                        SIgn In with google
                    </span>
                </div>
            </Form>

            <span className="mt-12">Don't have an account? <Link href="/sign-up" className="underline">Register</Link></span>
        </AuthWrap>
    );
}

export default SignIn;

export async function getStaticProps({ locale } : { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}