"use client";
import { useAppDispatch } from "@hooks";
import { showToast } from "@store/reducers/interfaceReducer";
import { useContext, useEffect } from "react";
import { AppContext } from "@components/AppWrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useProtectedPage from "@hooks/protectedPage";
import LanguageSwitcher from "@components/LanguageSwitcher";
import MainWrap from "@components/MainWrap";
import Button from "@components/UI/Button";

import { useSignOutMutation } from "@store/api/authApi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { authPage } from "@helpers/directory";

export default useProtectedPage(function Settings() {    
  const dispatch = useAppDispatch();
  const [signOut, { isSuccess, isLoading }] = useSignOutMutation();
  const {t} = useTranslation('common');
  const { push } = useRouter();

  useEffect(() => {
    if (isSuccess) {
      dispatch(showToast({type: 'info', text: t("interface.logged_out")}))
      push(authPage.path);
    }
  }, [isSuccess]);

  return (
    <MainWrap>
      <div className="container-fluid">
        <h1>Settings</h1>
        
        <div className="max-w-sm">
          <LanguageSwitcher/>    

          <Button 
            className="mt-6" 
            color="black" 
            isLoading={isLoading}
            onClick={() => signOut('')}>Leave</Button>
        </div>
      </div>
    </MainWrap>
  );
});

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}