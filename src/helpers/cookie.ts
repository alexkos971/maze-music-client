export const cookieGetItem = (cookie_name: string) : string | null  => {
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;   
}

export const cookieDeleteItem = ( cookie_name: string ) =>{
  var cookie_date = new Date ( );  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toUTCString();
}


type SetItem = {
  name: string,
  value: string,
  exp_y: number,
  exp_m: number,
  exp_d: number,
  path: string,
  domain: string,
  secure: string | number
};

export const cookieSetItem = ({ name, value, exp_y, exp_m, exp_d, path, domain, secure } : SetItem) => {
  var cookie_string = name + "=" + escape ( value );
 
  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toUTCString();
  }
 
  if ( path )
    cookie_string += "; path=" + escape ( path );
 
  if ( domain )
    cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
    cookie_string += "; secure";
  
  document.cookie = cookie_string;
}