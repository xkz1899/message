import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { AuthState } from "./type"
import { IUser } from "./../../../models/IUser"

const initialState: AuthState = {
	isAuth: false,
	currentUser: null,
	error: null,
}

const authReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setCurrentUser(state, action: PayloadAction<IUser | null>) {
			state.currentUser = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		setAvatar(state, action: PayloadAction<string | null>) {
			state.currentUser!.avatar = action.payload
		},
		setLogin(state, action: PayloadAction<string>) {
			state.currentUser!.login = action.payload
		},
	},
})

export default authReducer.reducer
export const { setAuth, setCurrentUser, setError, setAvatar, setLogin } =
	authReducer.actions
