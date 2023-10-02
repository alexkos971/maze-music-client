import MainWrap from "@components/MainWrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Library() {

    return (
        <MainWrap>
            <h1>Library)</h1>
        </MainWrap>
    );
}

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}