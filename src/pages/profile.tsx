import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import ProtectedPage from "@hocs/protectedPage";
import MainWrap from "@containers/MainWrap";
import ProfileHero from "@components/ProfileHero";
import { useAppDispatch } from "@hooks";
import { showToast } from "@store/reducers/interfaceReducer";
import { useSignOutMutation } from "@store/api/authApi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { authPage } from "@utils/directory";
import LanguageSwitcher from "@components/LanguageSwitcher";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { signOut, useSession } from "next-auth/react";

export default ProtectedPage(function Profile() {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const [signOutHandle, { isSuccess, isLoading }] = useSignOutMutation();
    const {t} = useTranslation('common');
    const { push } = useRouter();

    useEffect(() => {
        if (isSuccess) {
            
            // Google Sign-Out
            signOut({
                redirect: false
            });      
            
            // If google signed-out or not was sign-in in before
            if ( !session ) {
                dispatch(showToast({type: 'info', text: t("interface.logged_out")}))
                push(authPage.path);
            }
        }
    }, [isSuccess, session]);

    return (
        <MainWrap canReturnBack={true} overlapHeader={true}>
            <ProfileHero/>

            <div className="container-fluid pt-16">
                <Title>{t("pages.profile.settings")}</Title>
                
                <div className="sm:max-w-sm">
                    <LanguageSwitcher/>    

                    <Button 
                        className="mt-8" 
                        color="red" 
                        isLoading={isLoading}
                        onClick={() => signOutHandle('')}>{t("pages.profile.sign-out")}</Button>
                </div>
            </div>
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