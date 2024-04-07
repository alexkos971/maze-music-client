import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import ProfileHero from "@components/ProfileHero";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default ProtectedPage(function Profile() {

    return (
        <MainWrap canReturnBack={true} overlapHeader={true}>
            <ProfileHero/>
        </MainWrap>
    );
})

export async function getStaticProps({ locale } : {locale: string}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common']))
        }
    }
}