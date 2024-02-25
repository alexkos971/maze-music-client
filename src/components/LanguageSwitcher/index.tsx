import { Select } from "@components/ui/Field";
import { useRouter } from "next/router";
import { lsSetItem } from "@helpers/localstorage";

const LanguageSwitcher = () => {
    const router = useRouter();
    
    const languages : {[key : string] : string} = {
        'en': 'English',
        'ua': 'Ukrainian',
    };
    
    const {locale, pathname, query, asPath} = router;

    const handleLocaleChange = (newLocale: {slug: string, title: string}) => {
        router.push({ pathname, query }, asPath, { locale: newLocale.slug });

        lsSetItem({ name: 'i18nLanguage', value: newLocale.slug });
    };

    return (
        <Select 
            name="language"
            title="Language"
            value={locale ? {slug: locale, title: languages[locale]} : null}
            options={languages} 
            onChange={handleLocaleChange}/>
    );
};

export default LanguageSwitcher;