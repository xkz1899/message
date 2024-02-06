export interface IUser {
	id: number
	login: string
	avatar: string | null
	lastSeen: string
	role: string[]
}
