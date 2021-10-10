require('dotenv').config()

export const apiUrl = process.env.REACT_APP_API_URL_DEV;

export const lastFmKey = process.env.LAST_FM_KEY;

export let userToken = () => JSON.parse(localStorage.getItem('userData'));
 