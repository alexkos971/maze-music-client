import Axios from "axios";
// import { useAuth } from "../hooks/auth.hook";
// const { token } = useAuth();

const instance = Axios.create({
	baseURL: 'http://localhost:5050/',
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDFkODI4NjY2NWFiZTFjZjg2YzQwZjYiLCJpYXQiOjE2MjYzMjg3NzJ9.cuYP8QD98oiRIuh4VY3lcAboXbqEeGYmL8GQ6KjoXY0`,
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