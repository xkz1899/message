import { IResponseUser, User } from "./../models/IResponseUser"

export interface ContactState {
	contactsList: IResponseUser[][]
	searchList: User[] | null
	selectedUser: User | null
	currentChat: number | null
	errorMessage: string | null
	isSearch: boolean
	settings: boolean
}
