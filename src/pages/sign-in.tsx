'use client';
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppContext } from "@components/AppWrap";
import { useTranslation } from "next-i18next";
import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { Email, Password } from "@components/UI/Field";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { directories } from "@helpers/directory";

import { useSignInMutation } from "@store/api/authApi";
import { useRouter } from "next/router";

const SignIn = () => {
    let [ fields, setFields ] = useState<SignInDto>({});
    
    let [signIn, {data, error, isSuccess, isLoading}] = useSignInMutation();
    const { showToast } = useContext(AppContext);
    const { push } = useRouter();
    const {t} = useTranslation('common');
    
    useEffect(() => {    
        if (error) {
            showToast({type: 'error', text: error.data.message})
        } 
        else if (isSuccess) {
            push(directories.for_you.path);
            showToast({type: 'success', text: t('interface.authorized')});
        }
    }, [data, isSuccess, error])

    return (
        <AuthWrap>
            <Title tag="h1">{t("pages.sign-in.title")}</Title>

            <Form 
                className="flex flex-col items-center max-w-sm" 
                fields={fields} 
                setFields={setFields}
            >
                
                <Email name="email" placeholder="Email" required={true}/>
                <Password name="password" placeholder="Password" required={true}/>

                <div className="flex items-center justify-between mt-6 w-full flex-col sm:flex-row items-stretch gap-5">
                    <Button 
                        type="submit" 
                        color="green"
                        isLoading={isLoading} 
                        onClick={() => signIn(fields)}
                        className="sm:w-1/2"
                        size="normal">{t("pages.sign-in.title")}</Button>

                    <span className="flex items-center gap-3 justify-center text-sm">
                        Sign In with google
                    </span>
                </div>
            </Form>

            <span className="mt-12">Don't have an account? <Link href="/sign-up" className="underline">Sign-Up</Link></span>
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