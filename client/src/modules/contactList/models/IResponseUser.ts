
export interface IResponseUser {
	id: number
	createdAt: string
	updatedAt: string
	userChats: UserChat[]
	messages: Message[]
}

export interface UserChat {
	userId: number
	chatId: number
	user: User
}

export interface User {
	id: number
	login: string
	avatar: string
	lastSeen: string
	createdAt: string
	updatedAt: string
}

export interface Message {
	id: number
	message: string
	createdAt: string
	updatedAt: string
	chatId: number
	userId: number
}
