import Axios from "axios";

const instance = Axios.create({
	baseURL: 'http://localhost:5050/',
	headers: {
		Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('userData')).token}`,
		withCredentials: true
	}
});

instance.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		config.headers.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem('userData')).token}`
	}
	return config;
})



export default instance;