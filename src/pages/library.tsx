import useProtectedPage from "@hooks/protectedPage";
import MainWrap from "@components/MainWrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default useProtectedPage(function Library() {
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