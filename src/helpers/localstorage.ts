export const lsGetItem = (name: string) : any => {
    var results = localStorage.getItem(name);
    return results;   
}
  
export const lsDeleteItem = ( name: string ): void =>{
    localStorage.removeItem(name);
}

type SetItem = {
    name: string,
    value: any,
};
  
export const lsSetItem = ({ name, value } : SetItem) : void => {
    localStorage.setItem(name, value);
}