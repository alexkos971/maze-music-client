import { check_env } from "@helpers";

export const lsGetItem = (name: string): any => {
    return check_env(() : any => {
        let results = localStorage.getItem(name);
        
        if (results) {
            return JSON.parse(results);
        }
        
        return undefined;   
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