import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LanguageSwitcher from "@components/LanguageSwitcher";
import MainWrap from "@components/MainWrap";

export default function Settings() {    

  return (
    <MainWrap>
      <div className="container-fluid">
        <h1>Settings</h1>
        <LanguageSwitcher/>    
      </div>
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