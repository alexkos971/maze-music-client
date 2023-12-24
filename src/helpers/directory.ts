import { BoxBlackIcon, ExploreBlackIcon, SettingsGrayIcon } from "@helpers/images";

export interface DirType {
    path: string;
    title: string;
    icon?: undefined | Element
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
    },
    artist: {
        path: '/artist',
        title: "pages.artist.header_title"
    },
    profile: {
        path: '/profile',
        title: "pages.profile.header_title"
    }
}