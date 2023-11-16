import MainWrap from "@components/MainWrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Library() {

  return (
    <h1>Library)</h1>
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