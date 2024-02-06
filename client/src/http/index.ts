import axios from "axios"
import { AuthResponse } from "../models/AuthResponse"

const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL + "/api/",
	withCredentials: true,
})

const $authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL + "/api/",
	withCredentials: true,
})

$authHost.interceptors.request.use(config => {
	config.headers!.Authorization = `Bearer ${localStorage.getItem(
		"accessToken"
	)}`
	return config
})

$authHost.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<AuthResponse>(
					`${process.env.REACT_APP_API_URL}/api/auth/refresh`,
					{
						withCredentials: true,
					}
				)
				localStorage.setItem("accessToken", response.data.accessToken)
				return $authHost.request(originalRequest)
			} catch (e) {
				console.log("Не авторизован.")
			}
		}
		throw error
	}
)

export { $host, $authHost }
