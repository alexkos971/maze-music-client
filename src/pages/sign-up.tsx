'use client';
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { Email, Password } from "@components/ui/Field";
import Button from "@components/ui/Button";
import { useTranslation } from "next-i18next";

const SignUp = () => {
    const {t} = useTranslation("common");
    
    return (
        <AuthWrap size="large">
            <h1 className="block-title">{t("pages.sign-up.title")}</h1>

            <Form className="flex flex-col items-center max-w-sm">
                <Email name="email" placeholder="Email"/>
                <Password name="password" placeholder="Password"/>

                <div className="flex items-center justify-between mt-6 w-full flex-col sm:flex-row items-stretch gap-2">
                    <Button type="submit" color="green" size="normal">{t("pages.sign-up.title")}</Button>

                    <span className="flex items-center gap-3 justify-center text-sm">
                        SIgn In with google
                    </span>
                </div>
            </Form>

            <span className="font-secondary mt-12">Already have an account? <Link href="/sign-in" className="underline">Login</Link></span>
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