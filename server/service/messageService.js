const { Op } = require("sequelize")

const { User, Message, Chat, UserChat } = require("../models/models")
const userService = require("./userService")

class MessageService {
	async sendMessage(chatId, userId, message) {
		await userService.changeLastSeen(userId)
		await UserChat.update({ updateAt: new Date() }, { where: { id: chatId } })
		return await Message.create({ message, chatId, userId })
	}

	async createChat(id, userId) {
		const chat = await Chat.create()
		await userService.changeLastSeen(id)
		await UserChat.create({ userId: id, chatId: chat.id })
		await UserChat.create({ userId, chatId: chat.id })
		return chat
	}

	async getChats(userId) {
		const arr = []
		const tempUserChats = await UserChat.findAll({ where: { userId } })

		for (let i = 0; i < tempUserChats.length; i++) {
			const result = await Chat.findAll({
				where: { id: tempUserChats[i].chatId },
				through: {
					attributes: ["updatedAt"],
				},
				include: [
					{
						model: UserChat,
						attributes: ["userId", "chatId"],
						where: userId,
						include: [{ model: User, where: { id: { [Op.not]: userId } } }],
						order: [["updatedAt", "DESC"]],
					},
					{
						model: Message,
						limit: 1,
						order: [["updatedAt", "DESC"]],
					},
				],
				order: [["updatedAt", "DESC"]],
			})
			await arr.push(result)
		}
		return arr
	}

	async getChat(chatId) {
		return await Message.findAll({
			where: { chatId },
			order: [["updatedAt", "ASC"]],
		})
	}

	async searchChat(search) {
		return await Chat.findAll({
			through: {
				attributes: ["updatedAt"],
			},
			include: [
				{
					model: UserChat,
					attributes: ["userId", "chatId"],
					include: [
						{
							model: User,
							where: { login: { [Op.iLike]: "%" + search + "%" } },
						},
					],
				},
				{
					model: Message,
					limit: 1,
				},
			],
		})
	}
	async deleteChat(id) {
		await Message.destroy({ where: { chatId: id } })
		await UserChat.destroy({ where: { chatId: id } })
		await Chat.destroy({ where: { id } })
	}
	async deleteMessage(id) {
		const result = await Message.destroy({ where: { id } })
		if (result === 1) {
			return id
		} else {
			return null
		}
	}
}

module.exports = new MessageService()
