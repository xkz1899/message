const userService = require("../service/userService")
const ApiError = require("../errors/ApiError")

class UserController {
	async getAll(req, res, next) {
		try {
			const users = await userService.getAllUsers(req.user.id)
			return res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async searchUsers(req, res, next) {
		try {
			const { search } = req.params
			const users = await userService.searchUsers(search, req.user.id)
			return res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async changeLastSeen(req, res, next) {
		try {
			const users = await userService.changeLastSeen(req.user.id)
			return res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async changeLogin(req, res, next) {
		try {
			const { login } = req.body
			const user = await userService.changeLogin(login, req.user.id)
			return res.json(user)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async uploadAvatar(req, res, next) {
		try {
			const { avatar } = req.files
			const user = await userService.uploadAvatar(avatar, req.user.id)
			res.json(user)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteAvatar(req, res, next) {
		try {
			const user = await userService.deleteAvatar(req)
			res.json(user)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new UserController()
