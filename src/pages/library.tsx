import ProtectedPage from "@hoks/protectedPage";
import MainWrap from "@containers/MainWrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default ProtectedPage(function Library() {
  return (
    <MainWrap>
      <div className="container-fluid">
        <h1>Library)</h1>
      </div>
    </MainWrap>
  );
})

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}