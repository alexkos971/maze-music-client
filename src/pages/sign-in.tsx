'use client';
import { useState, useEffect, useContext } from "react";
import { useAppDispatch } from "@hooks";
import { showToast } from "@store/reducers/interfaceReducer";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppContext } from "@components/AppWrap";
import { useTranslation } from "next-i18next";
import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { Email, Password } from "@components/UI/Field";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { basePage } from "@helpers/directory";
import useProtectedPage from "@hooks/protectedPage"

import { useSignInMutation } from "@store/api/authApi";
import { useRouter } from "next/router";

const SignIn = () => {
    const dispatch = useAppDispatch();
    let [ fields, setFields ] = useState<SignInDto>({});
    
    let [signIn, { error, isSuccess, isLoading}] = useSignInMutation();
    const { push } = useRouter();
    const {t} = useTranslation('common');
    
    useEffect(() => {
        if (error) {
            dispatch(showToast({type: 'error', text: error.data.message}))
        } 
        else if (isSuccess)  {
            push(basePage.path);
            dispatch(showToast({type: 'success', text: t('interface.authorized')}));
        }
    }, [isSuccess, error]);

    return (
        <AuthWrap>
            <Title tag="h1">{t("pages.sign-in.title")}</Title>

            <Form 
                className="flex flex-col items-center max-w-sm" 
                fields={fields} 
                setFields={setFields}
            >
                
                <Email name="email" placeholder={t("fields.placeholders.email")} required={true}/>
                <Password name="password" placeholder={t("fields.placeholders.password")} required={true}/>

                <div className="flex items-center justify-between mt-6 w-full flex-col sm:flex-row items-stretch gap-5">
                    <Button 
                        type="submit" 
                        color="green"
                        disabled={isLoading}
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
        </AuthWrap>
    );
}

export default useProtectedPage(SignIn);

export async function getStaticProps({ locale } : { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
} 