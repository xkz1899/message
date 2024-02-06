import { $authHost, $host } from "../../../http"
import { AuthResponse } from "../../../models/AuthResponse"
import { AppDispatch } from "../../../store"
import { setAuth, setCurrentUser, setError } from "../reducers/authReducer"

export const loginService =
	(login: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $host.post<AuthResponse>("auth/login", {
				login,
				password,
			})
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setCurrentUser(response.data.user))
			dispatch(setAuth(true))
		} catch (err: any) {
			dispatch(setError(err.response.data.message))
		}
	}

export const registrationService =
	(login: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $host.post<AuthResponse>("auth/registration", {
				login,
				password,
			})
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setCurrentUser(response.data.user))
			dispatch(setAuth(true))
		} catch (err: any) {
			dispatch(setError(err.response.data.message))
		}
	}

export const refreshService = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.get<AuthResponse>("auth/refresh")
		localStorage.setItem("accessToken", response.data.accessToken)
		dispatch(setCurrentUser(response.data.user))
		dispatch(setAuth(true))
	} catch (err: any) {
		dispatch(setError(err.response.data.message))
	}
}

export const logoutService = () => async (dispatch: AppDispatch) => {
	try {
		await $host.post("auth/logout")
		localStorage.removeItem("accessToken")
		dispatch(setCurrentUser(null))
		dispatch(setAuth(false))
	} catch (err: any) {
		dispatch(setError(err.response.data.message))
	}
}
