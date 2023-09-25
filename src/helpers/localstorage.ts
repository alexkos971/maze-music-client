import { check_env } from "@helpers";

export const lsGetItem = (name: string): any => {
    return check_env(() : any => {
        var results = localStorage.getItem(name);
        
        if (results !== null) {
            return JSON.parse(results);
        }
        else {
            return undefined;   
        }
    });
}
  
export const lsDeleteItem = ( name: string ) =>{
    return check_env((): void => {
        localStorage.removeItem(name);
    });
}

type SetItem = {
    name: string,
    value: any,
};
  
export const lsSetItem = ({ name, value } : SetItem) => {
    return check_env((): void => {
        localStorage.setItem(name, JSON.stringify(value));
    });
}