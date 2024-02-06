export interface MessageState {
	messages: Message[] | null
	isLoading: boolean
}

export interface Message {
	id: number
	message: string
	createdAt: string
	updatedAt: string
	chatId: number
	userId: number
}
