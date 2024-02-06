import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { IChat } from "../models/IChat"
import { IResponseUser, User } from "../models/IResponseUser"
import {
	setContactList,
	setCurrentChat,
	setSearchList,
} from "../reducers/contactReducer"

export const getAllUsers = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.get<IResponseUser[][]>("message/chat")
		dispatch(setContactList(response.data))
	} catch (err) {}
}

export const searchUsers =
	(search: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<User[]>("user/" + search)
			dispatch(setSearchList(response.data))
		} catch (err) {}
	}

export const changeLastSeen = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.post<IResponseUser>("user/lastseen")
	} catch (err) {}
}

export const createChat = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.post<IChat>("message/chat", { id })
		const responseContact = await $authHost.get<IResponseUser[][]>(
			"message/chat"
		)
		dispatch(setContactList(responseContact.data))
		dispatch(setCurrentChat(response.data.id))
	} catch (err) {}
}
