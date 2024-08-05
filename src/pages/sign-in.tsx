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
import { basePage } from "@utils/directory";
import { GoogleIcon } from "@utils/images";
import ProtectedPage from "@hocs/protectedPage";

import { useSignInMutation } from "@store/api/authApi";
import { useRouter } from "next/router";
import {signIn, signOut, useSession} from "next-auth/react";

const SignIn = () => {
    const dispatch = useAppDispatch();
    // @ts-ignore
    let [ fields, setFields ] = useState<SignInDto | SignInGoogleDto>({});
    let [ validFields, setValidFields ] = useState({});
    
    let [signInHandle, { isLoading, error, isSuccess }] = useSignInMutation();
    // Check Google authorization
    const { data: session } = useSession();

    const { push } = useRouter();
    const {t} = useTranslation('common');

    const successLogin = () => {
        push(basePage.path);
        dispatch(showToast({type: 'success', text: t('interface.authorized')}));
    }

    // Local Auth
    useEffect(() => {
        if (error) {
            // @ts-ignore
            signOut({
                redirect: false
            });
            dispatch(showToast({type: 'error', text: t(`errors.${error?.data?.message}`) ?? 'Error'}))
        } 
        else if (isSuccess) {
            successLogin();
        }
    }, [isSuccess, error]);

    // Google Auth

    useEffect(() => {
        if (session?.user?.email) {
            // @ts-ignore 
            signInHandle({
                login_type: 'google',
                // @ts-ignore 
                token: session?.access_token 
            });
        }
    }, [session]);

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
                    placeholder={t("fields.placeholders.email")} 
                    required={true}/>
                <Password 
                    name="password" 
                    placeholder={t("fields.placeholders.password")} 
                    required={true}/>

                <div className="flex items-center justify-between mt-6 w-full flex-col sm:flex-row gap-5">
                    <Button 
                        type="submit" 
                        color="green"
                        // @ts-ignore
                        disabled={isLoading || !validFields.email || !validFields.password}
                        isLoading={isLoading} 
                        onClick={() => signInHandle({
                            data: fields,
                            login_type: 'local' 
                        })}
                        className="sm:w-1/2 w-full"
                        size="normal">{t("pages.sign-in.title")}</Button>

                    <button 
                        className="flex items-center justify-start text-sm dark:text-gray-300" 
                        type="button"
                        onClick={() => signIn('google')}>
                        <GoogleIcon/>
                        <span className="ml-2 text-left font-secondary">Sign In with google</span>
                    </button>
                </div>
            </Form>

            <span className="mt-12 dark:text-gray-300">{t("pages.sign-in.sign_up")} <Link href="/sign-up" className="underline">{t("pages.sign-up.title")}</Link></span>
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