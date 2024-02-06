const uuid = require("uuid")
const path = require("path")
const fs = require("fs")
const { Op } = require("sequelize")

const { User } = require("../models/models")

class UserService {
	async getAllUsers(id) {
		return await User.findAll({
			attributes: { exclude: ["password", "createdAt"] },
			where: {
				[Op.not]: { id },
			},
			order: [["updatedAt", "DESC"]],
		})
	}

	async searchUsers(search, id) {
		const users = await User.findAll({
			where: { login: { [Op.iLike]: "%" + search + "%" }, [Op.not]: { id } },
		})
		return users
	}

	async changeLastSeen(id) {
		await User.update({ lastSeen: new Date() }, { where: { id } })
		return await User.findOne({ where: { id } })
	}

	async changeLogin(login, id) {
		const user = await User.findOne({ where: { login } })
		if (user)
			throw ApiError.BadRequest(`Пользователь с таким именем уже существует.`)
		await User.update({ login }, { where: { id } })
		return login
	}

	async uploadAvatar(file, id) {
		const avatarName = uuid.v4() + ".jpg"
		if (!fs.existsSync(path.resolve(__dirname, "..", "static"))) {
			fs.mkdirSync(path.resolve(__dirname, "..", "static"))
		}
		const { avatar } = await User.findOne({ where: { id } })
		if (avatar) {
			fs.unlinkSync(path.resolve(__dirname, "..", "static", avatar))
		}
		file.mv(path.resolve(__dirname, "..", "static", avatarName))
		await User.update({ avatar: avatarName }, { where: { id } })
		return avatarName
	}

	async deleteAvatar(id) {
		const { avatar } = await User.findOne({ where: { id } })
		if (avatar) {
			fs.unlinkSync(path.resolve(__dirname, "..", "static", avatar))
		}
		return await User.update({ avatar: null }, { where: { id } })
	}
}

module.exports = new UserService()
