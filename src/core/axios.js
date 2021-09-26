import Axios from "axios";
import { apiUrl, userToken } from "../config/constants";


const instance = Axios.create({
	baseURL: apiUrl,
	headers: {
		Authorization: `Bearer ${userToken.token}`,
		withCredentials: true,
		AcccessCrossOrigin: '*'
	}
});

instance.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		config.headers.Authorization = `Bearer ${userToken.token}`
	}
	return config;
})



export default instance;