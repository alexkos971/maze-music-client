import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en/translation.json";
import ua from "./translations/ua/translation.json";
import { lsGetItem } from "@helpers/localstorage";

i18next
.use(initReactI18next) 
.init({
    debug: true, 
    resources: {
        en: { translations: en },
        ua: { translations: ua },
    },
    lng: lsGetItem('i18nLanguage') || 'en',
    fallbackLng: "en",
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
        escapeValue: false,
        formatSeparator: '.'
    }
});

export default i18next;