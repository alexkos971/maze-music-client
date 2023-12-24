import MainWrap from "@components/MainWrap";
import ProfileHero from "@components/ProfileHero";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Profile() {
    return (
        <MainWrap canReturnBack={true}>
            <ProfileHero/>
        </MainWrap>
    );
}

export async function getStaticProps({ locale } : {locale: string}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common']))
        }
    }
}