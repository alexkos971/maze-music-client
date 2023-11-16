import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainWrap from "@components/MainWrap";
import LanguageSwitcher from "@components/LanguageSwitcher";

export default function Settings() {    

  return (
    <>
      <h1>Settings</h1>
      <LanguageSwitcher/>    
    </>
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