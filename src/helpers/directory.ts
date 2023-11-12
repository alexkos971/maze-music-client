import { BoxBlackIcon, ExploreBlackIcon, SettingsGrayIcon } from "@helpers/images";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface DirType {
    path: string;
    title: string;
    icon?: undefined | StaticImport | string
};

export const directories : Record<string, DirType>  = {
    for_you: {
        icon: ExploreBlackIcon,
        path: '/for-you', 
        title: 'pages.for-you.header_title'
    },
    library: {
        icon: BoxBlackIcon,
        path: '/library',
        title: "pages.library.header_title",
    },
    settings: {
        icon: SettingsGrayIcon,
        path: '/settings',
        title: "pages.settings.header_title"
    }
}