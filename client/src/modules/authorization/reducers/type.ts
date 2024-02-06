import { IUser } from "../../../models/IUser"

export interface AuthState {
	isAuth: boolean
	currentUser: IUser | null
	error: string | null
}
