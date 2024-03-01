import { cookieGetItem } from "./cookie";

const check_env = (callback : () => any) => {
    if (typeof window !== 'undefined') {
        return callback();
    }
    else {
        return null;
    }
}

export {cookieGetItem, check_env };