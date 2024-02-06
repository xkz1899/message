import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { setAvatar, setLogin } from "../../authorization/reducers/authReducer"

export const changeAvatar = (avatar: File) => async (dispatch: AppDispatch) => {
	try {
		const formData = new FormData()
		formData.append(`avatar`, avatar)
		const response = await $authHost.patch("user/avatar", formData)
		dispatch(setAvatar(response.data))
	} catch (err) {
		console.log(err)
	}
}

export const changeLogin = (login: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.patch("user", { login })
		dispatch(setLogin(response.data))
	} catch (err) {}
}
