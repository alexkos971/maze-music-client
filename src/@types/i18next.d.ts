import {en, ua} from "../i18n/translations";

declare module "i18next" {
    interface CustomTypeOptions {
        default: 'en', 
        resources: {
            en: typeof en,
            ua: typeof ua
        } 
    }
}