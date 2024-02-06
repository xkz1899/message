import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Message, MessageState } from "./type"

const initialState: MessageState = {
	messages: null,
	isLoading: false,
}

const messageReducer = createSlice({
	name: "message",
	initialState,
	reducers: {
		setMessage(state, action: PayloadAction<Message[] | null>) {
			state.messages = action.payload
		},
		setMessagesLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		pushMessage(state, action: PayloadAction<Message>) {
			state.messages?.push(action.payload)
		},
		deleteMessage(state, action: PayloadAction<number>) {
			if (state.messages) {
				state.messages = state.messages?.filter(f => f.id !== action.payload)
			}
		},
	},
})

export default messageReducer.reducer
export const { setMessage, setMessagesLoading, pushMessage, deleteMessage } =
	messageReducer.actions
