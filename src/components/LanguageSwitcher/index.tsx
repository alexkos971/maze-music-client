import { Select } from "@components/ui/Field";
import { useRouter } from "next/router";
import { lsSetItem } from "@helpers/localstorage";

const LanguageSwitcher = () => {
    const router = useRouter();
    const {locale, pathname, query, asPath} = router;

    const handleLocaleChange = (newLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: newLocale });

        lsSetItem({ name: 'i18nLanguage', value: newLocale });
    };

    return (
        <Select 
            name="language"
            title="Language"
            value={locale ?? null}
            options={['en', 'ua']} 
            onChange={handleLocaleChange}/>
    );
};

export default LanguageSwitcher;