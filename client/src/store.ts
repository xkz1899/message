import { configureStore } from "@reduxjs/toolkit"

import { authReducer } from "./modules/authorization"
import contactReducer from "./modules/contactList/reducers/contactReducer"
import messageReducer from "./modules/messagesArea/reducers/messageReducer"

export const store = configureStore({
	reducer: {
		authReducer,
		contactReducer,
		messageReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
