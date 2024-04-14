'use client';
import { useState, useEffect } from "react";
import { useAppDispatch } from "@hooks";
import { showToast } from "@store/reducers/interfaceReducer";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AuthLayout from "@containers/AuthLayout";
import Form from "@components/UI/Form";
import { Email, Password } from "@components/UI/Field";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { basePage } from "@helpers/directory";
import ProtectedPage from "@hoks/protectedPage"

import { useSignInMutation } from "@store/api/authApi";
import { useRouter } from "next/router";

const SignIn = () => {
    const dispatch = useAppDispatch();
    // @ts-ignore
    let [ fields, setFields ] = useState<SignInDto>({});
    let [ validFields, setValidFields ] = useState({});
    
    let [signIn, { error, isSuccess, isLoading}] = useSignInMutation();
    const { push } = useRouter();
    const {t} = useTranslation('common');
    
    useEffect(() => {
        if (error) {
            // @ts-ignore
            dispatch(showToast({type: 'error', text: error?.data?.message ?? 'Error'}))
        } 
        else if (isSuccess)  {
            push(basePage.path);
            dispatch(showToast({type: 'success', text: t('interface.authorized')}));
        }
    }, [isSuccess, error]);

    return (
        <AuthLayout>
            <Title tag="h1">{t("pages.sign-in.title")}</Title>

            {/* @ts-ignore */} 
            <Form 
                className="flex flex-col items-center max-w-sm" 
                {...{ fields, setFields, validFields, setValidFields }}
            >
                
                <Email 
                    name="email" 
                    placeholder={t("fields.placeholders.email")} required={true}/>
                <Password name="password" placeholder={t("fields.placeholders.password")} required={true}/>

                <div className="flex items-center justify-between mt-6 w-full flex-col sm:flex-row items-stretch gap-5">
                    <Button 
                        type="submit" 
                        color="green"
                        // @ts-ignore
                        disabled={isLoading || !validFields.email || !validFields.password}
                        isLoading={isLoading} 
                        onClick={() => signIn(fields)}
                        className="sm:w-1/2"
                        size="normal">{t("pages.sign-in.title")}</Button>

                    <span className="flex items-center gap-3 justify-center text-sm">
                        Sign In with google
                    </span>
                </div>
            </Form>

            <span className="mt-12">{t("pages.sign-in.sign_up")} <Link href="/sign-up" className="underline">{t("pages.sign-up.title")}</Link></span>
        </AuthLayout>
    );
}

export default ProtectedPage(SignIn);

export async function getStaticProps({ locale } : { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
} 