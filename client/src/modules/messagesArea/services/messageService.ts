import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { setMessage, setMessagesLoading } from "../reducers/messageReducer"
import { Message } from "../reducers/type"

export const getMessage = (chatId: number) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setMessagesLoading(true))
		const response = await $authHost.get<Message[]>("message/chat/" + chatId)
		dispatch(setMessage(response.data))
	} catch (err) {
	} finally {
		dispatch(setMessagesLoading(false))
	}
}

export const sendMessage =
	(chatId: number, message: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post("message", { chatId, message })
		} catch (err) {}
	}

export const deleteChat = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete("message/chat/" + id)
	} catch (err) {}
}
