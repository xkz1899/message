import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IResponseUser } from "../models/IResponseUser"
import { ContactState } from "./type"
import { User } from "../models/IResponseUser"

const initialState: ContactState = {
	contactsList: [],
	searchList: null,
	errorMessage: null,
	selectedUser: null,
	currentChat: null,
	isSearch: false,
	settings: false,
}

const contactReducer = createSlice({
	name: "contact",
	initialState,
	reducers: {
		setContactList(state, action: PayloadAction<IResponseUser[][]>) {
			state.contactsList = action.payload
		},
		setSearchList(state, action: PayloadAction<User[] | null>) {
			state.searchList = action.payload
		},
		setSelectedUser(state, action: PayloadAction<User | null>) {
			state.selectedUser = action.payload
		},
		setErrorMessage(state, action: PayloadAction<string | null>) {
			state.errorMessage = action.payload
		},
		setSettings(state, action: PayloadAction<boolean>) {
			state.settings = action.payload
		},
		setSearchVisible(state, action: PayloadAction<boolean>) {
			state.isSearch = action.payload
		},
		setCurrentChat(state, action: PayloadAction<number | null>) {
			state.currentChat = action.payload
		},
	},
})

export default contactReducer.reducer
export const {
	setContactList,
	setSearchList,
	setErrorMessage,
	setSelectedUser,
	setSettings,
	setSearchVisible,
	setCurrentChat,
} = contactReducer.actions
