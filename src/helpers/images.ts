import dynamic from "next/dynamic";

import SettingsGrayIcon from "@assets/images/icons/settings-gray.svg";
import MoonBlackIcon from "@assets/images/icons/moon-black.svg";
import SunGrayIcon from "@assets/images/icons/sun-gray.svg";
import NotificationGrayIcon from "@assets/images/icons/notification-gray.svg";
import BoxBlackIcon from "@assets/images/icons/box-black.svg";
import ExploreBlackIcon from "@assets/images/icons/explore-black.svg";
import ChevronLeftGrayIcon from "@assets/images/icons/chevron-left-gray.svg";
import LogoIcon from "@assets/images/icons/logo-only-icon.svg";
import Logo from "@assets/images/logo.svg";
import ChevronDownBlack from "@assets/images/icons/chevron-down-black.svg";

// Uploads
import WeekndAvatar from "@assets/images/uploads/weeknd.png";

// const Logo = dynamic(() => import('@assets/images/logo.svg'), { ssr: false })
// const LogoIcon = dynamic(() => import('@assets/images/icons/logo-only-icon.svg'), { ssr: false })

export { 
    SettingsGrayIcon,
    NotificationGrayIcon,
    SunGrayIcon,
    MoonBlackIcon,
    BoxBlackIcon,
    ExploreBlackIcon,
    ChevronLeftGrayIcon,
    Logo,
    LogoIcon,
    WeekndAvatar,
    ChevronDownBlack  
};